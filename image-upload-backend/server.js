const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// In-memory array to store products
let products = [];

// Route to upload image
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Route to handle posting product data
app.post("/products", (req, res) => {
  const { name, count, caption, moreInfo, imagePath } = req.body;

  // Store the new product data in the array
  products.push({ name, count, caption, moreInfo, imagePath });
  console.log("Received product data:", {
    name,
    count,
    caption,
    moreInfo,
    imagePath,
  });

  // Send a response back to the client
  res
    .status(201)
    .json({ message: "Product data received successfully", data: req.body });
});

// New GET route to retrieve all products
app.get("/products", (req, res) => {
  res.json(products); // Return the array of products
});

// Route to get the image
app.get("/images/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  res.sendFile(filePath);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
