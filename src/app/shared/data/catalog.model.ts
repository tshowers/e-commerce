
export interface Catalog  {
  name: string;
  description: string;
  files : string;
  url: string;
  store_id: string;
  updated_at: number;
  updated_by: string;
  created_by: string;
  created_at: number;
  browser_ip?: string;

  uid: string;
  _id: string;  
}
