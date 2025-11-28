import {Router} from 'express'
import CategoryController from '../controllers/controller.category'
import { authentication} from '../middleware/auth'
import { adminOnly } from '../middleware/adminOnly'

const router = Router ()


router.post ('/categories', authentication, adminOnly, CategoryController.createCategory)


export default router