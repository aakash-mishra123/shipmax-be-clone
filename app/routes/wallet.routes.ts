import { Router } from 'express';
import { WalletController } from '../controllers/wallet.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const walletController = new WalletController();

// Recharge wallet
router.post('/recharge', authMiddleware, walletController.rechargeWallet);

// Get transaction history
router.get('/transactions', authMiddleware, walletController.getTransactionHistory);

// Get wallet balance 
router.get('/balance/:company_id', authMiddleware, walletController.getWalletBalance);

export default router;
