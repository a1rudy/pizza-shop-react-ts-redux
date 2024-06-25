import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cartIcon from '../assets/img/cart-icon-black.svg';
import clearLogo from '../assets/img/trash-logo.svg';
import { CartEmpty, CartItem } from '../components';
import Button from '../components/Button';
import { selectCart } from '../redux/cart/selectors';
import { clearItems } from '../redux/cart/slices';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector(selectCart);

  const onClickClear = () => {
    if (window.confirm('Очистить корзину?')) {
      dispatch(clearItems())
    };
  };

  const onClickOrder = () => {
    console.log('ВАШ ЗАКАЗ', items);
  };

  const totalCount = items.reduce((sum: number, item: any) => (sum += item.count), 0);

  if (!totalPrice) return <CartEmpty />

  return (
    <div className="container container_type_cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="cart__title">
            <img className="cart__logo" src={cartIcon} alt="cart logo" />
            Корзина
          </h2>
          <div className="cart__clear">
            <img className="cart__clear-logo" src={clearLogo} alt="clear logo" />
            <span className="cart__clear-text" onClick={onClickClear}>
              Очистить корзину
            </span>
          </div>
        </div>
        <div className="content__items">
          {items.map((item: any) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <p className="cart__bottom-details-text">
              Всего пицц: <span className="cart__bottom-details-span">{totalCount} шт.</span>
            </p>
            <p className="cart__bottom-details-text">
              Сумма заказа: <span className="cart__bottom-details-span">{totalPrice} ₽</span>
            </p>
          </div>
          <div className="cart__bottom-buttons">
            <Button className="button-add go-back-btn" outline>
              <Link to="/">
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 13L1 6.93015L6.86175 1"
                    stroke="#D3D3D3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="go-back-btn__span">Вернуться назад</span>
              </Link>
            </Button>
            <Button onClick={onClickOrder} className="pay-btn">
              <span>Оплатить сейчас</span>
            </Button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Cart;
