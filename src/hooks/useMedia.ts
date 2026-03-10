import { useQuery } from "@tanstack/react-query";
import { fetchPublicMedia, MediaItem } from "@/lib/api";

export const useMedia = (section?: string, limit = 10) =>
  useQuery({
    queryKey: ["public-media", section ?? "all", limit],
    queryFn: () => fetchPublicMedia({ section, limit }),
  });

export const useMediaImage = (section: string, fallbackUrl: string) => {
  const query = useMedia(section, 1);
  const url = query.data?.[0]?.image_url ?? fallbackUrl;
  return { ...query, url, image: query.data?.[0] ?? null } as typeof query & {
    url: string;
    image: MediaItem | null;
  };
};
