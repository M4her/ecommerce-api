const { Router } = require("express");
const { authMiddleware, roleCheck } = require("../middlewares/authMiddleware");
const { createProduct } = require("../controllers/productController");
const route = Router();

route.post(
  "/create",
  authMiddleware, roleCheck(["admin", "moderator"]),
  createProduct,
);

module.exports = route;