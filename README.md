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


Structural directives
---------------------

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


Interpolation syntax
--------------------

Certain properties can be directly displayed using Angular's interpolation syntax, as
in the example above for the product name (product.name).

The value of the property can be inserted into the title of the component using the 
property-binding syntax. In the following title, the product name prefixes the text 
'details'

    <a [title]="product.name + ' details'">
      {{ product.name }}
    </a>


Conditions
----------

A condition can be expressed by an if ngIf directive. In the following, a <p> element
is created and displyed only if a description property exists : 

  <p *ngIf="product.description">
    Description: {{ product.description }}
  </p>


Associate a URL path with a component
-------------------------------------

To define the URL path of a component, indicate the path in the file
app.module.ts
For example, a component that describes a product in our example can be found by 
adding the line
      { path: 'products/:productId', component: ProductDetailsComponent },
to app.module.ts and using the [routerLink] directive in the HTML file of the component
  <h3>
    <a 
      [title]="product.name + ' details'"
      [routerLink]="['/products', product.id]">
      {{ product.name }}
    </a>
  </h3>
The path has a fixed part "/products" and a variable part "product.id", which varies with
the product ID.


Accessing component properties : an "Angular router"
----------------------------------------------------

Information about a given component at a given path name can be accessed using the
directive "Angular Router", by inserting the following import in the *.ts file :
import { ActivatedRoute } from '@angular/router';

To extract a given property of a component, its so-called current "route parameters" are
retrieved in the method ngOnInit() using route.snapshot, as in the example below :

export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  	// First get the product id from the current route.
  	const routeParams = this.route.snapshot.paramMap;
  	const productIdFromRoute = Number(routeParams.get('productId'));

  	// Find the product that correspond with the id provided in route.
  	this.product = products.find(product => product.id === productIdFromRoute);
}

}

In the file product-details.component.html of the structural directive 
ProductDetailsComponent, a condition ngIf can be used to present given properties 
if present :

<h2>Product Details</h2>

<div *ngIf="product">
  <h3>{{ product.name }}</h3>
  <h4>{{ product.price | currency }}</h4>
  <p>{{ product.description }}</p>
</div>

In addition, the pipe operator | is used to transform the property price here into a string
called "currency".


Implementing a new service -  Angular's dependency injection system
-------------------------------------------------------------------

A new structural directive can be inserted into another via Angular's dependency 
injection system. 

Firstly, an instance of a new structural directive is created. Consider the example 
of displaying a shopping cart :
ng generate service cart

An interface "Product" is imported into the *.ts file of this new service to handle 
the product data :
import { Product } from './products';

The product data are then stored in an array Product
export class CartService {
  items: Product[] = [];
...
}

To add items to and get or clear items from a shopping cart, new methods are added 
directly to the structural directive : 

export class CartService {
  items: Product[] = [];

  constructor() { }

  addToCart(product: Product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}

The structural directive of "CartService" can then be "injected" into the constructor
of another structural directive "ProductDetailsComponent" :

export class ProductDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }
}

The cart is then displayed by adding the method

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

which calls the method addToCart() of the new structural directive.

To add a button "Buy" to each product, the line
  <button type="button" (click)="addToCart(product)">Buy</button>
is added to the HTML of the
