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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Delete as DeleteIcon } from '@mui/icons-material';
import DataTable from '../components/DataTable';
import {
  getContactSubmissions,
  deleteContactSubmission,
  updateContactStatus,
} from '../services/api';
import type { ContactSubmission } from '../types';

const STATUS_OPTIONS = ['PENDING', 'IN_PROGRESS', 'RESPONDED', 'CLOSED'] as const;

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'phone', label: 'Phone', minWidth: 130 },
  { id: 'subject', label: 'Subject', minWidth: 170 },
  { id: 'message', label: 'Message', minWidth: 300 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    format: (value: string) => (
      <Chip
        label={value}
        color={value === 'RESPONDED' ? 'success' : value === 'IN_PROGRESS' ? 'info' : value === 'CLOSED' ? 'error' : 'warning'}
        size="small"
      />
    ),
  },
];

export default function ContactPage() {
  const [open, setOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const queryClient = useQueryClient();

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ['contact'],
    queryFn: getContactSubmissions,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteContactSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact'] });
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateContactStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact'] });
    },
  });

  const handleOpen = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSubmission(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleStatusChange = (status: string) => {
    if (selectedSubmission) {
      statusMutation.mutate({ id: selectedSubmission.id, status });
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Contact Submissions</Typography>
      </Box>

      <DataTable
        columns={columns}
        data={submissions}
        onEdit={(id) => handleOpen(submissions.find((sub) => sub.id === id)!)}
        onDelete={handleDelete}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Contact Submission Details</DialogTitle>
        <DialogContent>
          {selectedSubmission && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Name
              </Typography>
              <Typography paragraph>{selectedSubmission.name}</Typography>

              <Typography variant="subtitle2" gutterBottom>
                Email
              </Typography>
              <Typography paragraph>{selectedSubmission.email}</Typography>

              <Typography variant="subtitle2" gutterBottom>
                Phone
              </Typography>
              <Typography paragraph>{selectedSubmission.phone}</Typography>

              <Typography variant="subtitle2" gutterBottom>
                Subject
              </Typography>
              <Typography paragraph>{selectedSubmission.subject}</Typography>

              <Typography variant="subtitle2" gutterBottom>
                Message
              </Typography>
              <Typography paragraph>{selectedSubmission.message}</Typography>

              <Typography variant="subtitle2" gutterBottom>
                Status
              </Typography>
              <FormControl sx={{ minWidth: 200 }}>
                <Select
                  value={selectedSubmission.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  size="small"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <MenuItem key={status} value={status}>
                      <Chip
                        label={status}
                        color={status === 'RESPONDED' ? 'success' : status === 'IN_PROGRESS' ? 'info' : status === 'CLOSED' ? 'error' : 'warning'}
                        size="small"
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Submitted At
              </Typography>
              <Typography paragraph>
                {new Date(selectedSubmission.createdAt).toLocaleString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => {
              handleDelete(selectedSubmission!.id);
              handleClose();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 