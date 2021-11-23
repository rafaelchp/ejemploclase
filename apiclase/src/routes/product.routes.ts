import { Router } from "express";
import { ProductController } from "../controller/ProductController";

const router= Router();

router.get('/', ProductController.getProducts);
router.post('/', ProductController.newProduct);
router.patch('/:id', ProductController.editProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;