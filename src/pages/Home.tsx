import qs from 'qs';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Categories, Loader, PizzaBlock, Sort } from '../components';
import Pagination from '../components/Pagination';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slices';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { selectPizzaData } from '../redux/pizza/selectors';
import { TFetchPizzasParams, TSearchPizzaParams } from '../redux/pizza/types';
import { useAppDispatch } from '../redux/store';
import { sortList } from '../utils/constants';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (num: number) => {
    dispatch(setCurrentPage(num));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? String(categoryId) : null;
    const search = searchValue;

    const fetchParams: TFetchPizzasParams = {
      sortBy,
      order,
      category,
      search,
      currentPage,
    }
    dispatch(
      fetchPizzas(fetchParams),
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (!isMounted.current && window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as TSearchPizzaParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      const filtersParams = {
        searchValue: params.search,
        categoryId: Number(params.categoryId),
        currentPage: Number(params.currentPage),
        sort: sort || sortList[0],
      }
      dispatch(
        setFilters(filtersParams),
      );
    }
    isMounted.current = true;
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const paramsQs = {
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      };
      const queryString = qs.stringify(paramsQs, { skipNulls: true });

      navigate(`/?${queryString}`);
    }
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const loader = [...new Array(3)].map((_, i) => <Loader key={i} />);
  const pizzas = items.map((obj: any, i: number) => <PizzaBlock key={i} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? loader : pizzas}</div>
      )}
      {categoryId === 0 && <Pagination currentPage={currentPage} onChangePage={onChangePage} />}
    </div>
  );
}

export default Home;
