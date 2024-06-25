import cn from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import cartIcon from '../assets/img/cart-icon.svg';
import logoSvg from '../assets/img/pizza-logo.svg';
import { selectCart } from '../redux/cart/selectors';
import { selectFilter } from '../redux/filter/selectors';
import Button from './Button';
import Search from './Search';

const Header: React.FC = () => {
  const { totalPrice, items } = useSelector(selectCart);
  const { categoryId } = useSelector(selectFilter);
  const location = useLocation();
  const isMounted = React.useRef(false)

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items])

  const totalCount = items.reduce((sum: number, item: any) => (sum += item.count), 0);

  return (
    <div className="header">
      <div className={cn('container', { 'container_type_header': location.pathname !== '/cart' })
      }>
        <Link to="/">
          <div className="header__logo-wrap">
            <img className="header__logo" width="38" src={logoSvg} alt="Pizza logo" />
            <div className="header__title-wrap">
              <h1 className="header__title">React Pizza</h1>
              <p className="header__subtitle">самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        {(location.pathname !== '/cart' && categoryId === 0) && <Search />}
        <div className="header__cart">
          {location.pathname !== '/cart' && (
            <Link to="cart">
              <Button className="button-cart">
                <>
                  <span>{totalPrice} ₽</span>
                  <div className="button__delimiter"></div>
                  <img className='header__cart-icon' src={cartIcon} alt="cart icon" />
                  <span>{totalCount}</span>
                </>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div >
  );
}

export default Header;
