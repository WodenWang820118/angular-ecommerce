import { CartService } from './../../services/cart.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  previousCategoryId: number = 1;
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  // pagination
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  // pagination with keyword
  previousKeyword: string = '';

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  hasCategory(): boolean {
    return this.route.snapshot.paramMap.has('id');
  }

  getCategoryId(): number {
    return this.hasCategory() ? Number(this.route.snapshot.paramMap.get('id')) : 1;
  }

  processResult() {
    return (
      data: {
        _embedded: {
          product: Product[];
        },
        page: {
          number: number;
          size: number;
          totalElements: number;
        }
      }) => {
      this.products = data._embedded.product;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  handleListProducts() {
    // reset page to 1 with a different category
    if (this.previousCategoryId !== this.getCategoryId()) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.getCategoryId();

    this.productService
      .getProductListPaginate(this.pageNumber - 1, this.pageSize, this.getCategoryId())
      .subscribe(this.processResult());
  }

  handleSearchProducts() {
    const keyword = this.route.snapshot.paramMap.get('keyword') as string;

    if (this.previousKeyword !== keyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = keyword;

    this.productService
      .searchProductsPaginate(this.pageNumber - 1, this.pageSize, keyword)
      .subscribe(this.processResult());
  }

  updatePageSize(pageSize: string) {
    this.pageSize = Number(pageSize);
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  computeCartTotalPrice() {
    return this.cartService.computeCartTotalPrice();
  }
}
