import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authorization_header = req.headers.authorization;
  if (!authorization_header) {
    return res.status(400).send({ msg: "Authorization header is missing" });
  }
  const token = authorization_header.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (decoded) {
      const id = decoded.id;
      req.id = id;
      next();
    } else {
      return res.status(400).send({ msg: "Login first" });
    }
  });
};
