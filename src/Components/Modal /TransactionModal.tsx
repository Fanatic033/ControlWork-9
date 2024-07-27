import React, {useState} from 'react';
import {Transaction} from '../../types.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks.ts';
import {editTransaction, postTransaction} from '../../Redux/TransactionThunks.ts';
import {selectCategory} from '../../Redux/CategorySlice.ts';

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
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <label>Category</label>
        <select value={categoryID} onChange={(e) => setCategoryID(e.target.value)}>
          {filteredCategories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <label>Amount</label>
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default TransactionModal;
