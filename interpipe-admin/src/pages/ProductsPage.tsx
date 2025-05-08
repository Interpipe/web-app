import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Chip,
  IconButton,
  Autocomplete,
  DialogContentText,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import DataTable from '../components/DataTable';
import FileUpload from '../components/FileUpload';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
} from '../services/api';
import type { Product, Category } from '../types';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 200 },
  {
    id: 'category',
    label: 'Category',
    minWidth: 100,
    format: (value: { name: string }) => value?.name ?? 'N/A',
  },
  {
    id: 'isFeatured',
    label: 'Featured',
    minWidth: 100,
    format: (value: boolean) => (value ? 'Yes' : 'No'),
  },
  {
    id: 'image',
    label: 'Image',
    minWidth: 100,
    format: (value: string) => (
      <Box
        component="img"
        src={value}
        alt="Product"
        sx={{
          width: 100,
          height: 60,
          objectFit: 'cover',
          borderRadius: 1,
        }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://placehold.co/100x60/e2e8f0/64748b?text=No+Image';
          target.onerror = null; // Prevent infinite loop
        }}
      />
    ),
  },
];

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [newFeature, setNewFeature] = useState('');
  const [newSize, setNewSize] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false);
  const [stagedImageBlobUrl, setStagedImageBlobUrl] = useState<string | null>(null);
  
  // Create a registry to track active blob URLs
  const activeBlobUrls = useRef<Set<string>>(new Set());
  
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setShowNewCategoryDialog(false);
      setNewCategory('');
    },
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      handleClose();
    },
    onError: (error: any) => {
      setError(error.response?.data?.message ?? 'Failed to create product. Please try again.');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onSettled: () => {
      handleClose();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // Only clean up when component completely unmounts
  useEffect(() => {
    return () => {
      // Clean up all tracked blob URLs on component unmount
      activeBlobUrls.current.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  // Helper function to safely create blob URLs
  const createAndTrackBlobUrl = (file: File): string => {
    const url = URL.createObjectURL(file);
    activeBlobUrls.current.add(url);
    return url;
  };

  // Helper function to safely revoke blob URLs
  const safelyRevokeBlobUrl = (url: string | null) => {
    if (url && url.startsWith('blob:') && activeBlobUrls.current.has(url)) {
      // Only revoke if it's not being used in the products list
      const isUsedInProducts = products.some(product => product.image === url);
      
      if (!isUsedInProducts) {
        URL.revokeObjectURL(url);
        activeBlobUrls.current.delete(url);
      }
    }
  };

  const handleOpen = (item?: Product) => {
    // Blur the currently focused element before opening the dialog
    // to help prevent aria-hidden conflicts with focused background elements.
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (item) {
      setSelectedItem(item);
      setFormData(item);
    } else {
      setSelectedItem(null);
      setFormData({});
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
    
    // Use our safe revocation helper
    safelyRevokeBlobUrl(stagedImageBlobUrl);
    
    setStagedImageBlobUrl(null);
    setFormData({});
    setNewFeature('');
    setNewSize('');
    setNewCategory('');
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors at the start of submission attempt

    // Client-side validation for required fields
    if (!formData.name || formData.name.trim() === '') {
      setError('Product name is required.');
      return;
    }
    if (!formData.categoryId) {
      setError('Please select a category.');
      return;
    }
    // If image is always required, validate it client-side.
    // Check if it exists, is a string, is not empty, and looks like a URL.
    if (!formData.image || 
        typeof formData.image !== 'string' || 
        formData.image.trim() === '' || 
        !(formData.image.startsWith('blob:') || formData.image.startsWith('http') || formData.image.startsWith('/uploads/'))
    ) {
      setError('Product image is required. Please upload an image or ensure a valid image URL is present.');
      return;
    }

    // Prepare the data payload
    const productPayload = {
      name: formData.name,
      description: formData.description ?? '',
      features: formData.features?.filter(f => f.trim() !== '') ?? [],
      sizes: formData.sizes?.filter(s => s.trim() !== '') ?? [],
      image: formData.image,
      isFeatured: formData.isFeatured ?? false,
      categoryId: formData.categoryId,
    };

    if (selectedItem?.id) {
      updateMutation.mutate({ id: selectedItem.id, data: productPayload });
    } else {
      createMutation.mutate(productPayload);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features ?? []), newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index),
    });
  };

  const handleAddSize = () => {
    if (newSize.trim()) {
      setFormData({
        ...formData,
        sizes: [...(formData.sizes ?? []), newSize.trim()],
      });
      setNewSize('');
    }
  };

  const handleRemoveSize = (index: number) => {
    setFormData({
      ...formData,
      sizes: formData.sizes?.filter((_, i) => i !== index),
    });
  };

  const handleCreateCategory = () => {
    if (newCategory.trim()) {
      createCategoryMutation.mutate({ name: newCategory.trim() });
    }
  };

  const handleImageChange = (url: string) => {
    // Track the new blob URL
    if (url.startsWith('blob:')) {
      activeBlobUrls.current.add(url);
    }
    
    // Convert relative path to full URL if needed
    const fullUrl = url.startsWith('/uploads/') 
      ? `${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}${url}`
      : url;
    
    setStagedImageBlobUrl(url);
    setFormData((prev) => ({ ...prev, image: fullUrl }));
  };

  const handleImageDelete = () => {
    // Use our safe revocation helper
    safelyRevokeBlobUrl(stagedImageBlobUrl);
    
    setStagedImageBlobUrl(null);
    setFormData((prev) => ({ ...prev, image: undefined }));
  };

  if (isLoadingProducts || isLoadingCategories) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Products</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Product
        </Button>
      </Box>

      <DataTable
        columns={columns}
        data={products}
        onEdit={(id) => handleOpen(products.find((item) => item.id === id))}
        onDelete={handleDelete}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {selectedItem ? 'Edit Product' : 'Add Product'}
          </DialogTitle>
          <DialogContent>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={formData.name ?? ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description ?? ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <Autocomplete
              options={categories}
              getOptionLabel={(option) => option.name}
              value={categories.find(c => c.id === formData.categoryId) ?? null}
              onChange={(_, newValue) => {
                if (newValue) {
                  setFormData({ ...formData, categoryId: newValue.id });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="dense"
                  label="Category"
                  required
                />
              )}
              renderOption={(props, option) => {
                // MUI Autocomplete passes props that include a key. We should extract it.
                const { key, ...restProps } = props as any; // Cast to any to access key
                return (
                  <li key={key} {...restProps}>
                    <Box>
                      <Typography>{option.name}</Typography>
                      {option.description && (
                        <Typography variant="body2" color="text.secondary">
                          {option.description}
                        </Typography>
                      )}
                    </Box>
                  </li>
                );
              }}
              noOptionsText={
                <Box sx={{ p: 1 }}>
                  <Typography>No categories found</Typography>
                  <Button
                    onClick={() => setShowNewCategoryDialog(true)}
                    sx={{ mt: 1 }}
                  >
                    Add New Category
                  </Button>
                </Box>
              }
            />
            <Box sx={{ mt: 2 }}>
              <FileUpload
                value={formData.image}
                onChange={handleImageChange}
                onDelete={handleImageDelete}
                accept="image/*"
                label="Upload Product Image"
                helperText="Supported formats: JPG, PNG, GIF (max 5MB)"
                type="image"
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Features
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  size="small"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature"
                  fullWidth
                />
                <Button onClick={handleAddFeature}>Add</Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.features?.map((feature, index) => (
                  <Chip
                    key={index}
                    label={feature}
                    onDelete={() => handleRemoveFeature(index)}
                  />
                ))}
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Sizes
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  size="small"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  placeholder="Add a size"
                  fullWidth
                />
                <Button onClick={handleAddSize}>Add</Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.sizes?.map((size, index) => (
                  <Chip
                    key={index}
                    label={size}
                    onDelete={() => handleRemoveSize(index)}
                  />
                ))}
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Featured Status
              </Typography>
              <Button
                variant={formData.isFeatured ? 'contained' : 'outlined'}
                onClick={() => setFormData({ ...formData, isFeatured: !formData.isFeatured })}
                fullWidth
              >
                {formData.isFeatured ? 'Featured' : 'Not Featured'}
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedItem ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={showNewCategoryDialog}
        onClose={() => setShowNewCategoryDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name for the new category
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNewCategoryDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateCategory} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 