import cn from 'classnames';
import React from 'react';

type TButtonProps = {
  className: string,
  onClick?: () => void,
  disabled?: boolean,
  outline?: boolean,
  children: JSX.Element,
}

const Button: React.FC<TButtonProps> = ({ onClick, className, disabled, outline, children }) => {
  return (
    <button
      onClick={onClick}
      className={cn('button', className, {
        'button-outline': outline,
      })}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
