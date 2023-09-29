import Link from "next/link";

export default function BoxCategory({ text, link, Icon }) {
  return (
    <Link
      href={link}
      className="w-[150px] p-5 bg-gray-100 rounded-lg block"
    >
      <div className="flex flex-col items-center gap-1">
        <Icon
          color="#cc005e"
          size={25}
        />
        <p className="capitalize font-medium">{text}</p>
      </div>
    </Link>
  );
}
