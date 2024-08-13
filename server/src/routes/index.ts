import { Router } from "express"
import { review_post, reviews_post, rev_del_post } from "../controllers"


const router = Router()

router.post("/review", review_post)
router.post("/reviews", reviews_post)
router.post("/review-delete", rev_del_post)


export default router