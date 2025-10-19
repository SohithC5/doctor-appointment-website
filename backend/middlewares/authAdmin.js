import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    next();
  } catch (error) {
    console.log(error);

    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.json({
        success: false,
        message: "Invalid admin token. Please login again.",
      });
    } else if (error.name === "TokenExpiredError") {
      return res.json({
        success: false,
        message: "Admin token expired. Please login again.",
      });
    }

    res.json({
      success: false,
      message: "Admin authentication failed. Please login again.",
    });
  }
};

export default authAdmin;
