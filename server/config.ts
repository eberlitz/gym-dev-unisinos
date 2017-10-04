export const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'YABADABADOO',
  GOOGLE: {
    SECRET: process.env.GOOGLE_SECRET
  },
  FACEBOOK: {
    SECRET: process.env.FACEBOOK_SECRET
  },
  DATABASE: process.env.DATABASE || 'mongodb://localhost:27017/gym',
  PORT: process.env.PORT || 8000  
};
