// test-env.js
require('dotenv').config();

console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'LOADED' : 'NOT FOUND');
console.log('JWT_REFRESH_SECRET:', process.env.JWT_REFRESH_SECRET ? 'LOADED' : 'NOT FOUND');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'LOADED' : 'NOT FOUND');

// Print all environment variables yang dimulai dengan JWT
Object.keys(process.env)
  .filter(key => key.startsWith('JWT'))
  .forEach(key => {
    console.log(`${key}: ${process.env[key] ? '[HIDDEN]' : 'UNDEFINED'}`);
  });