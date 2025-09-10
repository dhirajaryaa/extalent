import AsyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import userModal from "../model/user.model.js";

const getCurrentUser = AsyncHandler(async (req, res) => {
  const user = await userModal.findById(req.user?._id);
  return res.status(200).json(new ApiResponse(200, "user Profile.", user));
});

export default getCurrentUser;