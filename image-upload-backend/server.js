const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;
const { v4: uuidv4 } = require("uuid");
const { log } = require("console");

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

// Function to read products from JSON file
const readProductsFromFile = () => {
  try {
    const data = fs.readFileSync("products.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    return []; // Return an empty array if file doesn't exist
  }
};

// Function to write products to JSON file
const writeProductsToFile = (products) => {
  fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
};

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
  const id = uuidv4();

  // Read existing products from the JSON file
  let products = readProductsFromFile();

  // Store the new product data
  const newProduct = { id, name, count, caption, moreInfo, imagePath };
  products.push(newProduct);

  // Write updated products back to the JSON file
  writeProductsToFile(products);

  console.log("Received product data:", newProduct);

  // Send a response back to the client
  res
    .status(201)
    .json({ message: "Product data received successfully", data: newProduct });
});

// New GET route to retrieve all products
app.get("/products", (req, res) => {
  const products = readProductsFromFile(); // Read products from the JSON file
  res.json(products); // Return the array of products
});

// New GET route to retrieve a single product by ID
app.get("/products/:id", (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  const products = readProductsFromFile(); // Read products from the JSON file
  const product = products.find((prod) => prod.id === id);

  if (product) {
    res.json(product); // Return the found product
  } else {
    res.status(404).json({ message: "Product not found" }); // Return a 404 if not found
  }
});

// Route to get the image
app.get("/images/:filename", (req, res) => {
  //   const filePath = path.join(__dirname, "uploads", req.params.filename);
  //   res.sendFile(filePath);

  // Set the content type based on the file extension
  res.type(path.extname(filePath));

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("File not found:", err);
      res.status(404).send("File not found");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
