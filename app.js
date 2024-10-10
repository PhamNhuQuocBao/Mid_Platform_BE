// code example
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productModel = require("./src/model/product.model");
const userModel = require("./src/model/user.model");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.get("/product", async (req, res) => {
  try {
    const productRes = await productModel.find();

    res.status(200).json(productRes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const productRes = await productModel.findById(req.params.id);

    res.status(200).json(productRes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/product", async (req, res) => {
  try {
    const productRes = await productModel.create(req.body);

    res.status(201).json(productRes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/product/:id", async (req, res) => {
  try {
    const productRes = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(productRes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/product/:id", async (req, res) => {
  try {
    const productRes = await productModel.findByIdAndDelete(req.params.id);

    res.status(200).json(productRes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/register", async (req, res) => {
  try {
    const userRes = await userModel.create(req.body);

    res.status(201).json(userRes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const userRes = await userModel.findOne({ username: req.body.username });

    if (!userRes) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (userRes && userRes.password !== req.body.password) {
      res.status(401).json({ message: "Wrong password" });
      return;
    }

    res.status(200).json(userRes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://phamnhuquocbao:yQv4WWJHQ8b9vBmH@rnmiddleexam.62sgy.mongodb.net/Todo?retryWrites=true&w=majority&appName=RNMiddleExam"
  )
  .then(() => {
    console.log("Database connected successfully");

    app.listen(6789, "0.0.0.0", () => {
      console.log("Server is running on port 6789");
    });
  })
  .catch((err) => console.log("Database connected failed"));
