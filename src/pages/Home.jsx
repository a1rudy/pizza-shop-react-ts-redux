import axios from 'axios';
import qs from 'qs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Loader from '../components/PizzaBlock/Loader';
import Sort, { sortList } from '../components/Sort';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Pagination from './Pagination';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filterSlice);

  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const fetchPizzaz = () => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://6633a521f7d50bbd9b4a2e13.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((res) => res);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const quaryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${quaryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort, currentPage, navigate]);

  React.useEffect(() => {
    const search = window.location.search;
    if (search) {
      const params = qs.parse(search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
    }
    isSearch.current = true;
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzaz();
    }

    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  const loader = [...new Array(6)].map((_, i) => <Loader key={i} />);
  const pizzas = items.map((obj, i) => <PizzaBlock key={i} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? loader : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
