'use client';
import { Delete } from '@mui/icons-material';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImagePreviewModal } from '@/components/features/modal';
import { getImageSrc, isImageFile } from '@/lib';
import { deleteFile } from '@/lib/api/files/filesClient';
import { TRANSLATIONS } from '@/locales';
import { useAlert } from '@/providers';
import type { IFile } from '@/types';
import { ActionButtons } from './image-grid.styled';

interface ImageGridProps {
  files?: IFile[];
}

export function ImageGrid({ files }: ImageGridProps) {
  const router = useRouter();

  const { showAlert } = useAlert();
  const { t } = useTranslation();
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<IFile | null>(null);

  const handleDelete = async (fileId: string) => {
    setDeletingFileId(fileId);
    try {
      await deleteFile(fileId);
      router.refresh();
    } catch {
      showAlert({
        message: t(TRANSLATIONS.ERROR_DELETE_FILE),
        severity: 'error',
      });
    } finally {
      setDeletingFileId(null);
    }
  };

  const imageFiles = files?.filter(isImageFile) ?? [];

  return (
    <div>
      {imageFiles.map((file) => {
        const src = getImageSrc(file);
        return (
          <Box key={file._id} sx={{ display: 'inline-block', m: 1 }}>
            {src ? (
              <Box
                component="button"
                onClick={() => setPreviewFile(file)}
                sx={{
                  p: 0,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'block',
                  bgcolor: 'transparent',
                }}
              >
                <Image
                  src={src}
                  alt={file.file_name}
                  width={200}
                  height={200}
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </Box>
            ) : (
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  bgcolor: 'action.hover',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {file.file_name}
              </Box>
            )}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <ActionButtons
                disabled={deletingFileId === file._id}
                startIcon={<Delete />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(file._id);
                }}
              />
            </Box>
          </Box>
        );
      })}
      <ImagePreviewModal
        open={!!previewFile}
        onClose={() => setPreviewFile(null)}
        file={previewFile}
      />
    </div>
  );
}

export default ImageGrid;
