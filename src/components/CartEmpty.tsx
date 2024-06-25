import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../assets/img/empty-cart.png';
import Button from './Button';

const CartEmpty: React.FC = () => {
  return (
    <div className="container container_type_cart">
      <div className="cart cart-empty">
        <h2 className="cart-empty__title">
          Корзина пустая <span className="cart-empty__title-span">😕</span>
        </h2>
        <p className="cart-empty__text">
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img className="cart-empty__image" src={cartEmptyImg} alt="empty cart" />
        <Button className="button-black">
          <Link to="/" >
            <span>Вернуться назад</span>
          </Link>
        </Button>
      </div>
    </div>
  )
};

export default CartEmpty;
