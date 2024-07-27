import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {fetchCategories, postCategory} from '../../Redux/CategoryThunks.ts';
import {useAppDispatch} from '../../hooks/redux-hooks.ts';

const CategoryForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newCategory = { name, type };
    await dispatch(postCategory(newCategory));
    dispatch(fetchCategories);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3  text-center justify-content-center">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input type="text" className="form-control border-black" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">Type:</label>
        <select className="form-select border-black" id="type" value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')} required>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default CategoryForm;
