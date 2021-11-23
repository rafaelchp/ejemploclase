import {Entity, ObjectIdColumn, ObjectID, Column, OneToMany, JoinColumn} from "typeorm";
import { Product } from "./Product";

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    telefono: number;


    @OneToMany(()=> Product, product=>product.user)
    @JoinColumn()
    products:Product[];

}
