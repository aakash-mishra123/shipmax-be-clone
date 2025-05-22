import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/database';
import { WalletStatus } from '../types/wallet.types';

export interface WalletAttributes {
  id: number;
  order_id: number;
  company_id: number; 
  transaction_id: string;
  transaction_amount: string;
  timestamp: string;
  status: 'A' | 'D'; // Active/Disabled
  description: string;
  vendor_check: number;
}

export class Wallet extends Model<WalletAttributes> implements WalletAttributes {
  public id!: number;
  public order_id!: number;
  public company_id!: number;
  public transaction_id!: string;
  public transaction_amount!: string;
  public timestamp!: string;
  public status!: 'A' | 'D';
  public description!: string;
  public vendor_check!: number;

  static validateTransaction(amount: number): boolean {
    return !isNaN(amount) && amount > 0;
  }
}

Wallet.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  company_id: {
    type: DataTypes.INTEGER, 
    allowNull: false
  },
  transaction_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  transaction_amount: {
    type: DataTypes.STRING,
    allowNull: true
  },
  timestamp: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.CHAR(1),
    allowNull: true,
    defaultValue: WalletStatus.ACTIVE,
    validate: {
      isIn: [['A', 'D']]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  vendor_check: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, 
{
  sequelize,
  tableName: 'cscart_wk_losung360_wallet_recharge',
  timestamps: false
}
);
