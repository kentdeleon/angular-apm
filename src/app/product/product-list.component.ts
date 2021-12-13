import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    // selector: "pm-products",
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy{

  
    pageTitle : string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = "";
    productServiceSubscription!: Subscription;
    private _listFilter: string = "";


    get listFilter(): string {
      return this._listFilter;
    }

    set listFilter(value : string) {
      console.log("set " + value);
      this._listFilter = value;
      this.filteredProducts = this.performFilter(value);
    }

    filteredProducts : IProduct[] = [];
    products : IProduct[] = [];

    constructor(private productService: ProductService) {

    }

    toggleImage() : void {
        this.showImage = !this.showImage; //!NOT operator
    }

    ngOnInit(): void {
        console.log("ngOnInit")
        this.productServiceSubscription = 
        this.productService.getProducts()
        .subscribe({
        next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
        error: err => this.errorMessage = err});
    }

    ngOnDestroy(): void {
      console.log("ngOnDestroy")
      this.productServiceSubscription.unsubscribe();
    }

    performFilter(filterBy: string) : IProduct[] {
      filterBy = filterBy.toLowerCase();
      return this.products.filter((product: IProduct) => 
      product.productName.toLowerCase().includes(filterBy));
    }

    onRatingClicked(message: string) : void {
      this.pageTitle = "Product List " + message;
    }
     
}