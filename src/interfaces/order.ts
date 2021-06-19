import { OrderItem } from "./order_item";

export interface Order {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  total: number;
  order_items: OrderItem[];
}
