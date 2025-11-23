const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAutherized = token === "xyz";
  if (!isAutherized) {
    res.status(401).send("invalid admin user ");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  const isAutherized = token === "xyz";
  if (!isAutherized) {
    res.status(401).send("invalid user ");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
