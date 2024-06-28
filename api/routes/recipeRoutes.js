const express = require("express");
const {
  getAllRecipes,
  getRecipe,
  deleteRecipe,
  createRecipe,
} = require("../contorllers/recipeControllers");

// Router  > server.js dışında route yapmamıza olanak sağlar
const router = express.Router();

// oluşturduğumuz ruter'ın endpoint/route/yol'llarını ve istek gelince fonksiyonlarını belirler
router.route("/api/recipes").get(getAllRecipes).post(createRecipe);

router.route("/api/recipes/:id").get(getRecipe).delete(deleteRecipe);

// serverda kullanmak için routerları export et
module.exports = router;
