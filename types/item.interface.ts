export interface Match {
  [key: string]: string[];
}
export interface Item {
  id: string;
  score: number;
  terms: string[];
  match: Match;
  brand_name: string;
  phone_name: string;
  image_url: string;
  brand_id: number;
}