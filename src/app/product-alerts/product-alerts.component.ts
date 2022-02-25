import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { Product } from '../products';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.css']
})

export class ProductAlertsComponent extends ProductListComponent {
  @Input() product: Product | undefined;
  @Output() notify = new EventEmitter();
}