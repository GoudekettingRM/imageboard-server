const { Router } = require("express");
const Image = require("./model");

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const allImages = await Image.findAll();
    if (allImages.length > 0) {
      res.json(allImages).end();
    } else {
      res
        .status(404)
        .send("No images found")
        .end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
