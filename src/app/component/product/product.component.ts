import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductI } from 'src/app/shared/models/productmodel';
import { Router } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public product!:ProductI;
  private subscription: Subscription= new Subscription();
  productForm=this.fb.group({
    nombre:['', Validators.required],
    precio:['', Validators.required]
  })

  constructor(private fb:FormBuilder, private productSvc: ProductService, private router:Router) { }

  ngOnInit(): void {
  }

  onProduc():void{
    if(this.productForm.invalid){
      return;
    }


    const formValue= this.productForm.value;
    this.subscription.add(
      this.productSvc.saveProduct(formValue).subscribe((res)=>{
        if(res){
          console.log('res->',res);

         // this.router.navigate(['/users']);
        }
      })
    )

  };

}
