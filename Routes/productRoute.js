import express from 'express';
import { authenticate,authorize } from '../Middlewares/auth.js';
import multer from "multer"
const storage=multer.diskStorage({});
const upload=multer({storage})
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductQuantity,
  deleteProduct
} from '../Controllers/productController.js';

const router = express.Router();

router.post('/',authenticate,authorize("admin"),upload.single("image"), createProduct);
router.get('/',authenticate, getAllProducts);
router.get('/:id',authenticate, getProductById);
router.put('/:id',authenticate,authorize("admin"), updateProductQuantity);
router.delete('/:id',authenticate,authorize("admin"), deleteProduct);

export default router;
