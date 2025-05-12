import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Grid,
  Chip,
  Tooltip,
  Zoom,
  Dialog,
  DialogContent,
  alpha,
  useTheme,
  Fade,
  Container,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface ThumbnailGridProps {
  items: any[];
  imageKey: string;
  titleKey: string;
  subtitleKey?: string;
  chipKey?: string;
  chipFormat?: (value: any) => { label: string; color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  imageHeight?: number;
  noImagePlaceholder?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  cardWidth?: number | string;
}

export default function ThumbnailGrid({
  items,
  imageKey,
  titleKey,
  subtitleKey,
  chipKey,
  chipFormat,
  onEdit,
  onDelete,
  imageHeight = 180,
  noImagePlaceholder = 'https://placehold.co/400x300/e2e8f0/64748b?text=No+Image',
  maxWidth = 'lg',
  cardWidth,
}: ThumbnailGridProps) {
  const theme = useTheme();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleOpenPreview = (imageUrl: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setPreviewImage(imageUrl);
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
  };

  return (
    <Fade in={true} timeout={800}>
      <Container maxWidth={maxWidth} disableGutters sx={{ mx: 'auto' }}>
        <Grid container spacing={3}>
          {items.map((item) => {
            const imageUrl = item[imageKey] ?? noImagePlaceholder;
            const chipData = chipKey && chipFormat && item[chipKey] ? 
              chipFormat(item[chipKey]) : null;
              
            // Determine grid item size based on whether a fixed card width is provided
            const gridProps = cardWidth 
              ? { 
                  item: true,
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 4,
                  xl: 3,
                  sx: { 
                    display: 'flex',
                    justifyContent: 'center'
                  }
                }
              : {
                  item: true,
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 3
                };
              
            return (
              <Grid 
                {...gridProps}
                key={item.id}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    width: cardWidth ?? '100%',
                    maxWidth: '100%',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                    }
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height={imageHeight}
                      image={imageUrl}
                      alt={item[titleKey] ?? 'Thumbnail'}
                      sx={{ 
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = noImagePlaceholder;
                        target.onerror = null;
                      }}
                    />
                    
                    {/* Actions overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: hoveredItem === item.id ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
                        transition: 'background-color 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: hoveredItem === item.id ? 1 : 0,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 1,
                          backgroundColor: alpha(theme.palette.background.paper, 0.8),
                          borderRadius: 8,
                          padding: 1,
                          backdropFilter: 'blur(4px)',
                          transform: hoveredItem === item.id ? 'scale(1)' : 'scale(0.8)',
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        <Tooltip title="View Full Size" TransitionComponent={Zoom} arrow>
                          <IconButton
                            size="small"
                            onClick={(e) => handleOpenPreview(imageUrl, e)}
                            sx={{
                              color: theme.palette.info.main,
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.info.main, 0.1),
                                transform: 'scale(1.1)',
                              },
                            }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        
                        {onEdit && (
                          <Tooltip title="Edit" TransitionComponent={Zoom} arrow>
                            <IconButton
                              size="small"
                              onClick={() => onEdit(item.id)}
                              sx={{
                                color: theme.palette.primary.main,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  transform: 'scale(1.1)',
                                },
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        
                        {onDelete && (
                          <Tooltip title="Delete" TransitionComponent={Zoom} arrow>
                            <IconButton
                              size="small"
                              onClick={() => onDelete(item.id)}
                              sx={{
                                color: theme.palette.error.main,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  backgroundColor: alpha(theme.palette.error.main, 0.1),
                                  transform: 'scale(1.1)',
                                },
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          fontWeight: 'bold',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {item[titleKey] ?? 'No Title'}
                      </Typography>
                      
                      {chipData && (
                        <Chip
                          label={chipData.label}
                          color={chipData.color ?? 'default'}
                          size="small"
                          sx={{ ml: 1, mt: 0.5 }}
                        />
                      )}
                    </Box>
                    
                    {subtitleKey && item[subtitleKey] && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {item[subtitleKey]}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        
        {/* Full size image preview dialog */}
        <Dialog 
          open={!!previewImage} 
          onClose={handleClosePreview} 
          maxWidth="lg"
          PaperProps={{
            sx: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              backgroundImage: 'none',
              position: 'relative',
              overflow: 'visible',
            }
          }}
        >
          <IconButton
            onClick={handleClosePreview}
            sx={{
              position: 'absolute',
              top: -40,
              right: -40,
              backgroundColor: alpha(theme.palette.background.paper, 0.7),
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: alpha(theme.palette.background.paper, 0.9),
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent sx={{ p: 0, overflow: 'hidden', borderRadius: 2 }}>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                style={{ 
                  maxHeight: 'calc(100vh - 100px)',
                  maxWidth: '100%', 
                  display: 'block',
                  margin: '0 auto',
                  borderRadius: 8,
                  boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </Fade>
  );
} 