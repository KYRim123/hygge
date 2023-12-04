const Button = ({ className, children, onClick, ...buttonProps }) => {
  return (
    <button
      className={`${
        buttonProps.disabled ? "cursor-no-drop" : "cursor-pointer"
      } text-center font-bold rounded-full px-[30px] py-[15px] ${className}`}
      onClick={onClick || null}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
