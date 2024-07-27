import React, { useState } from 'react';
import { Transaction } from '../../types.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks.ts';
import { editTransaction, postTransaction } from '../../Redux/TransactionThunks.ts';
import { selectCategory } from '../../Redux/CategorySlice.ts';
import Modal from './Modal.tsx';

interface TransactionModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ transaction, onClose }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategory);
  const [amount, setAmount] = useState(transaction ? transaction.amount : 0);
  const [categoryID, setCategoryID] = useState(transaction ? transaction.categoryID : '');
  const [type, setType] = useState(transaction ? transaction.type : 'income');

  const filteredCategories = categories.filter(cat => cat.type === type);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newTransaction = { amount, categoryID, type, createdAt: transaction ? transaction.createdAt : new Date().toISOString() };
    if (transaction) {
      await dispatch(editTransaction({ ...transaction, ...newTransaction }));
    } else {
      await dispatch(postTransaction(newTransaction));
    }
    onClose();
  };

  return (
    <Modal show={true} title={transaction ? 'Edit Transaction' : 'Add Transaction'} onClose={onClose}>
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
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {filteredCategories.map(cat => (
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
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default TransactionModal;
