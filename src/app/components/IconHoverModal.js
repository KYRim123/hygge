const IconHoverModal = ({ countItem, Icon, children }) => {
  return (
    <div className="group cursor-pointer relative">
      <div className="relative">
        {countItem > 0 && (
          <span className="absolute -right-2 -top-2 bg-pink-500 rounded-full text-[12px] w-[20px] h-[20px] text-white text-center leading-[20px]">
            {countItem}
          </span>
        )}
        <Icon size={25} />
      </div>
      <div className="hidden group-hover:block absolute before:absolute before:content-[''] before:left-0 before:right-0 before:-top-3 before:h-6 top-[25px] right-[10px] border-[1px] border-gray-300 rounded-xl bg-white p-5 w-[400px] shadow-lg z-10">
        {children}
      </div>
    </div>
  );
};

export default IconHoverModal;
