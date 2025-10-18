import jwt from "jsonwebtoken";

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.body.docId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);

    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.json({
        success: false,
        message: "Invalid doctor token. Please login again.",
      });
    } else if (error.name === "TokenExpiredError") {
      return res.json({
        success: false,
        message: "Doctor token expired. Please login again.",
      });
    }

    res.json({
      success: false,
      message: "Doctor authentication failed. Please login again.",
    });
  }
};

export default authDoctor;
