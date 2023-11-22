const IconHoverModal = ({ countItem, Icon, children }) => {
  return (
    <div className="group cursor-pointer relative">
      <div className="relative">
        {countItem > 0 && (
          <span className="absolute -right-2 -top-2 bg-pink-500 rounded-full text-[12px] w-[18px] h-[18px] text-white text-center leading-[18px]">
            {countItem}
          </span>
        )}
        <Icon size={25} />
      </div>
      <div className="hidden group-hover:block absolute top-[25px] right-[10px] border-[1px] border-gray-300 rounded-xl bg-white p-5 w-[400px] shadow-lg z-10">
        {children}
      </div>
    </div>
  );
};

export default IconHoverModal;
