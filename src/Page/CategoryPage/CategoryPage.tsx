import Modal from '../../Components/Modal /Modal.tsx';
import {useEffect, useState} from 'react';
import CategoryForm from '../../Components/CategoryForm/CategoryForm.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks.ts';
import {deleteCategory, fetchCategories} from '../../Redux/CategoryThunks.ts';
import {selectCategory, selectLoading} from '../../Redux/CategorySlice.ts';

const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategory);
  const isLoading = useAppSelector(selectLoading);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{
    id: string;
    name: string;
    type: 'income' | 'expense'
  } | null>(null);

  const openModal = (category?: { id: string; name: string; type: 'income' | 'expense' }) => {
    setEditingCategory(category || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingCategory(null);
    setShowModal(false);
  };

  const onDelete = async (categoryID: string) => {
    if(window.confirm('Вы уверены?')) {
      await dispatch(deleteCategory(categoryID));
      dispatch(fetchCategories());
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return isLoading ? (
    <div className="d-flex justify-content-center align-items-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    <>
      <h3 className="mt-5 ms-5">Categories</h3>
      <button
        type="button"
        className="btn btn-success"
        style={{position: 'absolute', right: '3%', top: '11%'}}
        onClick={() => openModal()}
      >
        Add Category
      </button>
      <Modal title={editingCategory ? 'Edit Category' : 'Add New Category'} show={showModal} onClose={closeModal}>
        <CategoryForm existingCategory={editingCategory}/>
      </Modal>
      {categories.map(category => (
        <div className="card mb-4 mt-4 container" key={category.id}>
          <div className="d-flex align-items-center">
            <div className="card-body">
              <strong className="card-title fs-4">{category.name}</strong>
            </div>
            <strong
              className="fs-5 me-5"
              style={{color: category.type === 'income' ? 'green' : 'red'}}
            >
              {category.type === 'income' ? 'Income' : 'Expense'}
            </strong>
            <div className="me-5">
              <button
                type="button"
                className="btn btn-warning me-3"
                onClick={() => openModal({id: category.id, name: category.name, type: category.type})}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete(category.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoryPage;
