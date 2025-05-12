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
  Stack,
  Paper,
  IconButton,
  useTheme,
  alpha,
  Avatar,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Plus as AddIcon,
  X as CloseIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Users as PeopleIcon,
  Building as BusinessIcon,
  Wrench as BuildIcon,
  LineChart as ShowChartIcon,
  DollarSign as AttachMoneyIcon,
  BarChart3 as AssessmentIcon,
  BarChart2 as BarChartIcon,
  Building2 as ApartmentIcon,
  HelpCircle as HelpOutlineIcon,
  Award,
  Users,
  Clock,
  Rocket,
  HandCoins,
  PercentCircle,
  CircleDollarSign,
  Factory,
  Gauge,
  Truck,
  ShieldCheck,
  Database,
  Hammer
} from 'lucide-react';
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
  { id: 'icon', label: 'Icon', minWidth: 100, type: 'icon' as const },
];

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

export default function StatsPage() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Stat | null>(null);
  const [formData, setFormData] = useState<Partial<Stat>>({});
  const [detailViewOpen, setDetailViewOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<Stat | null>(null);
  const theme = useTheme();
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

  const handleViewDetails = (id: string) => {
    const item = stats.find((item) => item.id === id) ?? null;
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
      'trending_down': <TrendingDownIcon size={iconSize} color={iconColor} />,
      'trending-down': <TrendingDownIcon size={iconSize} color={iconColor} />,
      'trendingdown': <TrendingDownIcon size={iconSize} color={iconColor} />,
      'people': <PeopleIcon size={iconSize} color={iconColor} />,
      'users': <PeopleIcon size={iconSize} color={iconColor} />,
      'person': <PeopleIcon size={iconSize} color={iconColor} />,
      'business': <BusinessIcon size={iconSize} color={iconColor} />,
      'building': <BusinessIcon size={iconSize} color={iconColor} />,
      'build': <BuildIcon size={iconSize} color={iconColor} />,
      'wrench': <BuildIcon size={iconSize} color={iconColor} />,
      'show_chart': <ShowChartIcon size={iconSize} color={iconColor} />,
      'show-chart': <ShowChartIcon size={iconSize} color={iconColor} />,
      'showchart': <ShowChartIcon size={iconSize} color={iconColor} />,
      'chart': <ShowChartIcon size={iconSize} color={iconColor} />,
      'linechart': <ShowChartIcon size={iconSize} color={iconColor} />,
      'line-chart': <ShowChartIcon size={iconSize} color={iconColor} />,
      'attach_money': <AttachMoneyIcon size={iconSize} color={iconColor} />,
      'attach-money': <AttachMoneyIcon size={iconSize} color={iconColor} />,
      'attachmoney': <AttachMoneyIcon size={iconSize} color={iconColor} />,
      'money': <AttachMoneyIcon size={iconSize} color={iconColor} />,
      'dollarsign': <AttachMoneyIcon size={iconSize} color={iconColor} />,
      'dollar-sign': <AttachMoneyIcon size={iconSize} color={iconColor} />,
      'dollar': <AttachMoneyIcon size={iconSize} color={iconColor} />,
      'assessment': <AssessmentIcon size={iconSize} color={iconColor} />,
      'bar_chart': <BarChartIcon size={iconSize} color={iconColor} />,
      'bar-chart': <BarChartIcon size={iconSize} color={iconColor} />,
      'barchart': <BarChartIcon size={iconSize} color={iconColor} />,
      'barchart2': <BarChartIcon size={iconSize} color={iconColor} />,
      'bar-chart-2': <BarChartIcon size={iconSize} color={iconColor} />,
      'apartment': <ApartmentIcon size={iconSize} color={iconColor} />,
      'building2': <ApartmentIcon size={iconSize} color={iconColor} />,
      'building-2': <ApartmentIcon size={iconSize} color={iconColor} />,
      'award': <Award size={iconSize} color={iconColor} />,
      'users': <Users size={iconSize} color={iconColor} />,
      'clock': <Clock size={iconSize} color={iconColor} />,
      'rocket': <Rocket size={iconSize} color={iconColor} />,
      'handcoins': <HandCoins size={iconSize} color={iconColor} />,
      'hand-coins': <HandCoins size={iconSize} color={iconColor} />,
      'percent': <PercentCircle size={iconSize} color={iconColor} />,
      'percentcircle': <PercentCircle size={iconSize} color={iconColor} />,
      'percent-circle': <PercentCircle size={iconSize} color={iconColor} />,
      'circledollarsign': <CircleDollarSign size={iconSize} color={iconColor} />,
      'circle-dollar-sign': <CircleDollarSign size={iconSize} color={iconColor} />,
      'circle-dollar': <CircleDollarSign size={iconSize} color={iconColor} />,
      'factory': <Factory size={iconSize} color={iconColor} />,
      'gauge': <Gauge size={iconSize} color={iconColor} />,
      'truck': <Truck size={iconSize} color={iconColor} />,
      'shieldcheck': <ShieldCheck size={iconSize} color={iconColor} />,
      'shield-check': <ShieldCheck size={iconSize} color={iconColor} />,
      'database': <Database size={iconSize} color={iconColor} />,
      'hammer': <Hammer size={iconSize} color={iconColor} />,
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
        onViewDetails={handleViewDetails}
        title="Statistics"
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
            Stat Details
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
                
                <Typography variant="h3" gutterBottom fontWeight="bold" color="primary">
                  {Number(detailItem.number).toLocaleString()}
                </Typography>
                
                <Typography variant="h5" color="text.secondary">
                  {detailItem.label}
                </Typography>
              </Paper>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">
                  Last updated: {formatDate(detailItem.updatedAt)}
                </Typography>
                <Typography variant="subtitle1">
                  ID: {detailItem.id}
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
                    if (window.confirm('Are you sure you want to delete this stat?')) {
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
            
            <Box sx={{ mt: 2, mb: 1 }}>
              <TextField
                label="Icon (Lucide Icon name)"
                fullWidth
                value={formData.icon ?? ''}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                required
                helperText="Enter a Lucide icon name (e.g., 'trending-up', 'users', 'dollar-sign')"
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