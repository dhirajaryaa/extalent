const _config = Object.freeze({
  port: process.env.PORT,
  mongoUrl: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL
});

const { port, mongoUrl, nodeEnv, googleClientId, googleClientSecret,googleCallbackUrl } = _config;

export { port, mongoUrl, nodeEnv, googleClientId, googleClientSecret,googleCallbackUrl };
