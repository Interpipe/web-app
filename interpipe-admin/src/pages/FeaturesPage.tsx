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
  Alert,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Add as AddIcon } from '@mui/icons-material';
import DataTable from '../components/DataTable';
import {
  getFeatures,
  createFeature,
  updateFeature,
  deleteFeature,
} from '../services/api';
import type { Feature } from '../types';

const columns = [
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 300 },
  { id: 'icon', label: 'Icon', minWidth: 100 },
];

export default function FeaturesPage() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Feature | null>(null);
  const [formData, setFormData] = useState<Partial<Feature>>({});
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: features = [], isLoading } = useQuery({
    queryKey: ['features'],
    queryFn: getFeatures,
  });

  const createMutation = useMutation({
    mutationFn: createFeature,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['features'] });
      handleClose();
    },
    onError: (error: any) => {
      console.error('Create feature error:', error.response?.data);
      if (error.response?.data?.errors) {
        console.error('Server validation errors:', JSON.stringify(error.response.data.errors));
      }
      setError(error.response?.data?.message ?? 'Failed to create feature');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Feature> }) =>
      updateFeature(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['features'] });
      handleClose();
    },
    onError: (error: any) => {
      console.error('Update feature error:', error.response?.data);
      setError(error.response?.data?.message ?? 'Failed to update feature');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFeature,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['features'] });
    },
  });

  const handleOpen = (item?: Feature) => {
    if (item) {
      setSelectedItem(item);
      setFormData(item);
    } else {
      setSelectedItem(null);
      setFormData({ order: 0 });
    }
    setError(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
    setFormData({});
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title?.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.description?.trim()) {
      setError('Description is required');
      return;
    }
    if (!formData.icon?.trim()) {
      setError('Icon is required');
      return;
    }
    if (formData.order === undefined || formData.order === null || isNaN(Number(formData.order))) {
      setError('Order must be a valid number');
      return;
    }

    if (selectedItem) {
      updateMutation.mutate({ id: selectedItem.id, data: formData });
    } else {
      createMutation.mutate(formData as Omit<Feature, 'id' | 'createdAt' | 'updatedAt'>);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Features</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Feature
        </Button>
      </Box>

      <DataTable
        columns={columns}
        data={features}
        onEdit={(id) => handleOpen(features.find((item) => item.id === id))}
        onDelete={handleDelete}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {selectedItem ? 'Edit Feature' : 'Add Feature'}
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
            <TextField
              margin="dense"
              label="Icon (Material Icon name)"
              fullWidth
              value={formData.icon ?? ''}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              required
              helperText="Enter a Material Icon name (e.g., 'settings', 'build', 'engineering')"
            />
            <TextField
              margin="dense"
              label="Order"
              type="number"
              fullWidth
              value={formData.order ?? 0}
              onChange={(e) => 
                setFormData({ 
                  ...formData, 
                  order: e.target.value === '' ? 0 : parseInt(e.target.value, 10) 
                })
              }
              required
              inputProps={{ min: 0 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedItem ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
} 