import Transaction from '../models/Transaction';

interface Balance {
  // Entrada de dinheiro
  income: number;
  // Saída de dinheiro
  outcome: number;
  // Total
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  /**
   * Essa rota deve retornar uma listagem com todas as
   * transações que você cadastrou até agora, junto com
   * o valor de soma de entradas, retiradas e total de crédito.
   *
   * [] Listagem de todas as transações
   * [] Cálculo de Gastos
   * [] Cálculo de Ganhos
   * [] Cálculo total
   */
  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;
          default:
            break;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
