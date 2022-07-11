import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = {
    id: '',
    sku: '',
    name: '',
    description: '',
    unitPrice: 0,
    imageUrl: '',
    active: false,
    unitsInStock: 0,
    dateCreated: new Date(),
    lastUpdated: new Date()
  };

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    const theProductId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(theProductId).subscribe(data => {
      this.product = data;
    });
  }

}
