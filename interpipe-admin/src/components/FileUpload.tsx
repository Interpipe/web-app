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
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Description as DescriptionIcon,
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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [internalPreviewUrl, setInternalPreviewUrl] = useState<string | null>(null);

  // Effect to manage preview URL: if value is a server path, construct full URL
  useEffect(() => {
    if (value) {
      if (value.startsWith('blob:')) {
        setInternalPreviewUrl(value); // Still a local blob, use directly
      } else if (value.startsWith('/uploads/')) {
        setInternalPreviewUrl(`${API_URL}${value}`); // Path from server
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
      const response = await axios.post(`${API_URL}/api/upload?uploadType=${type}`, formData, {
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
      setInternalPreviewUrl(`${API_URL}${filePath}`); // Update preview for the new server path
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

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
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
        <Button
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          onClick={handleClick}
          disabled={uploading}
          fullWidth
        >
          {label}
        </Button>
      ) : (
        <Box>
          {preview && type === 'image' && internalPreviewUrl && (
            <Card sx={{ maxWidth: 200, mb: 1 }}>
              <CardMedia
                component="img"
                height="140"
                image={internalPreviewUrl} // Use internalPreviewUrl for display
                alt="Preview"
                sx={{ objectFit: 'cover' }}
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
                p: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            >
              <DescriptionIcon color="primary" />
              <Typography variant="body2" sx={{ flex: 1 }} noWrap>
                { /* Display filename from URL if possible, or a generic name */}
                {internalPreviewUrl.startsWith('blob:') ? value?.split('#t=')[0].split('/').pop() : internalPreviewUrl.split('/').pop() }
              </Typography>
              <IconButton size="small" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          {helperText && (
            <Typography variant="caption" color="text.secondary">
              {helperText}
            </Typography>
          )}
           <Button 
            variant="outlined" 
            size="small" 
            onClick={handleDelete} 
            startIcon={<DeleteIcon />} 
            sx={{mt: 1}}
          >
            Remove
          </Button>
        </Box>
      )}

      {uploading && (
        <Box sx={{ width: '100%', mt: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="caption" align="center" display="block">
            Uploading... {progress}%
          </Typography>
        </Box>
      )}
    </Box>
  );
} 