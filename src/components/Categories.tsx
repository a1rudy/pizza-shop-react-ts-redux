import React from 'react';

type TCategoryProps = {
  value: number,
  onChangeCategory: (i: number) => void,
}

const Categories: React.FC<TCategoryProps> = React.memo(({ value, onChangeCategory }) => {
  const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => {
          return (
            <li onClick={() => onChangeCategory(i)} key={i} className={value === i ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
})

export default Categories;
