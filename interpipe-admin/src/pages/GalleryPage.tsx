import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Autocomplete,
  DialogContentText,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Add as AddIcon } from '@mui/icons-material';
import ThumbnailGrid from '../components/ThumbnailGrid';
import FileUpload from '../components/FileUpload';
import {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getCategories,
  createCategory,
} from '../services/api';
import type { GalleryItem, Category } from '../types';

const formatCategory = (categoryName: string) => {
  return {
    label: categoryName,
    color: 'primary' as const
  };
};

export default function GalleryPage() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState<Partial<GalleryItem>>({});
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: galleryItems = [], isLoading: isLoadingGallery } = useQuery({
    queryKey: ['gallery'],
    queryFn: getGalleryItems,
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
    mutationFn: createGalleryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      handleClose();
    },
    onError: (error: any) => {
      console.error('Gallery creation error:', error.response?.data);
      setError(error.response?.data?.message ?? 'Failed to create gallery item');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<GalleryItem> }) =>
      updateGalleryItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      handleClose();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteGalleryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
  });

  const handleOpen = (item?: GalleryItem) => {
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
    setFormData({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!formData.title?.trim()) {
      setError('Title is required');
      return;
    }

    if (!formData.description?.trim()) {
      setError('Description is required');
      return;
    }

    if (!formData.category?.trim()) {
      setError('Category is required');
      return;
    }

    if (!formData.imageUrl) {
      setError('Image is required');
      return;
    }

    // Convert relative path to full URL if needed
    const imageUrl = formData.imageUrl.startsWith('/uploads/') 
      ? `${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}${formData.imageUrl}`
      : formData.imageUrl;

    // Prepare the data payload
    const galleryPayload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category.trim(),
      imageUrl,
    };

    console.log('Submitting gallery payload:', galleryPayload);

    if (selectedItem) {
      updateMutation.mutate({ id: selectedItem.id, data: galleryPayload });
    } else {
      createMutation.mutate(galleryPayload);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCreateCategory = () => {
    if (newCategory.trim()) {
      createCategoryMutation.mutate({ name: newCategory.trim() });
    }
  };

  if (isLoadingGallery || isLoadingCategories) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Gallery</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Gallery Item
        </Button>
      </Box>

      <ThumbnailGrid
        items={galleryItems}
        imageKey="imageUrl"
        titleKey="title"
        subtitleKey="description"
        chipKey="category"
        chipFormat={formatCategory}
        onEdit={(id) => handleOpen(galleryItems.find((item) => item.id === id))}
        onDelete={handleDelete}
        imageHeight={200}
        cardWidth={300}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {selectedItem ? 'Edit Gallery Item' : 'Add Gallery Item'}
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
              label="Title"
              fullWidth
              value={formData.title ?? ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
              value={categories.find(c => c.name === formData.category) ?? null}
              onChange={(_, newValue) => {
                if (newValue) {
                  setFormData({ ...formData, category: newValue.name });
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
                const { key, ...restProps } = props as any;
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
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                onDelete={() => setFormData({ ...formData, imageUrl: undefined })}
                accept="image/*"
                label="Upload Image"
                helperText="Supported formats: JPG, PNG, GIF (max 5MB)"
                type="image"
              />
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