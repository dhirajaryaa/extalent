import AsyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import generateAccessAndRefreshToken from "../../utils/generateToken.js";
import userModal from "../../model/user.model.js";
import { cookiesOptions,frontendUrl } from "../../config/env.js";

const googleAuth = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Google Authentication failed");
  }
  // extract user data
  const {
    id,
    _json: { name, picture, email, email_verified },
  } = req?.user;

  // email verified or not check
  if (!email_verified) {
    throw new ApiError(401, "Google Authentication failed");
  }

  // check user exist
  let user = await userModal.findOne({ googleId: id });
  if (!user) {
    // create new user
    user = await userModal.create({
      name,
      email,
      avatar: picture,
      googleId: id,
    });
  }
  // generate access and refresh token
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(user);
  if (!accessToken && !refreshToken) {
    throw new ApiError(500, "something went wrong!");
  }
  // remove sensitive info from user object
  const userInfo = await userModal
    .findById(user._id)
    .select("-googleId -refreshToken");
  // return res
  return res
    .status(200)
    .cookie("accessToken", accessToken, cookiesOptions)
    .cookie("refreshToken", refreshToken, cookiesOptions)
    .redirect(`${frontendUrl}/dashboard`);
});

export default googleAuth;