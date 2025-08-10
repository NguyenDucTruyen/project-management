export type UserStory = {
  id: string
  title: string
  description: string
  storyPoints: number
  priority: 'High' | 'Medium' | 'Low'
  status: 'Todo' | 'In Progress' | 'Done'
  assignee?: string
  tags?: string[]
  tasks: Task[]
}

export type Task = {
  id: string
  title: string
  description: string
  status: 'Todo' | 'In Progress' | 'Done'
  assignee: string
}

export type Sprint = {
  id: string
  name: string
  startDate: string
  endDate: string
  status: 'Planning' | 'Active' | 'Completed'
  userStories: UserStory[]
}

export type Project = {
  id: string
  name: string
  description: string
  sprints: Sprint[]
}

export type ViewMode = 'kanban' | 'list'

export type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

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
    tags: ['authentication', 'security'],
    tasks: [
      {
        id: '1',
        title: 'Implement login API',
        description: 'Create an API endpoint for user login',
        status: 'In Progress',
        assignee: 'John Doe'
      },
      {
        id: '2',
        title: 'Implement user authentication',
        description: 'Add user authentication to the login API',
        status: 'Todo',
        assignee: 'Mike Johnson'
      }
    ]
  },
  {
    id: '2',
    title: 'As an admin, I want to manage user accounts so that I can control system access',
    description: 'Administrators need the ability to create, update, and deactivate user accounts',
    storyPoints: 8,
    priority: 'Medium',
    status: 'In Progress',
    assignee: 'Jane Smith',
    tags: ['admin', 'user-management'],
    tasks: [
      {
        id: '1',
        title: 'Implement user management API',
        description: 'Create API endpoints for user management',
        status: 'In Progress',
        assignee: 'Jane Smith'
      },
      {
        id: '2',
        title: 'Create user management UI',
        description: 'Develop the user interface for managing users',
        status: 'Todo',
        assignee: 'John Doe'
      }
    ]
  },
  {
    id: '3',
    title: 'As a user, I want to view my task dashboard so that I can track my work',
    description: 'Users need a comprehensive view of their assigned tasks and progress',
    storyPoints: 3,
    priority: 'High',
    status: 'Todo',
    assignee: 'Mike Johnson',
    tags: ['dashboard', 'tasks'],
    tasks: [
      {
        id: '1',
        title: 'Design task dashboard UI',
        description: 'Create the layout and design for the task dashboard',
        status: 'Todo',
        assignee: 'Mike Johnson'
      },
      {
        id: '2',
        title: 'Implement task dashboard functionality',
        description: 'Add functionality to display user tasks in the dashboard',
        status: 'Todo',
        assignee: 'Mike Johnson'
      }
    ]
  },
  {
    id: '4',
    title: 'As a user, I want to receive notifications so that I stay updated on important changes',
    description: 'Users should be notified about task assignments, deadlines, and project updates',
    storyPoints: 5,
    priority: 'Medium',
    status: 'Done',
    assignee: 'Alice Brown',
    tags: ['notifications', 'real-time'],
    tasks: [
      {
        id: '1',
        title: 'Implement notification system',
        description: 'Create a system to manage user notifications',
        status: 'In Progress',
        assignee: 'Alice Brown'
      },
      {
        id: '2',
        title: 'Design notification UI',
        description: 'Develop the user interface for notifications',
        status: 'Todo',
        assignee: 'Mike Johnson'
      }
    ]
  },
  {
    id: '5',
    title: 'As a project manager, I want to create and manage sprints so that I can organize work',
    description: 'Project managers need tools to plan, create, and monitor sprint progress',
    storyPoints: 13,
    priority: 'High',
    status: 'Todo',
    assignee: 'Bob Wilson',
    tags: ['sprint-management', 'planning'],
    tasks: [
      {
        id: '1',
        title: 'Create sprint planning document',
        description: 'Outline the goals and tasks for the sprint',
        status: 'Todo',
        assignee: 'Bob Wilson'
      },
      {
        id: '2',
        title: 'Set up sprint board',
        description: 'Create a board to track sprint progress',
        status: 'Todo',
        assignee: 'Mike Johnson'
      },
      {
        id: '3',
        title: 'Conduct sprint planning meeting',
        description: 'Hold a meeting to discuss sprint goals and tasks',
        status: 'Todo',
        assignee: 'Bob Wilson'
      }
    ]
  }
]

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
    status: 'Planning',
    userStories: []
  },
  {
    id: 'sprint-3',
    name: 'Sprint 3 - Advanced Features',
    startDate: '2024-03-01',
    endDate: '2024-03-14',
    status: 'Active',
    userStories: [mockUserStories[1]] // Admin user management (In Progress)
  }
]

// Mock backlog (unassigned user stories)
export const mockBacklog: Sprint = {
  id: 'backlog',
  name: 'Backlog',
  startDate: '2024-02-01',
  endDate: '2024-02-28',
  status: 'Planning',
  userStories: [
    mockUserStories[0], // User Authentication
    mockUserStories[2], // Task Dashboard
    mockUserStories[4] // Sprint Management
  ]
}

// Mock project data
export const mockProject: Project = {
  id: 'project-1',
  name: 'TaskFlow',
  description: 'Project Management Navigation',
  sprints: mockSprints
}
