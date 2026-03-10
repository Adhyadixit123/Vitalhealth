import React, { useState, useRef } from 'react';
import { Button } from './button';
import { Progress } from './progress';
import { uploadImage } from '@/lib/cloudinary';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string | undefined) => void;
  onUploadComplete?: (result: { url: string; publicId?: string }) => void;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onUploadComplete,
  className = "",
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10MB');
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const result = await uploadImage(file);
      onChange(result.url);
      onUploadComplete?.(result);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange(undefined);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Uploaded image"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
            disabled={uploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Click to upload an image</p>
          <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      )}

      {uploading && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Uploading...</p>
          <Progress value={progress} className="w-full" />
        </div>
      )}

      {!value && !uploading && (
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          Select Image
        </Button>
      )}
    </div>
  );
};
