import { Navbar } from "@/shared/components/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Navbar />
        <main className="w-screen flex-1 flex-grow overflow-auto overflow-y-scroll scrollbar-hide">
          {children}
        </main>
      </div>
    </>
  );
};

export default layout;
