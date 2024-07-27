import Modal from '../../Components/Header/Modal.tsx';
import {useEffect, useState} from 'react';
import CategoryForm from '../../Components/CategoryForm/CategoryForm.tsx';
import {useAppSelector} from '../../hooks/redux-hooks.ts';
import {categorySelector} from '../../Redux/CategorySlice.ts';

const CategoryPage = () => {
  const categories = useAppSelector(categorySelector);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <h3 className={'mt-5 ms-5'}>Categories</h3>
      <button type="button" className="btn btn-success" style={{position: 'absolute', right: '3%', top: '11%'}}
              onClick={openModal}>
        Add Category
      </button>
      <Modal title={'Add New Category'} show={showModal} onClose={closeModal}>
        <CategoryForm/>
      </Modal>
    </>
  );
};

export default CategoryPage;