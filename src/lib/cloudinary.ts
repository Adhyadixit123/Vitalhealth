const CLOUD_NAME = "dvtdzotx2";
const UPLOAD_PRESET = "ml_default"; // unsigned preset provided by client

type UploadResult = {
  url: string;
  publicId: string;
};

export const uploadImage = async (file: File): Promise<UploadResult> => {
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
