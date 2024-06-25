import cn from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import sortIcon from '../assets/img/sort-icon.svg';
import { setSort } from '../redux/filter/slices';
import { TSort } from '../redux/filter/types';
import { sortList } from '../utils/constants';

type TPopupClick = MouseEvent & {
  composedPath: () => Node[]
}

type TSortPopupProps = {
  value: TSort;
};

const Sort: React.FC<TSortPopupProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [visible, setVisible] = React.useState<boolean>(false);

  const onClickSortList = (obj: TSort) => {
    dispatch(setSort(obj));
    setVisible(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      const _evt = evt as TPopupClick

      if (sortRef.current && !_evt.composedPath().includes(sortRef.current)) {
        setVisible(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <img
          className={cn('sort__label-icon', { rotated: visible })}
          src={sortIcon}
          alt="sort icon"
        />
        <b className="sort__label-text">Сортировка по:</b>
        <span className="sort__label-type" onClick={() => setVisible(!visible)}>{value.name}</span>
      </div>
      {visible && (
        <div className="sort__popup">
          <ul className="sort__type-list">
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickSortList(obj)}
                className={cn('sort__type', {
                  sort__type_active: value.sortProperty === obj.sortProperty,
                })}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
})

export default Sort;
