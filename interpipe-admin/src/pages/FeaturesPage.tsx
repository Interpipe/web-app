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
  IconButton,
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
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Feature> }) =>
      updateFeature(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['features'] });
      handleClose();
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