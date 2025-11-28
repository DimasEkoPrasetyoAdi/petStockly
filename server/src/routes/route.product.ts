import {Router} from 'express'
import ProductController from '../controllers/controller.product'
import { authentication } from '../middleware/auth'
import { adminOrStaff } from '../middleware/adminOrStaff' 

const router = Router()
router.use(authentication)


router.post('/products', authentication, ProductController.createProduct)
router.get('/products', authentication, ProductController.getAllProducts)
router.get('/products/:id', authentication, ProductController.getProductById)
router.put('/products/:id', authentication, adminOrStaff, ProductController.updateProduct)
router.delete('/products/:id', authentication, adminOrStaff, ProductController.deleteProduct)


export default router