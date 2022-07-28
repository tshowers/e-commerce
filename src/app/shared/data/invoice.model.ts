export interface Invoice  {
  catalog_id: string;
  contact_id: string;
  order_id: string;
  store_id: string;
  status: string;
  date: string;
  ship_date: string;
  shipper: string;
  shipper_tracking_number: string;
  shipping_cost: number;
  shipping_tax: number;
  paid: boolean;
  address: any;
  notes : string;
  updated_at: number;
  updated_by: string;
  created_by: string;
  created_at: number;
  browser_ip?: string;

  uid: string;
  _id: string;  
}
