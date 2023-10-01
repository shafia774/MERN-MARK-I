const Product = require('./Product'); // Make sure to provide the correct path to your Product model

async function findProductsInRange(req, res) {
  try {
    const coordinates = req.query.coordinate.split(',').map(parseFloat);

    // Fetch all products from the database
    const allProducts = await Product.find({});

    // Filter products that are within range of the given coordinates
    const productsInRange = [];

    for (const product of allProducts) {
      const distance = calculateDistance(coordinates, product.coordinates.coordinates);
      if (distance <= product.range) {
        productsInRange.push(product);
      }
    }

    res.json(productsInRange);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Example function to calculate distance between two coordinates
function calculateDistance(coord1, coord2) {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  // Implement your own distance calculation logic here (e.g., Haversine formula)
  // Return the distance in the desired unit (e.g., kilometers)
}

// Example usage with Express.js
const express = require('express');
const app = express();

app.get('/productsInRange', findProductsInRange);

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
