const Button = ({ className, children, onClick, props }) => {
  return (
    <button
      className={`${className} text-center font-bold cursor-pointer rounded-full px-[40px] py-[20px]`}
      onClick={onClick || null}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
