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
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Add as AddIcon } from '@mui/icons-material';
import ThumbnailGrid from '../components/ThumbnailGrid';
import FileUpload from '../components/FileUpload';
import {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from '../services/api';
import type { Partner } from '../types';

export default function PartnersPage() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Partner | null>(null);
  const [formData, setFormData] = useState<Partial<Partner>>({});
  const queryClient = useQueryClient();

  const { data: partners = [], isLoading } = useQuery({
    queryKey: ['partners'],
    queryFn: getPartners,
  });

  const createMutation = useMutation({
    mutationFn: createPartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      handleClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Partner> }) =>
      updatePartner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      handleClose();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });

  const handleOpen = (item?: Partner) => {
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
    
    // Ensure all required fields are present and properly formatted
    if (!formData.name || !formData.logo) {
      return; // Form validation will prevent submission
    }

    // Construct the full URL for the logo
    const logoUrl = formData.logo.startsWith('http') 
      ? formData.logo 
      : `http://localhost:3000${formData.logo}`;

    const partnerData = {
      name: formData.name,
      logo: logoUrl,
      order: Number(formData.order ?? 0)
    };

    if (selectedItem) {
      updateMutation.mutate({ id: selectedItem.id, data: partnerData });
    } else {
      createMutation.mutate(partnerData);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Partners</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Partner
        </Button>
      </Box>

      <ThumbnailGrid
        items={partners}
        imageKey="logo"
        titleKey="name"
        imageHeight={120}
        onEdit={(id) => handleOpen(partners.find((item) => item.id === id))}
        onDelete={handleDelete}
        cardWidth={300}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {selectedItem ? 'Edit Partner' : 'Add Partner'}
          </DialogTitle>
          <DialogContent>
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
              label="Order"
              type="number"
              fullWidth
              value={formData.order ?? 0}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              required
            />
            <Box sx={{ mt: 2 }}>
              <FileUpload
                value={formData.logo}
                onChange={(url) => setFormData({ ...formData, logo: url })}
                onDelete={() => setFormData({ ...formData, logo: undefined })}
                accept="image/*"
                label="Upload Partner Logo"
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
    </Box>
  );
} 