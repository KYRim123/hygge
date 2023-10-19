 
export default function TypeProduct({ text, price }) {
  const bgColor =
    price <= 50
      ? "bg-blue-100"
      : price <= 96
      ? "bg-orange-100"
      : price <= 200
      ? "bg-green-100"
      : "bg-purple-100";

  const textColor =
    price <= 50
      ? "text-blue-600"
      : price <= 96
      ? "text-orange-600"
      : price <= 200
      ? "text-green-600"
      : "text-purple-600";

  return (
    <div className={`${bgColor} rounded-full text-center px-3 py-2`}>
      <span className={`${textColor} font-bold`}>{text}</span>
    </div>
  );
}
