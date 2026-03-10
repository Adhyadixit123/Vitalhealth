const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

type UploadResult = {
  url: string;
  publicId: string;
};

export const uploadImage = async (file: File): Promise<UploadResult> => {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary configuration is missing. Please set VITE_CLOUDINARY_* env vars.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || !data.secure_url) {
    const message = data?.error?.message || "Image upload failed";
    throw new Error(message);
  }

  return {
    url: data.secure_url as string,
    publicId: data.public_id as string,
  };
};
