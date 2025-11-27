import {Router} from 'express'
import ProductController from '../controllers/controller.product'
import { authentication } from '../middleware/auth'


const router = Router()
router.use(authentication)

router.post('/products', authentication, ProductController.createProduct)
router.get('/products', authentication, ProductController.getAllProducts)
router.get('/products/:id', authentication, ProductController.getProductById)



export default router