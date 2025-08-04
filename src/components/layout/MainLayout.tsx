import { cn } from "../../lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className={cn("flex-1 flex flex-col bg-gray-50", className)}>
      {/* Main Content */}
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}
