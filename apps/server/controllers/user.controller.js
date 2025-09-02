import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import userModal from "../model/user.model.js";

const userProfile = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(400, "UnAuthorized Access! Please Login First.");
    }
  const user = await userModal
    .findById(req.user?._id)
    .select("-googleId -refreshToken");
  return res.status(200).json(new ApiResponse(200, "user Profile.", user));
});

export { userProfile };
