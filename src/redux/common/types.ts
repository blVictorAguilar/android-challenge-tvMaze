export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  image: {
    original?: string;
    medium?: string;
  };
  summary: string;
  schedule?: {
    time?: string;
    days?: string[];
  };
}

export type SearchShowShape = {
  score: number;
  show: Show;
};
