import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {editCategory, fetchCategories, postCategory} from '../../Redux/CategoryThunks.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks.ts';
import {Category} from '../../types.ts';
import {selectLoading} from '../../Redux/CategorySlice.ts';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner.tsx';
import { toast } from 'react-toastify';

interface Props {
  existingCategory: Category | null;
}

const CategoryForm: React.FC<Props> = ({existingCategory}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const isLoading = useAppSelector(selectLoading);

  useEffect(() => {
    if (existingCategory) {
      setName(existingCategory.name);
      setType(existingCategory.type);
    }
  }, [existingCategory]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newCategory = {name, type};
      if (existingCategory) {
        await dispatch(editCategory({id: existingCategory.id, ...newCategory}));
      } else {
        await dispatch(postCategory(newCategory));
      }
      dispatch(fetchCategories());
      toast.success('success')
      navigate('/');
    }catch (e){
      toast.error('error')
    }

  };

  return (
    <form onSubmit={handleSubmit} className="mb-3  text-center justify-content-center">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input type="text" className="form-control border-black" id="name" value={name}
               onChange={(e) => setName(e.target.value)} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">Type:</label>
        <select className="form-select border-black" id="type" value={type}
                onChange={(e) => setType(e.target.value as 'income' | 'expense')} required>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        Submit
        {isLoading && <ButtonSpinner/>}
      </button>
    </form>
  );
};

export default CategoryForm;
