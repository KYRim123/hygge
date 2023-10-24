import Sidebar from "@/app/components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex justify-between bg-slate-100">
      <Sidebar />
      <div className="w-full bg-white flex-grow">
        <div className="h-[60px] w-full bg-[#00cc96]"></div>
        <div className="">{children}</div>
      </div>
    </div>
  );
}
