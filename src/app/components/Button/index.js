const Button = ({ className, children, onClick, type }) => {
  return (
    <div
      className={`${className} text-center font-bold cursor-pointer rounded-3xl px-[40px] py-[17px]`}
      onClick={onClick || null}
      type={type}
    >
      {children}
    </div>
  );
};

export default Button;
