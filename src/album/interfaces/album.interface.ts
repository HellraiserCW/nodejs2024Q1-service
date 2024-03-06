export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export type CreateAlbum = Omit<Album, 'id'>;
