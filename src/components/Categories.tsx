import cn from 'classnames';
import React from 'react';
import { categories } from '../utils/constants';

type TCategoryProps = {
  value: number,
  onChangeCategory: (i: number) => void,
}

const Categories: React.FC<TCategoryProps> = React.memo(({ value, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul className="categories__cells">
        {categories.map((category, i) => {
          return (
            <li onClick={() => onChangeCategory(i)} key={i} className={cn('categories__cell', { categories__cell_active: value === i })}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
})

export default Categories;
