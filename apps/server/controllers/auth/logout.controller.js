import ApiResponse from "../utils/apiResponse.js";
import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import userModal from "../model/user.model.js";
import {
  cookiesOptions,
} from "../config/env.js";

const userLogout = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(400, "UnAuthorized Access! Please Login First.");
  }
  // clear refresh token from db
  await userModal.findByIdAndUpdate(req.user._id, {
    refreshToken: "",
  });

  return res
    .status(200)
    .clearCookie("accessToken", "", cookiesOptions)
    .clearCookie("refreshToken", "", cookiesOptions)
    .json(new ApiResponse(200, "user logout successful", null));
});

export default userLogout;
