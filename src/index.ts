import express from 'express';
import routes from './route/index'

const app = express();

// Add middleware to parse JSON requests
app.use(express.json());

// Add middleware to parse URL-encoded requests (optional)
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes); // Assuming your routes are defined and imported here

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
