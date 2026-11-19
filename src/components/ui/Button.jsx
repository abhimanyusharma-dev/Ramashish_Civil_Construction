import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  onClick,
  className = '',
  icon: Icon,
  iconPosition = 'right',
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-300 tracking-wider text-xs uppercase cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed group';

  const sizeStyles = {
    sm: 'px-4 py-2 text-[11px] gap-2',
    md: 'px-6 py-3.5 text-xs gap-2.5',
    lg: 'px-8 py-4 text-sm gap-3'
  };

  const variantStyles = {
    primary:
      'bg-[#C99A32] text-[#0B2347] font-bold rounded-lg hover:bg-[#A67C22] hover:shadow-[0_4px_16px_rgba(201,154,50,0.35)] active:scale-[0.98]',
    outline:
      'border-2 border-[#C99A32] text-[#0B2347] font-bold rounded-lg hover:bg-[#C99A32] hover:text-[#0B2347] hover:shadow-[0_4px_16px_rgba(201,154,50,0.25)] active:scale-[0.98]',
    ghost:
      'text-[#0B2347] font-bold hover:text-[#C99A32] hover:bg-[#F8F6F0] rounded-lg active:scale-[0.98]',
    dark:
      'bg-[#0B2347] text-white font-bold border border-[#C99A32]/50 hover:bg-[#172238] hover:border-[#C99A32] rounded-lg active:scale-[0.98]',
    whatsapp:
      'bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#1ebe5b] hover:shadow-[0_4px_16px_rgba(37,211,102,0.35)] active:scale-[0.98]'
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variantStyles[variant] || variantStyles.primary
  } ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');
    return (
      <a
        href={href}
        className={combinedClasses}
        target={isExternal && !href.startsWith('tel:') ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
}

