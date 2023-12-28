import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook.ts";
import {selectDish, selectOneFetchLoading, selectUpdateDishLoading} from "../../app/dishesSlice.ts";
import {fetchOneDish, updateDish} from "../../app/dishesThunk.ts";
import {useEffect} from "react";
import {ApiDish} from "../../type";
import Spinner from "../../components/Spinner/Spinner.tsx";
import DishesForm from "../../components/DishesForm/DishesForm.tsx";

const EditDish = () => {
    const navigate = useNavigate();
    const {id} = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const dish = useAppSelector(selectDish);
    const updateLoading = useAppSelector(selectUpdateDishLoading);
    const fetchLoading = useAppSelector(selectOneFetchLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchOneDish(id));
        }
    }, [dispatch, id]);

    const onSubmit  = async (dish: ApiDish)   => {
        await dispatch(updateDish({id, dish}));
        navigate('/admin');
    };

    const existingDish = dish ? {
        ...dish,
        price: dish.price.toString(),
    } : undefined;

    console.log(dish);

    let formSection = <Spinner/>;

    if(!fetchLoading) {
        if(dish) {
            formSection = (
                <DishesForm
                    isEdit
                    onSubmit={onSubmit}
                    existingDish={existingDish}
                    isLoading = {updateLoading}
                />
            );
        } else {
            formSection = <h4>Not Found</h4>;
        }
    }

    return (
        <div className="row mt-2">
            <div className="col">
                {formSection}
            </div>
        </div>
    );
};

export default EditDish;