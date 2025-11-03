const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database initialization
const db = require('./models');

// Routes
const employeeRoutes = require('./routes/employeeRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

app.use('/api/employees', employeeRoutes);
app.use('/api/enquiries', enquiryRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'CRM API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Initialize database and start server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to database:', err);
});

module.exports = app;
