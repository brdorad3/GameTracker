import { Router } from "express"
import { review_post, reviews_post } from "../controllers"


const router = Router()

router.post("/review", review_post)
router.post("/reviews", reviews_post)

export default router