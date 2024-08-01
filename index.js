const express = require('express'); 
const router = require('./routs');
const app = express();
const PORT =  3000; 

// Middleware to parse JSON bodies
app.use(express.json());

app.use(['/todos', '/todo'], router);
// Fetch all to-do items

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
