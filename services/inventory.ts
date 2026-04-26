import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface InventoryItem {
  item_id: number;
  item_name: string;
  category: string;
  quantity: number;
  price: number;
  supplier_name: string;
  stock_status: string;
  featured_item: number;   // 0 或 1
  special_note?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl = 'https://prog2005.it.scu.edu.au/ArtGalley';

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.baseUrl);
  }

  getItemByName(name: string): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.baseUrl}/${encodeURIComponent(name)}`);
  }

  addItem(item: InventoryItem): Observable<any> {
    return this.http.post(this.baseUrl, item);
  }

  updateItem(name: string, item: InventoryItem): Observable<any> {
    return this.http.put(`${this.baseUrl}/${encodeURIComponent(name)}`, item);
  }

  deleteItem(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${encodeURIComponent(name)}`);
  }
}