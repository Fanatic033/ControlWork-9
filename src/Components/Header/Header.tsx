import {NavLink} from 'react-router-dom';
import Modal from '../Modal /Modal.tsx';
import {useState} from 'react';
import TransactionForm from '../TransactionForm/TransactionForm.tsx';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div>
            <NavLink className="navbar-brand" to="/">Finance Tracker</NavLink>
          </div>
          <div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/category">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="" onClick={openModal}>Add transaction</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Modal title="Add New Transaction" show={showModal} onClose={closeModal}>
        <TransactionForm onClose={closeModal}></TransactionForm>
      </Modal>
    </>
  );
};

export default Header;