import React from 'react';

function Categories({ value, onChangeCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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
}

export default Categories;
