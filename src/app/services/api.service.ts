import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'assets/db.json';

  private categorieSubject = new BehaviorSubject<any[]>([]);
  private productsSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}`).pipe(
      map((data: any) => {
        this.categorieSubject.next(data.categories);
        return data.categories;
      })
    );
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}`).pipe(
      map((data: any) => {
        this.productsSubject.next(data.products);
        return data.products;
      })
    );
  }

  getProductsByCategory(name: string): Observable<any> {
    return this.http
      .get(`${this.baseUrl}`)
      .pipe(
        map((data: any) =>
          data.products.filter((product: any) => product.category === name)
        )
      );
  }
  getCategoriesObservable(): Observable<any[]> {
    return this.categorieSubject.asObservable();
  }

  getProductsObservable(): Observable<any[]> {
    return this.productsSubject.asObservable();
  }
  updateProducts(products: any[]): void {
    this.productsSubject.next(products);
  }
}
