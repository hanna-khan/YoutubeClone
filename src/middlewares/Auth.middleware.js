import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      // agr user mobile s bhjrha ho
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-refreshToken -password"
    );

    if (!user) {
      throw new ApiError(403, "Invalid Access Token");
    }

    req.user = user;
    // next added bacuase route m 2 middleware hain is k bd wo dosre middleware p jayeg jo logout user hai
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
