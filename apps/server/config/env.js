const _config = Object.freeze({
  port: process.env.PORT,
  mongoUrl: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV,
});

const { port, mongoUrl, nodeEnv } = _config;

export { port, mongoUrl, nodeEnv };
