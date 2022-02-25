README Angular Tutorial
=======================

Applications are built in Angular by creating and using components.

A component consists of three parts :
1/ a component class ;
2/ an HTML template to help display the component ;
3/ a component-specific style file.

The superclass of all components is <app-root>, which is placed in
the file index.html of the application :

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Angular Getting Started</title>
    <base href="/" />

    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    </head>
    <body>
     	<app-root></app-root>
    </body>
</html>

A structural directive is the equivalent of a class in Angular. There are many
built-in directives, which take the form ng*, for example :
NgIf, NgForOf, NgSwitch.

We include Angular structural directives by inserting the appropriate imports at 
the head of the directive class for example :
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

To create a new structural directive "newStrDir", the following command is executed 
on the command line :
ng generate directive newStrDir.

A structure directive can be embedded directly into HTML commands. In the following,
a <div> is created for each product in products(.ts) using a for loop :

<div *ngFor="let product of products">

  <h3>
      {{ product.name }}
  </h3>

</div>

Certain properties can be directly displayed using Angular's interpolation syntax, as
in the example above for the product name (product.name).

The value of the property can be inserted into the title of the component using the 
property-binding syntax. In the following title, the product name prefixes the text 
'details'

    <a [title]="product.name + ' details'">
      {{ product.name }}
    </a>

A condition can be expressed by an if ngIf directive. In the following, a <p> element
is created and displyed only if a description property exists : 

  <p *ngIf="product.description">
    Description: {{ product.description }}
  </p>


1/ Structural directives
------------------------

ngFor :

<h2>Products</h2>

<div *ngFor="let product of products">
</div>


2/ Angular's interpolation syntax
---------------------------------

<h2>Products</h2>

<div *ngFor="let product of products">

  <h3>
      {{ product.name }}
  </h3>

</div>


3/ Property binding + lien <a></a>
----------------------------------

<h2>Products</h2>

<div *ngFor="let product of products">

  <h3>
    <a [title]="product.name + ' details'">
      {{ product.name }}
    </a>
  </h3>

</div>


4/ <p> element + *ngIf directive
--------------------------------

<h2>Products</h2>

<div *ngFor="let product of products">

  <h3>
    <a [title]="product.name + ' details'">
      {{ product.name }}
    </a>
  </h3>

  <p *ngIf="product.description">
    Description: {{ product.description }}
  </p>

</div>


5/ Event binding + sharing + button
-----------------------------------

<h2>Products</h2>

<div *ngFor="let product of products">

  <h3>
    <a [title]="product.name + ' details'">
      {{ product.name }}
    </a>
  </h3>

  <p *ngIf="product.description">
    Description: {{ product.description }}
  </p>

  <button type="button" (click)="share()">
    Share
  </button>

</div>


6/ New component => pass date to a new child component
------------------------------------------------------
Créer un nouveau Terminal (+), puis -> créer un nouveau component
> ng generate component product-alerts
=> The generator creates starter files for the three parts of the component:
product-alerts.component.ts
product-alerts.component.html
product-alerts.component.css
=>
src/app/product-alerts/product-alerts.component.ts
content_copy
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.css']
})
export class ProductAlertsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

The ProductAlertsComponent needs to emit an event when the user clicks Notify Me and 
the ProductListComponent needs to respond to the event.

In new components, the Angular Generator includes an empty constructor(), the OnInit 
interface, and the ngOnInit() method. Since these steps don't use them, the following 
code examples omit them for brevity.

==========

product-list.component.html :

<h2>Products</h2>

<div *ngFor="let product of products">

  <h3>
    <a [title]="product.name + ' details'">
      {{ product.name }}
    </a>
  </h3>

  <p *ngIf="product.description">
    Description: {{ product.description }}
  </p>

  <button type="button" (click)="share()">
    Share
  </button>
  
  <app-product-alerts
    [product]="product">
  </app-product-alerts>

</div>

==========

product-list.component.ts :

import { Component } from '@angular/core';
import { products } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent {

  products = products;

  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}

==========

product-alert.component.html :

<p *ngIf="product && product.price > 700">
    <button type="button">Notify Me</button>
</p>

<p *ngIf="product && product.price > 700"> </p>

<button type="button" (click)="share()">
    Share
  </button>
  
<app-product-alerts
    [product]="product" 
    (notify)="onNotify()">
</app-product-alerts>

==========

product-alert.component.ts :

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

==========
==========
==========
