import { BG_BLUE, BG_GREEN, BG_ORANGE } from "../lib/constants";

export default function TypeProduct({ type }) {
  const bgColor =
    type === BG_BLUE
      ? "bg-blue-100"
      : type === BG_ORANGE
      ? "bg-orange-100"
      : type === BG_GREEN
      ? "bg-green-100"
      : "bg-purple-100";
      
  const textColor =
    type === BG_BLUE
      ? "text-blue-600"
      : type === BG_ORANGE
      ? "text-orange-600"
      : type === BG_GREEN
      ? "text-green-600"
      : "text-purple-600";

  return (
    <div className={`${bgColor} rounded-full text-center px-4 py-4`}>
      <span className={`${textColor} font-semibold`}>{type}</span>
    </div>
  );
}
