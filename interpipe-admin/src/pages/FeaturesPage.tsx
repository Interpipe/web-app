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
  Stack,
  Paper,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Plus as AddIcon,
  X as CloseIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Settings as SettingsIcon,
  Wrench as BuildIcon,
  Cog as EngineeringIcon,
  Gauge as SpeedIcon,
  CreditCard as CreditCardIcon,
  Building2 as ApartmentIcon,
  Shield as SecurityIcon,
  Landmark as AccountBalanceIcon,
  MessageSquare as QuestionAnswerIcon,
  HelpCircle as SupportIcon,
  Phone as PhoneInTalkIcon,
  Smartphone as DevicesIcon,
  Construction as ConstructionIcon,
  Cloud as CloudIcon,
  Code as CodeIcon,
  HelpCircle as HelpOutlineIcon,
} from 'lucide-react';
import DataTable from '../components/DataTable';
import {
  getFeatures,
  createFeature,
  updateFeature,
  deleteFeature,
} from '../services/api';

// Define Feature interface to match API response
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

// Helper function to safely format dates
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'N/A';
    }
    return date.toLocaleDateString();
  } catch (error) {
    return 'N/A';
  }
};

// Define the columns for the DataTable
const columns = [
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 300 },
  { 
    id: 'icon', 
    label: 'Icon', 
    minWidth: 100, 
    type: 'icon' as const 
  },
];

export default function FeaturesPage() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Feature | null>(null);
  const [formData, setFormData] = useState<Partial<Feature>>({});
  const [error, setError] = useState<string | null>(null);
  const [detailViewOpen, setDetailViewOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<Feature | null>(null);
  const theme = useTheme();
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

  const handleViewDetails = (id: string) => {
    const item = features.find((item) => item.id === id) ?? null;
    if (item) {
      setDetailItem(item);
      setDetailViewOpen(true);
    }
  };

  const handleCloseDetailView = () => {
    setDetailViewOpen(false);
    setDetailItem(null);
  };

  // Create a shared icon mapping
  const createLucideIconMap = (size: 'small' | 'large'): Record<string, React.ReactNode> => {
    // Determine icon size in pixels based on the size parameter
    const iconSize = size === 'small' ? 18 : 32;
    const iconColor = theme.palette.primary.main;
    
    return {
      // Common icons - using Lucide icons
      'star': <StarIcon size={iconSize} color={iconColor} />,
      'trending_up': <TrendingUpIcon size={iconSize} color={iconColor} />,
      'trending-up': <TrendingUpIcon size={iconSize} color={iconColor} />,
      'trendingup': <TrendingUpIcon size={iconSize} color={iconColor} />,
      'settings': <SettingsIcon size={iconSize} color={iconColor} />,
      'build': <BuildIcon size={iconSize} color={iconColor} />,
      'wrench': <BuildIcon size={iconSize} color={iconColor} />,
      'engineering': <EngineeringIcon size={iconSize} color={iconColor} />,
      'cog': <EngineeringIcon size={iconSize} color={iconColor} />,
      'speed': <SpeedIcon size={iconSize} color={iconColor} />,
      'gauge': <SpeedIcon size={iconSize} color={iconColor} />,
      'credit_card': <CreditCardIcon size={iconSize} color={iconColor} />,
      'credit-card': <CreditCardIcon size={iconSize} color={iconColor} />,
      'creditcard': <CreditCardIcon size={iconSize} color={iconColor} />,
      'apartment': <ApartmentIcon size={iconSize} color={iconColor} />,
      'building2': <ApartmentIcon size={iconSize} color={iconColor} />,
      'security': <SecurityIcon size={iconSize} color={iconColor} />,
      'shield': <SecurityIcon size={iconSize} color={iconColor} />,
      'account_balance': <AccountBalanceIcon size={iconSize} color={iconColor} />,
      'account-balance': <AccountBalanceIcon size={iconSize} color={iconColor} />,
      'accountbalance': <AccountBalanceIcon size={iconSize} color={iconColor} />,
      'landmark': <AccountBalanceIcon size={iconSize} color={iconColor} />,
      'question_answer': <QuestionAnswerIcon size={iconSize} color={iconColor} />,
      'question-answer': <QuestionAnswerIcon size={iconSize} color={iconColor} />,
      'questionanswer': <QuestionAnswerIcon size={iconSize} color={iconColor} />,
      'messagesquare': <QuestionAnswerIcon size={iconSize} color={iconColor} />,
      'message-square': <QuestionAnswerIcon size={iconSize} color={iconColor} />,
      'support': <SupportIcon size={iconSize} color={iconColor} />,
      'helpcircle': <SupportIcon size={iconSize} color={iconColor} />,
      'help-circle': <SupportIcon size={iconSize} color={iconColor} />,
      'phone_in_talk': <PhoneInTalkIcon size={iconSize} color={iconColor} />,
      'phone-in-talk': <PhoneInTalkIcon size={iconSize} color={iconColor} />,
      'phoneintalk': <PhoneInTalkIcon size={iconSize} color={iconColor} />,
      'phone': <PhoneInTalkIcon size={iconSize} color={iconColor} />,
      'devices': <DevicesIcon size={iconSize} color={iconColor} />,
      'smartphone': <DevicesIcon size={iconSize} color={iconColor} />,
      'construction': <ConstructionIcon size={iconSize} color={iconColor} />,
      'cloud': <CloudIcon size={iconSize} color={iconColor} />,
      'code': <CodeIcon size={iconSize} color={iconColor} />,
    };
  };

  // Function to get a Lucide icon component by name
  const getLucideIcon = (iconName: string) => {
    if (!iconName) return <HelpOutlineIcon size={32} color={theme.palette.action.active} />;
    
    // Clean up and normalize the icon name
    const lowerIconName = iconName.toLowerCase().trim();
    
    // Use the shared icon mapping
    const iconMap = createLucideIconMap('large');
    
    const IconComponent = iconMap[lowerIconName];
    
    // If we can't find the icon, log it for debugging
    if (!IconComponent) {
      console.warn(`Icon not found: "${iconName}". Available icons: ${getAvailableIcons()}`);
    }
    
    return IconComponent ?? <HelpOutlineIcon size={32} color={theme.palette.action.active} />;
  };

  // Get a comma-separated list of available icon names for reference
  const getAvailableIcons = (): string => {
    const iconMap = createLucideIconMap('small');
    return Object.keys(iconMap).filter(name => !name.includes('_') && !name.includes('-')).join(', ');
  };

  // Function to get a smaller icon for preview
  const getSmallLucideIcon = (iconName: string) => {
    if (!iconName) return <HelpOutlineIcon size={18} color={theme.palette.action.active} />;
    
    // Clean up and normalize the icon name
    const lowerIconName = iconName.toLowerCase().trim();
    
    // Use the shared icon mapping
    const iconMap = createLucideIconMap('small');
    
    return iconMap[lowerIconName] ?? <HelpOutlineIcon size={18} color={theme.palette.action.active} />;
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
        onViewDetails={handleViewDetails}
        title="Product Features"
      />

      {/* Detail View Dialog */}
      <Dialog 
        open={detailViewOpen} 
        onClose={handleCloseDetailView}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          pb: 2,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}>
          <DialogTitle sx={{ p: 0, m: 0 }}>
            Feature Details
          </DialogTitle>
          <IconButton onClick={handleCloseDetailView} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          {detailItem && (
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    margin: '0 auto 16px',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getLucideIcon(detailItem.icon)}
                </Box>
                
                <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
                  {detailItem.title}
                </Typography>
                
                <Typography variant="body1" color="text.secondary">
                  {detailItem.description}
                </Typography>
              </Paper>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">
                  Last updated: {formatDate(detailItem.updatedAt)}
                </Typography>
                <Typography variant="subtitle1">
                  Order: {detailItem.order}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button 
                  onClick={() => {
                    handleCloseDetailView();
                    handleOpen(detailItem);
                  }}
                >
                  Edit
                </Button>
                <Button 
                  variant="outlined" 
                  color="error"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this feature?')) {
                      handleDelete(detailItem.id);
                      handleCloseDetailView();
                    }
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Stack>
          )}
        </DialogContent>
      </Dialog>

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
            
            <Box sx={{ mt: 2, mb: 1 }}>
              <TextField
                label="Icon (Lucide Icon name)"
                fullWidth
                value={formData.icon ?? ''}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                required
                helperText="Enter a Lucide icon name (e.g., 'star', 'settings', 'shield', 'code')"
                InputProps={{
                  startAdornment: formData.icon ? (
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      {getSmallLucideIcon(formData.icon)}
                    </Box>
                  ) : null,
                }}
              />
              
              {formData.icon && (
                <Paper 
                  elevation={0} 
                  sx={{ 
                    mt: 2, 
                    p: 2, 
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>Icon Preview</Typography>
                  <Box sx={{ 
                    mt: 1, 
                    p: 2, 
                    borderRadius: '50%',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {getLucideIcon(formData.icon)}
                  </Box>
                </Paper>
              )}
              
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                Common icons: {getAvailableIcons()}
              </Typography>
            </Box>
            
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