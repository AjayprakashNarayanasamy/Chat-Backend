require('dotenv').config();

const requiredEnvVariables = ['DATABASE_URL', 'JWT_SECRET'];


for (const envVariable of requiredEnvVariables) {
  if (!process.env[envVariable]) {
    throw new Error('Environment Variable not present');
  }
}

module.exports = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET,
};
