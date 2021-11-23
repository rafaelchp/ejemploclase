import {getRepository} from "typeorm";
import { Request, Response} from "express";
import {Product} from "../entity/Product";
import { validate } from 'class-validator';


export class ProductController {

    static getProducts= async (req: Request, res: Response) =>{
        const productRepository= getRepository(Product);

        try {
            const products= await productRepository.find({select:['nombre', 'precio']});

            if(products.length>0){
                res.send(products);
            } else {
                res.status(200).json({message:'Not result'});
            }
        } catch (error) {
            res.status(404).json({message:'Somenthing goes wrong!'});
        }
    };

    static newProduct= async (req: Request, res: Response)=>{
        const productRepository= getRepository(Product);
        const {nombre, precio}= req.body;

        const product= new Product();
        product.nombre=nombre;
        product.precio=precio;
        const validationOpt={validationError:{target:false, value:false}};
        const  error= await validate(product, validationOpt);

        if(error.length>0){
            return res.status(400).json(error);
        }

        try {
            await productRepository.save(product);
            return res.status(200).json({message:'Product created successfully'});
        } catch (error) {
            return res.status(409).json({message: 'Error in code!'});
        }

    };


    static deleteProduct= async (req: Request, res: Response)=>{
        const {id}= req.params;
        const productRepository= getRepository(Product);
        let product: Product;

        try {
            product = await productRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(404).json({message:'Product not found'});
        }

        productRepository.remove(product);
        res.status(201).json({mesaage: 'Product deleted'});
    };

    static editProduct= async (req: Request, res: Response)=>{
        let product: Product;
        const {id}= req.params;
        const {nombre, precio}= req.body;

        const productRepository= getRepository(Product);

        try {
            product= await productRepository.findOneOrFail(id);
            product.nombre=nombre;
            product.precio=precio;


        } catch (error) {
            return res.status(404).json({message:' Product not found'});
        }

        try {
            await productRepository.save(product);
        } catch (error) {
            return res.status(409).json({message: 'Error to update!'});
        }
        res.status(201).json({message:'Product update'});
    };


}