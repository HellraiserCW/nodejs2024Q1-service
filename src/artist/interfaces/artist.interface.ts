export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export type CreateTrack = Omit<Artist, 'id'>;
