import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';

type TPizzaObj = {
  imageUrl: string,
  title: string,
  price: number,
}

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<TPizzaObj>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://6633a521f7d50bbd9b4a2e13.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    <div className="container container_type_full-pizza">
      <div className='full-pizza'>
        <img className='full-pizza__image' src={pizza.imageUrl} alt="pizza" />
        <h2 className='full-pizza__title'>{pizza.title}</h2>
        <h4 className='full-pizza__price'>{pizza.price} ₽</h4>
        <Button className="button-add" outline>
          <Link to="/">
            <span>Назад</span>
          </Link>
        </Button>
      </div>

    </div>
  );
};

export default FullPizza;
