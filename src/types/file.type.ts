export interface IFile {
  _id: string;
  file_name: string;
  stored_file_name: string;
  file_path: string;
  mime_type: string;
  file_size: number;
  file_extension: string;
  project_id: string;
  uploaded_by: string;
  uploaded_by_name: string;
  storage_type: 's3' | 'gridfs';
  bucket_name?: string;
  storage_url?: string;
  is_public: boolean;
  access_level: 'owner' | 'investor' | 'public';
  is_validated: boolean;
  validation_status: 'pending' | 'valid' | 'invalid';
  uploaded_at: string;
  deleted_at?: string;
  expires_at?: string;
  is_deleted: boolean;
  version: number;
  previous_version_id?: string;
  formatted_size?: string;
  download_url?: string;
  expires_in?: number;
}

export interface FileUploadResponse {
  status: string;
  data: {
    file: IFile;
  };
  message: string;
}

export interface FilesListResponse {
  status: string;
  results: number;
  data: {
    files: IFile[];
  };
}
export type TFileAccessLevel = 'owner' | 'investor' | 'public';
