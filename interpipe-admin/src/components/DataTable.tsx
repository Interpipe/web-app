import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Zoom,
  Fade,
  useTheme,
  alpha,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import {
  Pencil as EditIcon,
  Trash2 as DeleteIcon,
  ChevronRight as KeyboardArrowRightIcon,
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
  Code as CodeIcon,
  Cloud as CloudIcon,
  Settings as SettingsIcon,
  Shield as SecurityIcon,
} from 'lucide-react';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
  renderCell?: (value: any) => React.ReactNode;
  type?: 'icon' | 'boolean' | 'text' | 'number';
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  title?: string;
}

export default function DataTable({ columns, data, onEdit, onDelete, onViewDetails, title }: DataTableProps) {
  const theme = useTheme();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  // Function to dynamically render a Lucide icon based on its name
  const renderLucideIcon = (iconName: string) => {
    if (!iconName) {
      return <HelpOutlineIcon size={18} color={theme.palette.action.active} />;
    }
    
    const lowerIconName = iconName.toLowerCase().trim();
    const iconColor = theme.palette.primary.main;
    const iconSize = 18;

    const iconMap: Record<string, React.ReactNode> = {
      'star': <StarIcon size={iconSize} color={iconColor} />,
      'trending_up': <TrendingUpIcon size={iconSize} color={iconColor} />,
      'trending-up': <TrendingUpIcon size={iconSize} color={iconColor} />,
      'trendingup': <TrendingUpIcon size={iconSize} color={iconColor} />,
      'trending_down': <TrendingDownIcon size={iconSize} color={iconColor} />,
      'trending-down': <TrendingDownIcon size={iconSize} color={iconColor} />,
      'trendingdown': <TrendingDownIcon size={iconSize} color={iconColor} />,
      'people': <PeopleIcon size={iconSize} color={iconColor} />,
      'users': <PeopleIcon size={iconSize} color={iconColor} />, // alias
      'business': <BusinessIcon size={iconSize} color={iconColor} />,
      'building': <BusinessIcon size={iconSize} color={iconColor} />,
      'build': <BuildIcon size={iconSize} color={iconColor} />,
      'wrench': <BuildIcon size={iconSize} color={iconColor} />,
      'show_chart': <ShowChartIcon size={iconSize} color={iconColor} />,
      'show-chart': <ShowChartIcon size={iconSize} color={iconColor} />,
      'showchart': <ShowChartIcon size={iconSize} color={iconColor} />,
      'linechart': <ShowChartIcon size={iconSize} color={iconColor} />,
      'line-chart': <ShowChartIcon size={iconSize} color={iconColor} />,
      'attach_money': <AttachMoneyIcon size={iconSize} color={iconColor} />,
      'attach-money': <AttachMoneyIcon size={iconSize} color={iconColor} />,
      'attachmoney': <AttachMoneyIcon size={iconSize} color={iconColor} />,
      'money': <AttachMoneyIcon size={iconSize} color={iconColor} />, // alias
      'dollarsign': <AttachMoneyIcon size={iconSize} color={iconColor} />,
      'dollar-sign': <AttachMoneyIcon size={iconSize} color={iconColor} />,
      'assessment': <AssessmentIcon size={iconSize} color={iconColor} />,
      'barchart3': <AssessmentIcon size={iconSize} color={iconColor} />,
      'bar-chart-3': <AssessmentIcon size={iconSize} color={iconColor} />,
      'bar_chart': <BarChartIcon size={iconSize} color={iconColor} />,
      'bar-chart': <BarChartIcon size={iconSize} color={iconColor} />,
      'barchart': <BarChartIcon size={iconSize} color={iconColor} />,
      'barchart2': <BarChartIcon size={iconSize} color={iconColor} />,
      'bar-chart-2': <BarChartIcon size={iconSize} color={iconColor} />,
      'apartment': <ApartmentIcon size={iconSize} color={iconColor} />,
      'building2': <ApartmentIcon size={iconSize} color={iconColor} />,
      'building-2': <ApartmentIcon size={iconSize} color={iconColor} />,
      'code': <CodeIcon size={iconSize} color={iconColor} />,
      'cloud': <CloudIcon size={iconSize} color={iconColor} />,
      'settings': <SettingsIcon size={iconSize} color={iconColor} />,
      'shield': <SecurityIcon size={iconSize} color={iconColor} />, 
      // Add more icons here as needed
    };

    const iconComponent = iconMap[lowerIconName];
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {iconComponent ?? <HelpOutlineIcon size={iconSize} color={theme.palette.action.active} />}
        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
          {iconName}
        </Typography>
      </Box>
    );
  };

  return (
    <Fade in={true} timeout={800}>
      <Paper 
        sx={{ 
          width: '100%', 
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          borderRadius: 2,
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            transform: 'translateY(-2px)'
          }
        }}
      >
        {title && (
          <Box sx={{ 
            p: 2, 
            borderBottom: `1px solid ${theme.palette.divider}`,
            background: alpha(theme.palette.primary.main, 0.05),
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: theme.palette.primary.main
              }}
            >
              {title}
            </Typography>
          </Box>
        )}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{
                      fontWeight: 'bold',
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      color: theme.palette.primary.main,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.12),
                      }
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell 
                    align="center"
                    sx={{
                      fontWeight: 'bold',
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      color: theme.palette.primary.main,
                    }}
                  >
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow 
                  hover 
                  role="checkbox" 
                  tabIndex={-1} 
                  key={row.id}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  sx={{
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    backgroundColor: hoveredRow === row.id ? alpha(theme.palette.primary.main, 0.04) : 'transparent',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      transform: 'translateX(4px)'
                    },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      backgroundColor: hoveredRow === row.id ? theme.palette.primary.main : 'transparent',
                      transition: 'background-color 0.2s ease',
                    }
                  }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    
                    // Special handling for icon columns
                    if (column.type === 'icon' || column.id === 'icon') {
                      return (
                        <TableCell 
                          key={column.id} 
                          align={column.align}
                          sx={{
                            transition: 'all 0.2s ease',
                            verticalAlign: 'middle',
                          }}
                        >
                          {renderLucideIcon(value)}
                        </TableCell>
                      );
                    }
                    
                    return (
                      <TableCell 
                        key={column.id} 
                        align={column.align}
                        sx={{
                          transition: 'all 0.2s ease',
                          verticalAlign: 'middle',
                        }}
                      >
                        {column.renderCell ? (
                          column.renderCell(value)
                        ) : column.format ? (
                          column.format(value)
                        ) : typeof value === 'boolean' ? (
                          <Chip 
                            label={value ? 'Yes' : 'No'} 
                            size="small" 
                            color={value ? 'success' : 'default'}
                            variant="outlined"
                            sx={{ 
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                transform: 'scale(1.05)'
                              } 
                            }}
                          />
                        ) : value
                        }
                      </TableCell>
                    );
                  })}
                  {(onEdit || onDelete) && (
                    <TableCell align="center">
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                        gap: 1,
                        opacity: hoveredRow === row.id ? 1 : 0.5,
                        transition: 'opacity 0.2s ease'
                      }}>
                        {onEdit && (
                          <Tooltip title="Edit" TransitionComponent={Zoom} arrow>
                            <IconButton
                              size="small"
                              onClick={() => onEdit(row.id)}
                              sx={{
                                color: theme.palette.primary.main,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  transform: 'scale(1.1)'
                                }
                              }}
                            >
                              <EditIcon size={16} />
                            </IconButton>
                          </Tooltip>
                        )}
                        {onDelete && (
                          <Tooltip title="Delete" TransitionComponent={Zoom} arrow>
                            <IconButton
                              size="small"
                              onClick={() => onDelete(row.id)}
                              sx={{
                                color: theme.palette.error.main,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  backgroundColor: alpha(theme.palette.error.main, 0.1),
                                  transform: 'scale(1.1)'
                                }
                              }}
                            >
                              <DeleteIcon size={16} />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Fade in={hoveredRow === row.id}>
                          <IconButton
                            size="small"
                            onClick={() => onViewDetails?.(row.id)}
                            sx={{
                              color: theme.palette.text.secondary,
                              transition: 'all 0.2s ease',
                              visibility: onViewDetails ? 'visible' : 'hidden',
                              '&:hover': {
                                color: theme.palette.primary.main,
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              }
                            }}
                          >
                            <KeyboardArrowRightIcon size={16} />
                          </IconButton>
                        </Fade>
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Fade>
  );
} 