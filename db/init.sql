-- Create database if not exists
CREATE DATABASE IF NOT EXISTS shipmaxx_db;
USE shipmaxx_db;

-- Create wallet transactions table
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  company_id INT NOT NULL,
  transaction_id VARCHAR(255),
  transaction_amount VARCHAR(50),
  timestamp VARCHAR(50),
  status CHAR(1) DEFAULT 'A',
  description TEXT,
  vendor_check INT DEFAULT 0
);

-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  company_id INT NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_company_id ON wallet_transactions(company_id);
CREATE INDEX idx_transaction_id ON wallet_transactions(transaction_id);
CREATE INDEX idx_timestamp ON wallet_transactions(timestamp);