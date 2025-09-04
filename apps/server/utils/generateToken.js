import jwt from "jsonwebtoken";
import userModal from "../model/user.model.js";
import {
  accessTokenExpiresIn,
  accessTokenSecret,
  refreshTokenExpiresIn,
  refreshTokenSecret,
} from "../config/env.js";

const generateAccessAndRefreshToken = async (user) => {
  const accessToken = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    accessTokenSecret,
    {
      expiresIn: accessTokenExpiresIn,
    }
  );
  const refreshToken = jwt.sign({ _id: user._id }, refreshTokenSecret, {
    expiresIn: refreshTokenExpiresIn,
  });
  //   save on db
  if (refreshToken) {
    await userModal.findByIdAndUpdate(user._id, {
      refreshToken: refreshToken,
    });
  }

  return { accessToken, refreshToken };
};
export default generateAccessAndRefreshToken;
