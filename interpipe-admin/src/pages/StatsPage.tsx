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
  getStats,
  createStat,
  updateStat,
  deleteStat,
} from '../services/api';
import type { Stat } from '../types';

const columns = [
  { id: 'label', label: 'Title', minWidth: 170 },
  { id: 'number', label: 'Value', minWidth: 100 },
  { id: 'icon', label: 'Icon', minWidth: 100 },
];

export default function StatsPage() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Stat | null>(null);
  const [formData, setFormData] = useState<Partial<Stat>>({});
  const queryClient = useQueryClient();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
  });

  const createMutation = useMutation({
    mutationFn: createStat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      handleClose();
    },
    onError: (error: any) => {
      const errorData = error.response?.data;
      console.error("Create stat error message:", errorData?.message);
      console.error(
        "Create stat error details (errors array):",
        JSON.stringify(errorData?.errors, null, 2)
      );
      alert(
        `Failed to create stat: ${
          errorData?.message ?? error.message
        } (Check console for details)`
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Stat> }) =>
      updateStat(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      handleClose();
    },
    onError: (error: any, variables) => {
      console.error(
        `Update stat error (ID: ${variables.id}):`,
        error.response?.data
      );
      alert(
        `Failed to update stat: ${
          error.response?.data?.message ?? error.message
        } (Check console for details)`
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });

  const handleOpen = (item?: Stat) => {
    if (item) {
      setSelectedItem(item);
      setFormData({
        id: item.id,
        title: item.label,
        value: Number(item.number),
        icon: item.icon,
        order: item.order ?? 0,
      });
    } else {
      setSelectedItem(null);
      setFormData({
        title: '',
        value: 0,
        icon: '',
        order: 0,
      });
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

    const currentFormData = { ...formData };

    if (!currentFormData.title?.trim()) {
      alert('Title cannot be empty.');
      return;
    }

    if (
      currentFormData.value === undefined ||
      typeof currentFormData.value !== 'number' ||
      isNaN(currentFormData.value)
    ) {
      alert(
        'The "Value" field is invalid or missing. Please ensure "Value" is a number.'
      );
      return;
    }
    
    if (!currentFormData.icon?.trim()) {
      alert('Icon cannot be empty.');
      return;
    }

    if (currentFormData.order === undefined || typeof currentFormData.order !== 'number') {
       alert('Order is missing or invalid.');
       return;
    }

    if (selectedItem) {
      const payload = {
        label: currentFormData.title,
        number: String(currentFormData.value),
        icon: currentFormData.icon,
        order: currentFormData.order,
      };

      const updateData = Object.fromEntries(
        Object.entries(payload).filter(([, value]) => value !== undefined)
      );

      updateMutation.mutate({ 
        id: selectedItem.id, 
        data: updateData as any 
      });
    } else {
      const payload = {
        label: currentFormData.title,
        number: String(currentFormData.value),
        icon: currentFormData.icon,
        order: currentFormData.order,
      };

      createMutation.mutate(
        payload as any
      );
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this stat?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Stats</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Stat
        </Button>
      </Box>

      <DataTable
        columns={columns}
        data={stats}
        onEdit={(id) => handleOpen(stats.find((item) => item.id === id))}
        onDelete={handleDelete}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {selectedItem ? 'Edit Stat' : 'Add Stat'}
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
              label="Value"
              fullWidth
              type="number"
              value={formData.value ?? ''}
              onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
              required
            />
            <TextField
              margin="dense"
              label="Icon (Material Icon name)"
              fullWidth
              value={formData.icon ?? ''}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              required
              helperText="Enter a Material Icon name (e.g., 'trending_up', 'people', 'star')"
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