'use client';
import { Box, Dialog } from '@mui/material';
import { getImageSrc } from '@/lib';
import type { IFile } from '@/types';

interface ImagePreviewModalProps {
  open: boolean;
  onClose: () => void;
  file: IFile | null;
}

export function ImagePreviewModal({
  open,
  onClose,
  file,
}: ImagePreviewModalProps) {
  const src = file ? getImageSrc(file) : null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'transparent',
          boxShadow: 'none',
          maxHeight: '90vh',
        },
      }}
      slotProps={{
        backdrop: {
          sx: { bgcolor: 'rgba(0, 0, 0, 0.8)' },
        },
      }}
    >
      {src && file && (
        <Box
          component="img"
          src={src}
          alt={file.file_name}
          sx={{
            maxWidth: '100%',
            maxHeight: '90vh',
            objectFit: 'contain',
          }}
        />
      )}
    </Dialog>
  );
}

export default ImagePreviewModal;
