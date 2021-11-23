import {Entity, ObjectIdColumn, ObjectID, Column, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class Product {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    nombre: string;

    @Column()
    precio: number;

    @ManyToOne(()=> User, user=> user.products,{
        cascade:true,
       
    })
    user: User;


}
