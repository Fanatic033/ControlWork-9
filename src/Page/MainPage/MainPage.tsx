import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks.ts';
import {selectTransactions} from '../../Redux/TransactionSlice.ts';
import {selectLoading} from '../../Redux/CategorySlice.ts';
import {Transaction} from '../../types.ts';
import {deleteTransaction, fetchTransactions} from '../../Redux/TransactionThunks.ts';
import TransactionModal from '../../Components/Modal /TransactionModal.tsx';
import {fetchCategories} from '../../Redux/CategoryThunks.ts';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const isLoading = useAppSelector(selectLoading);
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);


  const closeModal = () => {
    setShowModal(false);
    setEditingTransaction(null);
  };

  const onEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const onDelete = async (transactionID: string) => {
    await dispatch(deleteTransaction(transactionID));
    dispatch(fetchTransactions());
    navigate('/')
  };

  const total = transactions.reduce((acc, transaction) => {
    return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
  }, 0);

  return (
    <div className="container">
      <nav className="d-flex justify-content-between align-items-center mt-3 mb-5">
      </nav>
      <h2 className={'mb-5'}>Total: {total} KGS</h2>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <ul className="list-group">
          {transactions.map(transaction => {
            return(
            <li key={transaction.id} className="list-group-item d-flex justify-content-between align-items-center mb-4">
              <div>
                <span>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
                <span className="ms-3">{transaction.id}</span>
                <span className={`ms-3 ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}>
                  {transaction.type === 'income' ? '+' : '-'}{transaction.amount} KGS
                </span>
              </div>
              <div>
                <button onClick={() => onEdit(transaction)} className="btn btn-warning me-2">Edit</button>
                <button onClick={() => onDelete(transaction.id)} className="btn btn-danger">Delete</button>
              </div>
            </li>
          )})}
        </ul>
      )}
      {showModal && <TransactionModal transaction={editingTransaction} onClose={closeModal} />}
    </div>
  );
};

export default MainPage;
