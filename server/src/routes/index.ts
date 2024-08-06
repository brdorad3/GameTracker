import { Router } from "express"
import { review_post } from "../controllers"

const router = Router()

router.post("/review", review_post)

export default router