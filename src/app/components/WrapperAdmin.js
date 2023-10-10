import Sidebar from "./Sidebar";

const WrapperAdmin = ({ children }) => {
  return (
    <div className="flex justify-between p-6 gap-2 bg-slate-100 h-full">
      <Sidebar />
      <div className="bg-white rounded-2xl flex-grow p-3 shadow-md">{children}</div>
    </div>
  );
};

export default WrapperAdmin;
