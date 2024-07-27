import Modal from '../../Components/Header/Modal.tsx';
import {useEffect, useState} from 'react';
import CategoryForm from '../../Components/CategoryForm/CategoryForm.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks.ts';
import {deleteCategory, fetchCategories} from '../../Redux/CategoryThunks.ts';
import {selectCategory, selectLoading} from '../../Redux/CategorySlice.ts';
import {Link} from 'react-router-dom';

const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategory);
  const isLoading = useAppSelector(selectLoading);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onDelete = async (dishID: string) => {
    await dispatch(deleteCategory(dishID));
    dispatch(fetchCategories());
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, fetchCategories]);

  return isLoading ? (
      <div className={'d-flex justify-content-center align-items-center'}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
    :
    (
      <>
        <h3 className={'mt-5 ms-5'}>Categories</h3>
        <button type="button" className="btn btn-success" style={{position: 'absolute', right: '3%', top: '11%'}}
                onClick={openModal}>
          Add Category
        </button>
        <Modal title={'Add New Category'} show={showModal} onClose={closeModal}>
          <CategoryForm/>
        </Modal>
        {categories.map(category => (
          <div className={'card mb-4 mt-4 container'} key={category.id}
          >
            <div className="d-flex align-items-center">
              <div className="card-body">
                <strong className="card-title fs-4">{category.name}</strong>
              </div>
              <strong className={'fs-5 me-5'}
                      style={{color: category.type === 'income' ? 'green' : 'red'}}
              >{category.type === 'income' ? 'Income' : 'Expense'}</strong>
              <div className="me-5">
                <Link to={``}>
                  <button type="button" className={'btn btn-warning me-3'}>Edit</button>
                </Link>
                <button type="button" className={'btn btn-danger'} onClick={() => onDelete(category.id)}>Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    );
};

export default CategoryPage;