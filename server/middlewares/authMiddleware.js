// we get token in req.body
// hence, now we have to match this token -> with the middleware token -> then only access has to be given, otherwise not.


const JWT = require('jsonwebtoken')        // here -> will decrypt the JWT token. in loginUser we encrypted it, here it decrypts.

module.exports = async (req, res, next) => {
  try {
     // Check if Authorization header exists
    if (!req.headers["authorization"]) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing",
        error: error.message
      });
    }


    // get token.  wkt, token exists in headers, hence this is the way of extracting it from headers.
    const token = req.headers["authorization"].split(" ")[1];

    // validation
    if (!token) {
      return res.status(401).send({ success: false, message: "No token provided" });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized user",
          err: err.message
        });
      } else {
        // decoded value 
        // req.body.id = decode.id;                       // at time of login, we are storing id: user._id (userId as id)
        // next();                                       // run next, or ot will run in loop and no output will be shown.
      
        req.body = {
          ...req.body,
          id: decode.id
        }
        next();
      }
    });                                               // verify is a function from JWT, takes the token from headers and .env and matches it. Also returns a callback for (err, decode) -> error & decode 
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Auth API",
      error: error.message
    });
  }
};