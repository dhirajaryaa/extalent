import jwt from "jsonwebtoken";
import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { accessTokenSecret } from "../config/env.js";

const authMiddleware = AsyncHandler(async (req, res, next) => {
  const incomingToken =
    req.cookies.accessToken || req.headers.authorization.replace("Bearer ","");
  if (!incomingToken) {
    throw new ApiError(401, "Unauthorized Access");
  }

  const decoded = jwt.verify(incomingToken, accessTokenSecret);
  if (decoded.exp < Date.now() / 1000) {
    throw new ApiError(401, "Unauthorized Access! Token Expired");
  }
  req.user = decoded;
  next();
});
export default authMiddleware;
