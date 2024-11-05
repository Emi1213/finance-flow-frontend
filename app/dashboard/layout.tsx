"use client";
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
  },
  {
    name: "Ingresos",
    alias: "incomes",
  },
  {
    name: "Gastos",
    alias: "expenses",
  },
  {
    name: "Metas de ahorro",
    alias: "goals",
  },
];

const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen w-full ">
      <Navbar />
      <div className="flex h-screen">
        <div className="  shadow-lg">
          <Sidebar modules={appModules} />
        </div>
        <div className="w-full">
          <main className="p-6 h-full w-full ">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default layout;
