import Sidebar from "@/app/components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex justify-between p-6 gap-2 bg-slate-100">
      <Sidebar />
      <div className="bg-white rounded-2xl flex-grow p-3 shadow-md">{children}</div>;
    </div>
  );
}
