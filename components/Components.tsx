import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCartStore } from '../stores';

// --- Spinner ---
export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg', color?: 'primary' | 'white' }> = ({ size = 'md', color = 'primary' }) => {
  const sizeClasses = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  const colorClasses = { primary: 'text-primary', white: 'text-white' };

  return (
    <svg className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
};

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'py-4 px-6 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center';
  const variants = {
    primary: 'bg-primary text-white hover:bg-emerald-600 shadow-md',
    outline: 'border border-gray-300 text-dark hover:border-primary hover:text-primary',
    ghost: 'text-primary hover:bg-gray-50',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

export const Input: React.FC<InputProps> = ({ label, icon, rightIcon, onRightIconClick, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-graytext text-sm font-medium ml-1">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-white border-b border-gray-200 py-3 ${
            icon ? 'pl-10' : 'px-2'
          } ${rightIcon ? 'pr-10' : ''} focus:outline-none focus:border-primary transition-colors text-lg text-dark placeholder-gray-300`}
          {...props}
        />
        {rightIcon && (
          <div 
            className={`absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 ${onRightIconClick ? 'cursor-pointer hover:text-dark' : ''}`}
            onClick={onRightIconClick}
          >
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Star Rating ---
interface StarRatingProps {
  rating: number;
  max?: number;
  onRatingChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  max = 5, 
  onRatingChange, 
  size = 'md',
  readonly = true 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(max)].map((_, index) => {
        const value = index + 1;
        const isFilled = value <= rating;
        
        return (
          <button
            key={index}
            type="button"
            disabled={readonly}
            onClick={() => !readonly && onRatingChange?.(value)}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          >
            <svg 
              className={`${sizeClasses[size]} ${isFilled ? 'text-[#F3603F] fill-current' : 'text-gray-300'}`} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth={isFilled ? 0 : 2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

// --- Product Card ---
export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div 
      //className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition-shadow cursor-pointer h-full"
      className="bg-gray-100 border border-gray-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition-shadow cursor-pointer h-full"

      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="flex justify-center mb-6 h-28 items-center">
        <img src={product.image} alt={product.name} className="h-full object-contain max-w-[80%]" />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-dark text-base tracking-tight leading-tight mb-1">{product.name}</h3>
        <p className="text-graytext text-sm font-medium mb-4">{product.unit}, Price</p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-dark text-lg">${product.price.toFixed(2)}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="bg-primary w-11 h-11 rounded-[17px] flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// --- Quantity Control ---
interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'sm' | 'lg';
}

export const QuantityControl: React.FC<QuantityControlProps> = ({ quantity, onIncrease, onDecrease, size = 'sm' }) => {
  const btnClass = `rounded-xl border border-gray-200 flex items-center justify-center text-primary hover:border-primary transition-colors ${size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'}`;
  
  return (
    <div className="flex items-center gap-4">
      <button className={btnClass} onClick={onDecrease}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
      </button>
      <span className={`font-semibold text-dark ${size === 'lg' ? 'text-xl' : 'text-base'}`}>{quantity}</span>
      <button className={btnClass} onClick={onIncrease}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
      </button>
    </div>
  );
};