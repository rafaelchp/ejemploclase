import {getRepository} from "typeorm";
import { Request, Response} from "express";
import {User} from "../entity/User";
import { validate } from 'class-validator';
import { Product } from "../entity/Product";

export class UserController {

    

    static getUser= async (req: Request, res: Response)=>{
        const userRepository = getRepository(User);


        try {
            const users= await userRepository.find({select:['firstName','lastName','telefono','products']});

            if(users){
                res.send(users);
            } else {
                res.status(200).json({message:'Not result'});
            }
        } catch (error) {
            res.status(404).json({message:'Somenthing goes wrong!'});
        }
    };


    static newUser= async (req: Request, res: Response)=>{
        const userRepository = getRepository(User);
        const {firstName, lastName, telefono, producto}= req.body;
        const productRepository= getRepository(Product);

        const product= await productRepository.findOneOrFail({
            where:{
                nombre:producto
            }
        })

        const user= new User();
        user.firstName= firstName;
        user.lastName= lastName;
        user.telefono= telefono;
        user.products=[product];
        
        
        const validationOpt={validationError:{target:false, value:false}};
        const  error= await validate(user, validationOpt);

        if(error.length>0){
            return res.status(400).json(error);
        }

        try {
            await userRepository.save(user);
            return res.status(200).json({message:'User created successfully'});
        } catch (error) {
            return res.status(409).json({message: 'Error in code!'});
        }

    };
    

    static editUser= async (req: Request, res: Response)=>{
        let user: User;
        const {id}= req.params;
        const {firstName, lastName, telefono}= req.body;

        const userRepository= getRepository(User);

        try {
            user= await userRepository.findOneOrFail(id);
            user.firstName=firstName;
            user.lastName=lastName;
            user.telefono=telefono;
        } catch (error) {
            return res.status(404).json({message:' User not found'});
        }

        try {
            await userRepository.save(user);
        } catch (error) {
            return res.status(409).json({message: 'Error to update!'});
        }
        res.status(201).json({message:'User update'});
    };

    static deleteUser= async (req: Request, res: Response)=>{
        const {id}= req.params;
        const userRepository= getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(404).json({message:'User not found'});
        }

        userRepository.remove(user);
        res.status(201).json({mesaage: 'User deleted'});
    };

}

export default UserController;