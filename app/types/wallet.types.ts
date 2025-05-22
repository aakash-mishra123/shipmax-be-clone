export enum WalletStatus {
  ACTIVE = 'A',
  DISABLED = 'D'
}

export enum TransactionType {
  CREDIT = 'C',
  DEBIT = 'D'
}

export interface WalletTransaction {
  amount: number;
  type: TransactionType;
  description?: string;
}

export interface WalletValidation {
  isValidAmount(amount: number): boolean;
  isValidCompanyId(companyId: number): boolean;
  generateTransactionId(): string;
}

export class WalletValidator implements WalletValidation {
  public isValidAmount(amount: number): boolean {
    return !isNaN(amount) && amount > 0;
  }

  public isValidCompanyId(companyId: number): boolean {
    return !isNaN(companyId) && companyId > 0;
  }

  public generateTransactionId(): string {
    return `TXN-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}