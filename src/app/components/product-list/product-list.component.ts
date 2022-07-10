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
  currentCategoryId: number = 1;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {
      this.productService.getProductList(this.getCategoryId()).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  hasCategory(): boolean {
    return this.route.snapshot.paramMap.has('id');
  }

  getCategoryId(): number {
    return this.hasCategory() ? Number(this.route.snapshot.paramMap.get('id')) : 1;
  }

}
