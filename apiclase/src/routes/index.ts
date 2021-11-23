import { Router } from "express";
import user from './user.routes';
import product from './product.routes';

const routes= Router();

routes.use('/users', user);
routes.use('/products', product);


export default routes;