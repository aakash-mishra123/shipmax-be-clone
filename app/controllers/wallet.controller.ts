import { Request, Response } from 'express';
import { Wallet, WalletAttributes } from '../models/wallet.model';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { WalletValidator, WalletTransaction, TransactionType } from '../types/wallet.types';

export class WalletController {
  private validator: WalletValidator;

  constructor() {
    this.validator = new WalletValidator();
  }

  // Recharge wallet
  public async rechargeWallet(req: Request, res: Response) {
    try {
      const { company_id, amount, description } = req.body;

      if (!company_id || !amount) {
        return res.status(400).json({
          success: false,
          message: 'Company ID and amount are required'
        });
      }

      // Validate company_id format
      const companyId = parseInt(company_id);
      if (isNaN(companyId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid company ID format'
        });
      }

      const transaction: WalletTransaction = {
        amount: parseFloat(amount),
        type: TransactionType.CREDIT,
        description
      };

      if (!this.validator.isValidAmount(transaction.amount)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid amount'
        });
      }

      // Fix the wallet creation with proper typing
      const walletData: WalletAttributes = {
        id: companyId,
        company_id: companyId,
        transaction_amount: transaction.amount.toFixed(2),
        description: transaction.description || '',
        timestamp: new Date().toISOString(),
        status: 'A',
        order_id: parseInt(Date.now().toString().slice(-8)),
        transaction_id: `TXN-${uuidv4().slice(0,8)}`,
        vendor_check: 0
      };

      const wallet = await Wallet.create(walletData);

      return res.status(200).json({
        success: true,
        data: wallet
      });
    } catch (error: unknown) {
      console.error('Error recharging wallet:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unknown error occurred while recharging wallet';
        
      return res.status(500).json({
        success: false,
        message: errorMessage
      });
    }
  }

  // Get transaction history with search and filters
  public async getTransactionHistory(req: Request, res: Response) {
    try {
      const { 
        company_id,
        startDate,
        endDate,
        status,
        search
      } = req.query;

      const whereClause: any = {};

      if (company_id) {
        whereClause.company_id = company_id;
      }

      if (startDate && endDate) {
        whereClause.timestamp = {
          [Op.between]: [startDate, endDate]
        };
      }

      if (status) {
        whereClause.status = status;
      }

      if (search) {
        whereClause[Op.or] = [
          { transaction_id: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } }
        ];
      }

      const transactions = await Wallet.findAll({
        where: whereClause,
        order: [['timestamp', 'DESC']]
      });

      return res.status(200).json({
        success: true,
        data: transactions
      });
    } catch (error: unknown) {
      console.error('Error retrieving transaction history:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unknown error occurred while retrieving transaction history';
        
      return res.status(500).json({
        success: false,
        message: errorMessage
      });
    }
  }

  // Get wallet balance
  public async getWalletBalance(req: Request, res: Response) {
    try {
      const { company_id } = req.params;

      if (!company_id) {
        return res.status(400).json({
          success: false,
          message: 'Company ID is required'
        });
      }

      const transactions = await Wallet.findAll({
        where: { company_id, status: 'A' }
      });

      const balance = transactions.reduce((acc, curr) => {
        return acc + parseFloat(curr.transaction_amount);
      }, 0);

      return res.status(200).json({
        success: true,
        balance
      });
    } catch (error: unknown) {
      console.error('Error retrieving wallet balance:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unknown error occurred while retrieving wallet balance';
        
      return res.status(500).json({
        success: false,
        message: errorMessage
      });
    }
  }
}
