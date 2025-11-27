import {Router} from 'express'
import ProductController from '../controllers/controller.product'
import { authentication } from '../middleware/auth'


const router = Router()
router.use(authentication)

router.post('/products', authentication, ProductController.createProduct)



export default router