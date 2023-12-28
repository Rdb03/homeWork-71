import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hook.ts';
import {selectCreateDishLoading} from '../../app/dishesSlice.ts';
import DishesForm from '../../components/DishesForm/DishesForm.tsx';
import {createDish, fetchDishes} from "../../app/dishesThunk.ts";
import {ApiDish} from "../../type";

const NewDish = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCreateDishLoading);

  const onSubmit = (dish: ApiDish) => {
    dispatch(createDish(dish));
    dispatch(fetchDishes());
    navigate('/admin/dishes');
  };

  return (
    <div>
      <div className="row mt-2">
        <div className="col">
          <DishesForm  onSubmit={onSubmit} isLoading={createLoading}/>
        </div>
      </div>
    </div>
  );
};

export default NewDish;