import './Order.css';
import { useAppDispatch, useAppSelector } from "../../app/hook.ts";
import {clearOrders, dishesTotalSum, selectCartDishes, selectTotalPriceWithDelivery} from "../../app/cartSlice.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";
import {NavLink, useNavigate} from "react-router-dom";
import { createOrder } from "../../app/orderThunk.ts";
import { useEffect } from "react";

const Order = () => {
    const dispatch = useAppDispatch();
    const totalSumWithDelivery = useAppSelector(selectTotalPriceWithDelivery);
    const orders = useAppSelector(selectCartDishes);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(dishesTotalSum(true));
    }, [dispatch, orders]);

    const orderCreate = () => {
        const formattedOrder = orders.map(item => ({
            orderID: item.dish.id,
            amount: item.amount
        }));
        alert("Ваш заказ успешно принят!");
        navigate('/');
        dispatch(createOrder(formattedOrder)).then(() => {
            dispatch(clearOrders());
        });
    };

    return (
        <div className="container">
            <div className="you-order-div">
                <div className="order-header">
                    <h1>You Order</h1>
                    <div>
                        <NavLink to="/" className="order-btn cancel">Cancel</NavLink>
                        <button className="order-btn" onClick={orderCreate}>Order</button>
                    </div>
                </div>
                <div className="order-main-div">
                    {orders ? (
                        orders.map((order) => (
                            <div key={order.dish.id} className="order-div">
                                <p>{order.dish.name} <span className="order-bold">X{order.amount}</span></p>
                                <p><span className="order-bold price">{order.dish.price}</span>KGS</p>
                            </div>
                        ))
                    ) : (
                        <Spinner />
                    )}
                    <div className="order-div-bottom">
                        <p>Delivery: <span className="order-bold">150</span> KGS</p>
                        <p>Total Price: <span className="order-bold">{totalSumWithDelivery}</span>  KGS</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;