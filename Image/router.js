const { Router } = require("express");
const Image = require("./model");

const router = new Router();

router.post("/", async (req, res, next) => {
  try {
    const { url, title } = req.body;
    if (!url) {
      res
        .status(400)
        .send("You should provide a url for the image.")
        .end();
    }
    const newImage = await Image.create({ url, title });
    res.json(newImage).end();
  } catch (error) {
    next(error);
  }
});

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
