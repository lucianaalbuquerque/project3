const jwt = require("express-jwt");
 
// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: 'payload', 
  getToken: getTokenFromHeaders
});

// Check if the token is available on the request Headers AND RETURN TOKEN
function getTokenFromHeaders (req) { 
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    const token = req.headers.authorization.split(" ")[1];
    return token;
  } 
  return null;
}
 
module.exports = {isAuthenticated}