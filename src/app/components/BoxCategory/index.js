export default function BoxCategory({ text, Icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-[150px] p-5 bg-gray-100 rounded-lg block hover:translate-y-1 cursor-pointer"
    >
      <div className="flex flex-col items-center gap-1">
        <Icon
          color="#cc005e"
          size={25}
        />
        <p className="capitalize font-medium">{text}</p>
      </div>
    </div>
  );
}
