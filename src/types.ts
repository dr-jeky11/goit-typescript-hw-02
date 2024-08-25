export interface Response {
  page: number;
  total_pages: number;
  results: Image[];
}

export interface Image {
  id: string;
  created_at: string;
  description: string;
  urls: Record<string, string>;
  links: Record<string, string>;
  likes: number;
  tags: Tag[];
  user: { name: string | null; location: string | null };
  alt_description: string;
}

type Tag = {
  title: string;
};

export type ModalData = Image | null;
