// app/services/services.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { InventoryItem } from '../modules/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl = 'https://prog2005.it.scu.edu.au/ArtGalley';
  private refreshSubject = new BehaviorSubject<void>(undefined);
  refresh$ = this.refreshSubject.asObservable();

  constructor(private http: HttpClient) {}

  triggerRefresh(): void {
    this.refreshSubject.next();
  }

  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  // 修复：支持返回数组或单个对象
  getItemByName(name: string): Observable<InventoryItem | null> {
    const encodedName = encodeURIComponent(name);
    return this.http.get<InventoryItem | InventoryItem[]>(`${this.baseUrl}/${encodedName}`).pipe(
      map(response => {
        if (Array.isArray(response)) {
          // 如果返回的是数组，取第一个元素（如果有）
          return response.length > 0 ? response[0] : null;
        }
        return response; // 单个对象
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of(null);   // 未找到
        }
        return throwError(() => new Error(error.error?.message || 'Server error'));
      })
    );
  }

  createItem(item: Omit<InventoryItem, 'item_id'>): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.baseUrl, item).pipe(
      catchError(this.handleError)
    );
  }

  updateItem(originalName: string, item: InventoryItem): Observable<any> {
    const encodedName = encodeURIComponent(originalName);
    return this.http.put(`${this.baseUrl}/${encodedName}`, item).pipe(
      catchError(this.handleError)
    );
  }

  deleteItem(name: string): Observable<any> {
    const encodedName = encodeURIComponent(name);
    return this.http.delete(`${this.baseUrl}/${encodedName}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error?.message || error.message || `Server error: ${error.status}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}