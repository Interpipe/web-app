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
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'value', label: 'Value', minWidth: 100 },
  { id: 'unit', label: 'Unit', minWidth: 100 },
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
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Stat> }) =>
      updateStat(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      handleClose();
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
      createMutation.mutate(formData as Omit<Stat, 'id' | 'createdAt' | 'updatedAt'>);
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
              label="Unit"
              fullWidth
              value={formData.unit ?? ''}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              required
              helperText="e.g., 'Years', 'Projects', '%'"
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