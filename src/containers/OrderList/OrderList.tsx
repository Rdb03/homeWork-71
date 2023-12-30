import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hook.ts";
import {selectCartDishes} from "../../app/cartSlice.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";
import {fetchOrders} from "../../app/orderThunk.ts";

const OrderList = () => {
    const dispatch = useAppDispatch();
    const ordersList = useAppSelector(selectCartDishes);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    console.log(ordersList);

    return (
        <div className="container">
            {ordersList? (
                ordersList.map((dish, index) => (
                    <div key={index}>
                        <p>{dish.amount}</p>
                    </div>
                ))
            ) : (
                <Spinner />
            )}
            <h1>Не смог отрисовать :(</h1>
        </div>
    );
};

export default OrderList;


