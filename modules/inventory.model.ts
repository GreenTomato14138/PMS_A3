// app/modules/inventory.model.ts
export interface InventoryItem {
  item_id?: number;          // auto-increment, from server
  item_name: string;         // required, unique
  category: Category;
  quantity: number;          // integer, required
  price: number;             // integer, required
  supplier_name: string;     // required
  stock_status: StockStatus;
  featured_item: number;     // 0 or 1, default 0
  special_note?: string;     // optional
}

export type Category = 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';

export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';