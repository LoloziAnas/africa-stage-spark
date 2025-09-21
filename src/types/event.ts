export type DbEvent = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  start_date: string | null; // ISO string
  end_date: string | null;   // ISO string
  creator_id: string | null;
  cover_image_url: string | null;
  video_url: string | null;
  status: 'draft' | 'published' | 'cancelled' | null;
  category: string | null;
  max_attendees: number | null;
  is_free: boolean | null;
  updated_at: string | null;
};

export type UiEvent = {
  id: string;
  title: string;
  creator: string; // if profiles join is added later
  date: string; // formatted
  location: string;
  attendees: number;
  likes: number;
  videoThumbnail: string; // cover image fallback
  price: number;
};
