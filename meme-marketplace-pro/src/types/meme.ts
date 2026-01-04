export type MemeApi = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
};

export type Meme = MemeApi & {
  rating: number; 
  category: string; 
};
