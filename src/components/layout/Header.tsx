import { Bell, Plus, Search, Settings } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("bg-white border-b px-6 py-4", className)}>
      <div className="flex items-center justify-between">
        {/* Left side - Title and Actions */}
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-semibold text-gray-900">Backlog</h1>
          <div className="text-sm text-gray-600">
            Manage user stories, sprints and tasks
          </div>
        </div>

        {/* Center - Action Buttons */}
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create Sprint</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </Button>
          <Button variant="default" size="sm" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add User Story</span>
          </Button>
        </div>

        {/* Right side - User menu and notifications */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              JD
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium">John Doe</div>
              <div className="text-xs text-gray-500">john@example.com</div>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
