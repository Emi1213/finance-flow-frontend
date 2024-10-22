import { Sidebar } from "@/core/layout/sidebar";
import { Navbar } from "@/core/layout/navbar";
import { IModule } from "@/shared/interfaces/IModule";

interface LayoutProps {
  children: React.ReactNode;
}

const appModules: IModule[] = [
  {
    name: "Dashboard",
    alias: "dashboard",
    icon: "FaHome",
  },
  {
    name: "Transacciones",
    alias: "transactions",
    icon: "FaHome",
  },
  {
    name: "Reportes",
    alias: "reports",
    icon: "FaHome",
  },
];

const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen w-full ">
      <Navbar />
      <div className="flex h-screen">
        <div className=" bg-gray-100 shadow-lg">
          <Sidebar modules={appModules} />
        </div>
        <div className="">
          <main className="p-11 h-full ">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default layout;
