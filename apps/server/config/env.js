const _config = Object.freeze({
  port: process.env.PORT,
  mongoUrl: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
});

const {
  port,
  mongoUrl,
  nodeEnv,
  googleClientId,
  googleClientSecret,
  googleCallbackUrl,
  accessTokenExpiresIn,
  accessTokenSecret,
  refreshTokenExpiresIn,
  refreshTokenSecret,
  cloudinaryApiKey,
  cloudinaryApiSecret,
  cloudinaryCloudName
} = _config;

export {
  port,
  mongoUrl,
  nodeEnv,
  googleClientId,
  googleClientSecret,
  googleCallbackUrl,
  accessTokenExpiresIn,
  accessTokenSecret,
  refreshTokenExpiresIn,
  refreshTokenSecret,
  cloudinaryApiKey,
  cloudinaryApiSecret,
  cloudinaryCloudName
};

// cookies options
export const cookiesOptions = Object.freeze({
  httpOnly: true,
  secure: nodeEnv === "production" ? true : false,
});
