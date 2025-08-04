import {
    AlertCircle,
    BarChart3,
    Calendar,
    ChevronDown,
    Clock,
    Code,
    FolderOpen,
    Layers,
    Play
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

interface SidebarProps {
  className?: string;
}

const navigation = [
  {
    name: "Backlog",
    href: "/backlog",
    icon: Layers,
    count: 12,
  },
  {
    name: "Active Sprint",
    href: "/sprint", 
    icon: Play,
    count: 8,
  },
  {
    name: "Timeline",
    href: "/timeline",
    icon: Calendar,
    count: 3,
  },
  {
    name: "Memo Demo",
    href: "/memo-demo",
    icon: Code,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  return (
    <div className={cn("flex min-h-screen w-64 flex-col bg-gray-50 border-r", className)}>
      {/* Project Switcher */}
      <div className="p-4 border-b">
        <Button
          variant="ghost"
          className="w-full justify-between text-left font-normal"
        >
          <div className="flex items-center">
            <FolderOpen className="mr-2 h-4 w-4" />
            <div>
              <div className="font-medium">TaskFlow</div>
              <div className="text-xs text-gray-500">Project Management Navigation</div>
            </div>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Button
              key={item.name}
              variant={isActive ? "secondary" : "ghost"}
              className="w-full justify-between"
              asChild
            >
              <Link to={item.href}>
                <div className="flex items-center">
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </div>
                {item.count && (
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </Link>
            </Button>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t bg-white">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <BarChart3 className="h-3 w-3 mr-2 text-blue-500" />
              <span className="text-gray-600">Total Tasks</span>
            </div>
            <span className="font-medium">20</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-2 text-yellow-500" />
              <span className="text-gray-600">In Progress</span>
            </div>
            <span className="font-medium">8</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <AlertCircle className="h-3 w-3 mr-2 text-red-500" />
              <span className="text-gray-600">Due Soon</span>
            </div>
            <span className="font-medium">3</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-4 border-t">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h3>
        <div className="space-y-2 text-xs text-gray-600">
          <div>Task completed</div>
          <div>Sprint started</div>
          <div>New task assigned</div>
        </div>
      </div>

      {/* Toggle Sidebar Button */}
      <div className="p-4 border-t">
        <Button variant="ghost" size="sm" className="w-full text-xs text-gray-500">
          Toggle Sidebar
        </Button>
      </div>
    </div>
  );
}
