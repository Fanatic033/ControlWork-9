import React, { useState, useEffect } from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks.ts';
import {selectCategory} from '../../Redux/CategorySlice.ts';
import {fetchTransactions, postTransaction} from '../../Redux/TransactionThunks.ts';
import {Transaction} from '../../types.ts';


interface TransactionFormProps {
  onClose: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategory);
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState<number | ''>('');

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (amount === '' || category === '') return;
    const newTransaction: Omit<Transaction, 'id'> = {
      type,
      categoryID: category,
      amount: Number(amount),
      createdAt: new Date().toISOString(),
    };
    await dispatch(postTransaction(newTransaction));
    dispatch(fetchTransactions());
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">Type</label>
        <select
          id="type"
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value as 'income' | 'expense')}
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select
          id="category"
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.filter(cat => cat.type === type).map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">Amount (KGS)</label>
        <input
          type="number"
          id="amount"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default TransactionForm;
