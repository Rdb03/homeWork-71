import './DishesForm.css';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {ApiDish, IDishesMutation} from '../../type';
import ButtonSpinner from '../Spinner/ButtonSpinner.tsx';

const initialState: IDishesMutation= {
  name: '',
  price: '',
  photo: '',
};

interface Props {
  onSubmit: (contact: ApiDish) => void;
  existingDish?: IDishesMutation;
  isEdit?: boolean;
  isLoading?: boolean;
}

const DishesForm:React.FC<Props> = ({isEdit = false, existingDish = initialState, isLoading = false, onSubmit}) => {
  const [dish, setDish] = useState(existingDish);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    setImagePreview(dish.photo);
  }, [dish.photo]);

  const changeDish = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'photo') {
      setDish((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setDish((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    onSubmit({
      ...dish,
      price: parseInt(dish.price),
    });
  };

  return (
    <form onSubmit={onFormSubmit} className="container mt-5">
      <h4>{isEdit ? 'Edit Dish' : 'Add new Dish'}</h4>
      <div className="form-group">
        <label htmlFor="name">Dish:</label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          required
          value={dish.name}
          onChange={changeDish}
        />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          value={dish.price}
          id="price"
          required
          className="form-control"
          onChange={changeDish}
        />
        <label htmlFor="photo">Photo:</label>
        <input
          type="url"
          name="photo"
          id="photo"
          required
          value={dish.photo}
          className="form-control"
          onChange={changeDish}
        />
        {imagePreview ? (
          <div className="image-preview">
            <img className="dish-image" src={imagePreview} alt="Not Found"/>
          </div>
        ) : <div className="image-preview">
          <img className="dish-image" src="https://via.placeholder.com/300" alt="Preview"/>
        </div>}
      </div>

      <button type="submit" className="btn btn-form btn-warning mt-2" disabled={isLoading}>
        {isLoading && <ButtonSpinner/>}
        {isEdit ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default DishesForm;