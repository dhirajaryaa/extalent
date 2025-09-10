import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import generateAccessAndRefreshToken from "../../utils/generateToken.js";
import { accessTokenSecret, cookiesOptions } from "../../config/env.js";
import jwt from "jsonwebtoken";

const tokenRefresh = AsyncHandler(async (req, res) => {
  const incomingToken =
    req.cookies.accessToken || req.headers.authorization.replace("Bearer ", "");
  if (!incomingToken) {
    throw new ApiError(401, "Invalid Token! Please Login First.");
  }

  const decoded = jwt.verify(incomingToken, accessTokenSecret);
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    decoded
  );
  return res
    .status(200)
    .cookie("accessToken", accessToken, cookiesOptions)
    .cookie("refreshToken", refreshToken, cookiesOptions)
    .json(
      new ApiResponse(200, "user fresh token successful", {
        accessToken,
      })
    );
});

export default tokenRefresh;