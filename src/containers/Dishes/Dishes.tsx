import {NavLink} from 'react-router-dom';
import './Dishes.css';
import {useAppDispatch, useAppSelector} from '../../app/hook.ts';
import {selectDeleteDishLoading, selectDishes} from '../../app/dishesSlice.ts';
import {useEffect} from 'react';
import {deleteDish, fetchDishes} from '../../app/dishesThunk.ts';
import Spinner from '../../components/Spinner/Spinner.tsx';
import ButtonSpinner from "../../components/Spinner/ButtonSpinner.tsx";

const Dishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
    const deleteLoading = useAppSelector(selectDeleteDishLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

    const removeDish = async (id: string) => {
        await dispatch(deleteDish(id));
        await dispatch(fetchDishes());
    };

  return (
    <div className="container">
      <div className="dishes-header">
        <h2>
          Dishes
        </h2>
        <NavLink className="new-dish-link" to='/admin/new-dish'>
          Add New Dish
        </NavLink>
      </div>
      <div className='dishes-list'>
        {dishes ? (
          dishes.map((dish) => (
            <div key={dish.id} className="dish-div mt-4">
              {dish.photo ? (
                <img className="dish-photo" src={dish.photo} alt={dish.name} />
              ) : <img className="dish-photo" src="https://via.placeholder.com/300" alt="Preview" />}
              <div className="dish-info">
                <p>{dish.name}</p>
                  <p>{dish.price} som</p>
              </div>
                <div className="dishes-btn-div">
                    <NavLink className="dish-btn edit" to={`/admin/edit-dish/${dish.id}`}>Edit</NavLink>
                    <button  onClick={() =>removeDish(dish.id)} className="dish-btn delete">
                        {deleteLoading && deleteLoading === dish.id ? (<ButtonSpinner/>) : "Delete"}
                    </button>
                </div>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Dishes;