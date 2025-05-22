// filepath: c:\Users\Tech\Desktop\projects\shipmax-clone-be\server.ts
import express from 'express';
import dotenv from 'dotenv';
import { sequelize, testConnection } from './config/database';
import walletRoutes from './app/routes/wallet.routes';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/wallet', walletRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Initialize database and start server
const initializeServer = async () => {
  // Test database connection
  const isConnected = await testConnection();
  
  if (isConnected) {
    // Sync database models
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } else {
    console.error('Failed to connect to database. Server not started.');
    process.exit(1);
  }
};

initializeServer().catch(err => {
  console.error('Server initialization failed:', err);
  process.exit(1);
});