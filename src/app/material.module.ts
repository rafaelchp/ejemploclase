import { NgModule } from "@angular/core";
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from "@angular/common";


const myModule=[
    MatCardModule
];


@NgModule({
    imports: [
        CommonModule,
        myModule
    ],

    exports: [
        myModule
        ]
})
 export class MaterialModule {}