exports.DATABASE_URL = process.env.DATABASE_URL || 
    global.DATABASE_URL || 'mongodb://localhost/james-bond-api'; 
exports.PORT = process.env.PORT || 8080; 
exports.JWT_SECRET = process.env.JWT_SECRET 
exports.JWT_EXPIRY = '7d';

// module.exports = { JWT_SECRET }


 