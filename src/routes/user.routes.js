import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";

const router = Router();

router.route("/register").post(
  // upload multer s arha hai
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route(".login", loginUser);

// secure routes
// token s he pta chlta login ho ya nhi isilye auth middleware add kia tha 
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
