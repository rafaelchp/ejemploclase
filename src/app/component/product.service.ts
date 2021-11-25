import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ProductI } from '../shared/models/productmodel';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private router: Router) { }


  saveProduct(producto: ProductI):Observable<ProductI|void>{

    return this.http
    .post<ProductI>(`${environment.API_URL}/products`, producto)
    .pipe(map((product:ProductI)=>{
      console.log('Producto->', producto)

      return product;
    }));
  }

  viewProduct():Observable<ProductI|void>{
    return this.http
          .get<ProductI>(`${environment.API_URL}/products`)
      
  }


  // viewIdProduct(id:string):Observable<ProductI|void>{
  //   return this.http
  //         .get<ProductI>(`${environment.API_URL}/products/${id}`)
      
  // }
}
