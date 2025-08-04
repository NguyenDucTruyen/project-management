import type { Project, Sprint, UserStory } from '../types';

// Mock data for user stories with proper format
export const mockUserStories: UserStory[] = [
  {
    id: '1',
    title: 'As a user, I want to log into the system so that I can access my dashboard',
    description: 'Users need a secure way to authenticate and access their personalized dashboard',
    storyPoints: 5,
    priority: 'High',
    status: 'Todo',
    assignee: 'John Doe',
    tags: ['authentication', 'security']
  },
  {
    id: '2',
    title: 'As an admin, I want to manage user accounts so that I can control system access',
    description: 'Administrators need the ability to create, update, and deactivate user accounts',
    storyPoints: 8,
    priority: 'Medium',
    status: 'In Progress',
    assignee: 'Jane Smith',
    tags: ['admin', 'user-management']
  },
  {
    id: '3',
    title: 'As a user, I want to view my task dashboard so that I can track my work',
    description: 'Users need a comprehensive view of their assigned tasks and progress',
    storyPoints: 3,
    priority: 'High',
    status: 'Todo',
    assignee: 'Mike Johnson',
    tags: ['dashboard', 'tasks']
  },
  {
    id: '4',
    title: 'As a user, I want to receive notifications so that I stay updated on important changes',
    description: 'Users should be notified about task assignments, deadlines, and project updates',
    storyPoints: 5,
    priority: 'Medium',
    status: 'Done',
    assignee: 'Alice Brown',
    tags: ['notifications', 'real-time']
  },
  {
    id: '5',
    title: 'As a project manager, I want to create and manage sprints so that I can organize work',
    description: 'Project managers need tools to plan, create, and monitor sprint progress',
    storyPoints: 13,
    priority: 'High',
    status: 'Todo',
    assignee: 'Bob Wilson',
    tags: ['sprint-management', 'planning']
  }
];

// Mock data for sprints
export const mockSprints: Sprint[] = [
  {
    id: 'sprint-1',
    name: 'Sprint 1 - Authentication & Dashboard',
    startDate: '2024-02-01',
    endDate: '2024-02-14',
    status: 'Completed',
    userStories: [mockUserStories[3]] // Notification System (Done)
  },
  {
    id: 'sprint-2',
    name: 'Sprint 2 - User Management',
    startDate: '2024-02-15',
    endDate: '2024-02-28',
    status: 'Active',
    userStories: [mockUserStories[1]] // Admin user management (In Progress)
  },
  {
    id: 'sprint-3',
    name: 'Sprint 3 - Advanced Features',
    startDate: '2024-03-01',
    endDate: '2024-03-14',
    status: 'Planning',
    userStories: []
  }
];

// Mock backlog (unassigned user stories)
export const mockBacklog: UserStory[] = [
  mockUserStories[0], // User Authentication
  mockUserStories[2], // Task Dashboard
  mockUserStories[4]  // Sprint Management
];

// Mock project data
export const mockProject: Project = {
  id: 'project-1',
  name: 'TaskFlow',
  description: 'Project Management Navigation',
  sprints: mockSprints
};
