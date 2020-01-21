import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-admin-products',
	templateUrl: './admin-products.component.html',
	styleUrls: [ './admin-products.component.css' ]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
	products: { title: string }[];
	filteredProducts: any[];
	subscription: Subscription;

	constructor(private productService: ProductService) {
		// this.products$ = this.productService.getAll().snapshotChanges().map((changes) => {
		// 	return changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }));
		this.subscription = this.productService
			.getAll()
			.valueChanges()
			.subscribe((products) => (this.filteredProducts = this.products = products));
		// .valueChanges((products) => (this.products = products));
		// });
	}

	filter(query: string) {
		this.filteredProducts = query
			? this.products.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
			: this.products;
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	ngOnInit() {}
}
