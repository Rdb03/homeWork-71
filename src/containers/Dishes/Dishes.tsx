import {NavLink} from 'react-router-dom';
import './Dishes.css';
import {useAppDispatch, useAppSelector} from '../../app/hook.ts';
import {selectDeleteDishLoading, selectDishes} from '../../app/dishesSlice.ts';
import {useEffect} from 'react';
import {deleteDish, fetchDishes} from '../../app/dishesThunk.ts';
import Spinner from '../../components/Spinner/Spinner.tsx';
import ButtonSpinner from "../../components/Spinner/ButtonSpinner.tsx";
import {addDish, dishesTotalSum, selectTotalPrice} from "../../app/cartSlice.ts";
import {IApiDish} from "../../type";


const Dishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const deleteLoading = useAppSelector(selectDeleteDishLoading);
  const totalSum = useAppSelector(selectTotalPrice);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

    const removeDish = async (id: string) => {
        await dispatch(deleteDish(id));
        await dispatch(fetchDishes());
    };

    const addDishToCart = (dish: IApiDish) => {
        dispatch(addDish(dish));
        dispatch(dishesTotalSum(false));
    };

    return (
        <div className="container">
            <div className="dishes-header">
                {location.pathname.startsWith('/admin') ? (
                        <>
                            <h2>Dishes</h2>
                            <NavLink className="new-dish-link" to='/admin/new-dish'>
                                Add New Dish
                            </NavLink>
                        </>
                    ) :
                    <>
                        <h1>Menu</h1>
                        <div className="header-user">
                            <NavLink className="complete-btn"  to="/you-order">Complete</NavLink>
                            <p className='total-price'>Total price: {totalSum} kgs</p>
                        </div>
                    </>
                }
            </div>
            <div className='dishes-list'>
                {dishes ? (
                    dishes.map((dish) => (
                        <div key={dish.id} className="dish-div mt-4">
                            {location.pathname.startsWith('/admin') ? (
                                <>
                                    {dish.photo ? (
                                        <img className="dish-photo" src={dish.photo} alt={dish.name} />
                                    ) : (
                                        <img className="dish-photo" src="https://via.placeholder.com/300" alt="Preview" />
                                    )}
                                    <div className="dish-info">
                                        <p>{dish.name}</p>
                                        <p>{dish.price} KGS</p>
                                    </div>
                                    <div className="dishes-btn-div">
                                        <NavLink className="dish-btn edit" to={`/admin/edit-dish/${dish.id}`}>
                                            Edit
                                        </NavLink>
                                        <button onClick={() => removeDish(dish.id)} className="dish-btn delete">
                                            {deleteLoading && deleteLoading === dish.id ? <ButtonSpinner /> : "Delete"}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                    <div onClick={() => addDishToCart(dish)} className="user-div">
                                        {dish.photo ? (
                                            <img className="dish-photo" src={dish.photo} alt={dish.name}/>
                                        ) : (
                                            <img className="dish-photo" src="https://via.placeholder.com/300"
                                                 alt="Preview"/>
                                        )}
                                        <div className="dish-info-user w-100">
                                            <p>{dish.name}</p>
                                            <p className="fw-bold me-5">{dish.price} kgs</p>
                                        </div>
                                    </div>
                            )}
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