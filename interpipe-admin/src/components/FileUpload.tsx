import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  IconButton,
  Card,
  CardMedia,
  Alert,
  Paper,
  alpha,
  useTheme,
  Tooltip,
  Zoom,
  Fade,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Description as DescriptionIcon,
  FileCopy as FileCopyIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

interface FileUploadProps {
  value?: string; // This will now store the file path from the server
  onChange: (filePath: string, file: File) => void;
  onDelete?: () => void;
  accept?: string;
  label?: string;
  helperText?: string;
  preview?: boolean;
  type?: 'image' | 'document'; // Used to determine uploadType for the API
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
const API_PATH = import.meta.env.VITE_API_BASE_PATH ?? '/api';

// Ensure API_URL doesn't end with slash
const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
const apiPath = API_PATH.startsWith('/') ? API_PATH : `/${API_PATH}`;

export default function FileUpload({
  value,
  onChange,
  onDelete,
  accept,
  label = 'Upload File',
  helperText,
  preview = true,
  type = 'image', // Default to image type
}: FileUploadProps) {
  const theme = useTheme();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [internalPreviewUrl, setInternalPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Effect to manage preview URL: if value is a server path, construct full URL
  useEffect(() => {
    if (value) {
      if (value.startsWith('blob:')) {
        setInternalPreviewUrl(value); // Still a local blob, use directly
      } else if (value.startsWith('/uploads/')) {
        setInternalPreviewUrl(`${baseUrl}${value}`); // Path from server
      } else {
        setInternalPreviewUrl(value); // Assume it's a full URL or data URL already
      }
    } else {
      setInternalPreviewUrl(null);
    }
  }, [value]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${baseUrl}${apiPath}/upload?uploadType=${type}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total ?? 100)
          );
          setProgress(percentCompleted);
        },
      });

      const { filePath } = response.data; // Get the server-generated file path
      setInternalPreviewUrl(`${baseUrl}${filePath}`); // Update preview for the new server path
      onChange(filePath, file); // Pass the server path and original file to parent

    } catch (err) {
      console.error('Error uploading file:', err);
      let errorMessage = 'Failed to upload file. Please try again.';
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
      setProgress(0);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = () => {
    // If value is a server path, we might want to call an API to delete the file on server too.
    // For now, just clears it on the client.
    setInternalPreviewUrl(null);
    setError(null);
    if (onDelete) {
      onDelete(); 
    }
    // Also clear the input field so the same file can be re-selected if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    // Set the file to the input and trigger the onChange handler
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
      const event = new Event('change', { bubbles: true });
      fileInputRef.current.dispatchEvent(event);
      
      // Need to manually call the handler as the synthetic event won't trigger it
      handleFileSelect({ target: { files: dataTransfer.files } } as any);
    }
  };

  return (
    <Fade in={true} timeout={500}>
      <Box>
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2,
              animation: 'shake 0.5s',
              '@keyframes shake': {
                '0%, 100%': { transform: 'translateX(0)' },
                '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
                '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
              }
            }}
          >
            {error}
          </Alert>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept={accept}
          style={{ display: 'none' }}
          aria-label={label}
        />

        {!internalPreviewUrl ? (
          <Box
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            sx={{
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
          >
            <Paper
              elevation={0}
              onClick={handleClick}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                border: `2px dashed ${isDragOver ? theme.palette.primary.main : theme.palette.divider}`,
                borderRadius: 2,
                backgroundColor: isDragOver ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
                height: type === 'image' ? 180 : 120,
                transition: 'all 0.3s ease',
                transform: isDragOver ? 'scale(1.02)' : 'scale(1)',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                }
              }}
            >
              <CloudUploadIcon 
                color="primary" 
                sx={{ 
                  fontSize: 40, 
                  mb: 1,
                  transition: 'all 0.3s ease',
                  animation: isDragOver ? 'pulse 1.5s infinite' : 'none',
                  '@keyframes pulse': {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)' },
                  }
                }} 
              />
              <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                {label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {isDragOver ? 'Drop file here' : 'Click or drag & drop'}
              </Typography>
              {helperText && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  {helperText}
                </Typography>
              )}
            </Paper>
          </Box>
        ) : (
          <Fade in={true} timeout={400}>
            <Box>
              {preview && type === 'image' && internalPreviewUrl && (
                <Card 
                  sx={{ 
                    maxWidth: 200, 
                    mb: 1,
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    borderRadius: 2,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={internalPreviewUrl} // Use internalPreviewUrl for display
                    alt="Preview"
                    sx={{ 
                      objectFit: 'cover',
                      transition: 'all 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/200x140/e2e8f0/64748b?text=Preview+Error';
                      target.onerror = null;
                    }}
                  />
                </Card>
              )}
              {preview && type === 'document' && internalPreviewUrl && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    background: alpha(theme.palette.background.paper, 0.8),
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      borderRadius: 1,
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <DescriptionIcon color="primary" />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }} noWrap>
                      {internalPreviewUrl.startsWith('blob:') ? value?.split('#t=')[0].split('/').pop() : internalPreviewUrl.split('/').pop()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date().toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Copy Link" TransitionComponent={Zoom} arrow>
                      <IconButton 
                        size="small" 
                        onClick={() => {
                          navigator.clipboard.writeText(internalPreviewUrl ?? '');
                        }}
                        sx={{
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            color: theme.palette.primary.main,
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          }
                        }}
                      >
                        <FileCopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" TransitionComponent={Zoom} arrow>
                      <IconButton 
                        size="small" 
                        onClick={handleDelete}
                        sx={{
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            color: theme.palette.error.main,
                            backgroundColor: alpha(theme.palette.error.main, 0.1),
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              )}
              {helperText && (
                <Typography variant="caption" color="text.secondary">
                  {helperText}
                </Typography>
              )}
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={handleDelete} 
                  startIcon={<DeleteIcon />} 
                  color="error"
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.error.main, 0.1),
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Remove
                </Button>
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={handleClick} 
                  startIcon={<CloudUploadIcon />} 
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Replace
                </Button>
              </Box>
            </Box>
          </Fade>
        )}

        {uploading && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <Box sx={{ position: 'relative', height: 20, borderRadius: 1, overflow: 'hidden' }}>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{
                  height: '100%',
                  borderRadius: 1,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography 
                  variant="caption" 
                  component="div" 
                  color="text.secondary"
                  sx={{ 
                    fontWeight: 'medium',
                    mixBlendMode: 'difference',
                    color: progress > 50 ? 'white' : 'inherit'
                  }}
                >
                  {progress === 100 ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CheckCircleIcon fontSize="small" sx={{ color: theme.palette.success.main }} />
                      Complete!
                    </Box>
                  ) : (
                    `Uploading... ${progress}%`
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Fade>
  );
} 