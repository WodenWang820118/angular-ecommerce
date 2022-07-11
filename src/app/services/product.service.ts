import { ProductCategory } from './../common/product-category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';
  
  constructor(private httpClient: HttpClient) { }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.product)
    );
  }

  getProductList(currentCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${currentCategoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProduct(productId: number): Observable<Product> {
    // get the JSON format object out of box from Spring Boot REST API
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    // the searchUrl is set and provided by Spring Boot
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl);
  }
}

// unwrap the response to get the list of products
interface GetResponseProducts {
  _embedded: {
    product: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}