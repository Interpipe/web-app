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
  Chip,
  Alert,
  Autocomplete,
  DialogContentText,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Add as AddIcon, Description as DescriptionIcon } from '@mui/icons-material';
import DataTable from '../components/DataTable';
import FileUpload from '../components/FileUpload';
import {
  getDownloadItems,
  createDownloadItem,
  updateDownloadItem,
  deleteDownloadItem,
  getCategories,
  createCategory,
} from '../services/api';
import type { DownloadItem, Category } from '../types';

const columns = [
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'category', label: 'Category', minWidth: 100 },
  {
    id: 'fileUrl',
    label: 'Document',
    minWidth: 150,
    format: (value: string) => {
      const fileName = value.split('/').pop() ?? '';
      const fileType = fileName.split('.').pop()?.toUpperCase() ?? '';
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DescriptionIcon color="primary" />
          <Box>
            <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
              {fileName}
            </Typography>
            <Chip
              label={fileType}
              size="small"
              sx={{ height: 20, fontSize: '0.75rem' }}
            />
          </Box>
        </Box>
      );
    },
  },
  { id: 'fileSize', label: 'Size', minWidth: 100 },
];

export default function DownloadsPage() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DownloadItem | null>(null);
  const [formData, setFormData] = useState<Partial<DownloadItem>>({});
  const [error, setError] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false);
  const queryClient = useQueryClient();

  const { data: downloadItems = [], isLoading: isLoadingDownloads } = useQuery({
    queryKey: ['downloads'],
    queryFn: getDownloadItems,
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
    mutationFn: createDownloadItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['downloads'] });
      handleClose();
    },
    onError: (error: any) => {
      console.log('Create download error:', error.response?.data);
      setError(error.response?.data?.message ?? 'Failed to create download item');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<DownloadItem> }) =>
      updateDownloadItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['downloads'] });
      handleClose();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDownloadItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['downloads'] });
    },
  });

  const handleOpen = (item?: DownloadItem) => {
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

  const handleCreateCategory = () => {
    if (newCategory.trim()) {
      createCategoryMutation.mutate({ name: newCategory.trim() });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate that required fields are present
    if (!formData.title?.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!formData.description?.trim()) {
      setError('Description is required');
      return;
    }
    
    if (!formData.category) {
      setError('Category is required');
      return;
    }
    
    if (!formData.fileUrl) {
      setError('File upload is required');
      return;
    }
    
    // Ensure fileType and fileSize are set
    if (!formData.fileType || !formData.fileSize) {
      setError('File information is incomplete');
      return;
    }

    console.log('Submitting download item:', formData);
    
    if (selectedItem) {
      updateMutation.mutate({ id: selectedItem.id, data: formData });
    } else {
      createMutation.mutate(formData as Omit<DownloadItem, 'id' | 'createdAt' | 'updatedAt'>);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this download item?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleFileUpload = (url: string, file?: File) => {
    // Guard against undefined or null file
    if (!file) {
      setFormData({
        ...formData,
        fileUrl: url,
      });
      return;
    }
    
    // Convert relative path to full URL if needed
    const fullUrl = url.startsWith('/uploads/') 
      ? `${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}${url}`
      : url;
    
    // Extract file information
    const fileType = file.name.split('.').pop()?.toUpperCase() ?? '';
    const fileSize = formatFileSize(file.size);
    
    setFormData({
      ...formData,
      fileUrl: fullUrl,
      fileType,
      fileSize,
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  if (isLoadingDownloads || isLoadingCategories) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Downloads</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Download Item
        </Button>
      </Box>

      <DataTable
        columns={columns}
        data={downloadItems}
        onEdit={(id) => handleOpen(downloadItems.find((item) => item.id === id))}
        onDelete={handleDelete}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {selectedItem ? 'Edit Download Item' : 'Add Download Item'}
          </DialogTitle>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
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
                value={formData.fileUrl}
                onChange={handleFileUpload}
                onDelete={() => setFormData({
                  ...formData,
                  fileUrl: undefined,
                  fileType: undefined,
                  fileSize: undefined,
                })}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                label="Upload Document"
                helperText="Supported formats: PDF, DOC, DOCX, XLS, XLSX (max 10MB)"
                type="document"
              />
            </Box>
            {formData.fileUrl && (
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Chip
                  icon={<DescriptionIcon />}
                  label={formData.fileType}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={formData.fileSize}
                  color="primary"
                  variant="outlined"
                />
              </Box>
            )}
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