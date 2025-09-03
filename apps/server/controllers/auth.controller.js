import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import generateAccessAndRefreshToken from "../utils/generateToken.js";
import userModal from "../model/user.model.js";
import { accessTokenSecret, cookiesOptions } from "../config/env.js";
import jwt from "jsonwebtoken";

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
    .json(
      new ApiResponse(200, "user login successful", {
        user: userInfo,
        accessToken,
      })
    );
});

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

const getUserProfile = AsyncHandler(async (req, res) => {
  const user = await userModal.findById(req.user?._id);
  return res.status(200).json(new ApiResponse(200, "user Profile.", user));
});

const refreshToken = AsyncHandler(async (req, res) => {
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

export { googleAuth, userLogout, getUserProfile, refreshToken };
