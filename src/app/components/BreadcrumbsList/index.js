import { BiChevronRight } from "react-icons/bi";

export default function BreadcrumbsList(props) {
  const data = props.arr;

  return (
    <div className="mb-12">
      <div className="text-xl flex items-center font-medium leading-8">
        {data.map((item, index) => {
          return (
            <div
              className="flex items-center"
              key={index}
            >
              {index !== 0 ? <BiChevronRight className="ml-3 mr-5 text-3xl" /> : null}
              {index === data.length - 1 ? <p>{item.name}</p> : <a href={item.link}>{item.name}</a>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
