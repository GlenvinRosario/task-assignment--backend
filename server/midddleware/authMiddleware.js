// const jwt = require("jsonwebtoken");

// exports.authenticate = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) return res.status(401).json({ error: "Unauthorized" });

//   jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(401).json({ error: "Invalid token" });
//     req.userId = decoded.userId;
//     next();
//   });
// };

const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach userId to the request
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

