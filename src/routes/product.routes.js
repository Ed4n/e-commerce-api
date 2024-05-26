import { Router } from 'express'
import { findAll, findByCategory } from '../controllers/product.controller.js'

const router = Router()

router.get("/", findAll)
router.get("/categories", findByCategory)

export default router;