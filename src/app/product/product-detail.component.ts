import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = "Product Detail";
  product: IProduct | undefined;
  // = 
  //   {
  //     "productId": 1,
  //     "productName": "Leaf Rake",
  //     "productCode": "GDN-0011",
  //     "releaseDate": "March 19, 2021",
  //     "description": "Leaf rake with 48-inch wooden handle.",
  //     "price": 19.95,
  //     "starRating": 3.2,
  //     "imageUrl": "assets/images/leaf_rake.png"
  //   };

    productServiceSubscription!: Subscription;
    products : IProduct[] = [];
    errorMessage: string = "";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
  
    const id = Number(this.route.snapshot.paramMap.get("id"));
    // this.pageTitle += ` : ${id}`;
    console.log("product-details onInit");
    this.productServiceSubscription = 
    this.productService.getProducts()
    .subscribe({

      next: products => {
        this.products = products;
        this.performFilter(id);
      }
    });
  }

  onBack(): void {
    this.router.navigate(["/products"]);
  }

  performFilter(filterBy: number) : void {
    console.log("perform filter")
    filterBy = Number(filterBy);
 
   this.product = this.products.find(product => product.productId === filterBy);

   ;
  }
}
