import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private getBalanceValues(
    totalBalance: Balance,
    incomingTransaction: Transaction,
  ): Balance {
    // let balanceReturned: Balance = { income: 0, outcome: 0, total: 0 };
    if (incomingTransaction.type === 'income') {
      console.log(incomingTransaction.type);
      totalBalance.income += incomingTransaction.value;
    } else if (incomingTransaction.type === 'outcome') {
      totalBalance.outcome += incomingTransaction.value;
    }

    totalBalance.total = totalBalance.income - totalBalance.outcome;
    return totalBalance;
  }

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    let finalBalance: Balance = { income: 0, outcome: 0, total: 0 };
    console.log('criou o finalbalance');
    console.log('vetor de transactions: ', this.transactions);

    for (let i = 0; i <= this.transactions.length - 1; i++) {
      console.log('transaction: ', this.transactions[i]);
      finalBalance = this.getBalanceValues(finalBalance, this.transactions[i]);
    }
    return finalBalance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
