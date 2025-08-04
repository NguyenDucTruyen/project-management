import { Header } from "./Header";
import { MainLayout } from "./MainLayout";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main content area */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <MainLayout>
          {children}
        </MainLayout>
      </div>
    </div>
  );
}
