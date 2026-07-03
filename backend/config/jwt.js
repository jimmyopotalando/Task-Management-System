export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'supersecretkey', // fallback if env not set
  expiresIn: '7d' // token validity period
};
