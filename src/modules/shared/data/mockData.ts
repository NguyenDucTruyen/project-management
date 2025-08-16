export type Priority = 'High' | 'Medium' | 'Low'
export type Status = 'Todo' | 'In Progress' | 'Done'
export type UserStory = {
  id: string
  title: string
  description: string
  storyPoints: number
  priority: Priority
  status: Status
  assignee?: string
  tags?: string[]
  sprintId: string | null
  showTask?: boolean
}

export type Task = {
  id: string
  title: string
  description: string
  status: Status
  assignee: string
  userStoryId: string
}

export type Sprint = {
  id: string | null
  name: string
  startDate: string
  endDate: string
  status: 'Planning' | 'Active' | 'Completed'
  showUserStory?: boolean
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
// Mock data for sprints
export const mockSprints: Sprint[] = [
  {
    id: '0436495f-4c89-4bc5-bdf7-45285ce43a8f',
    name: 'Sprint 1 - Authentication & Dashboard',
    startDate: '2024-02-01',
    endDate: '2024-02-14',
    status: 'Completed'
  },
  {
    id: '5a732aa4-106c-42c8-bafb-dca45990dd45',
    name: 'Sprint 2 - User Management',
    startDate: '2024-02-15',
    endDate: '2024-02-28',
    status: 'Planning'
  },
  {
    id: 'c4e25bcf-c5af-4875-80fd-5c7529bd15bc',
    name: 'Sprint 3 - Advanced Features',
    startDate: '2024-03-01',
    endDate: '2024-03-14',
    status: 'Active'
  },
  {
    id: null,
    name: 'Backlog',
    startDate: '2024-03-15',
    endDate: '2024-03-28',
    status: 'Planning'
  }
]

// Mock data for user stories
export const mockUserStories: UserStory[] = [
  {
    id: 'e5606309-db26-44e6-b2c9-dc8ad10ed9c4',
    sprintId: '0436495f-4c89-4bc5-bdf7-45285ce43a8f',
    title: 'As a user, I want to log into the system so that I can access my dashboard',
    description: 'Users need a secure way to authenticate and access their personalized dashboard',
    storyPoints: 5,
    priority: 'High',
    status: 'Todo',
    assignee: 'John Doe',
    tags: ['authentication', 'security']
  },
  {
    id: '25b6fe76-ecf4-4ea8-b5ae-b98bcc1370ca',
    sprintId: '5a732aa4-106c-42c8-bafb-dca45990dd45',
    title: 'As an admin, I want to manage user accounts so that I can control system access',
    description: 'Administrators need the ability to create, update, and deactivate user accounts',
    storyPoints: 8,
    priority: 'Medium',
    status: 'In Progress',
    assignee: 'Jane Smith',
    tags: ['admin', 'user-management']
  },
  {
    id: 'c81160ee-e3bb-44c8-89b3-f246c2d9110a',
    sprintId: '0436495f-4c89-4bc5-bdf7-45285ce43a8f',
    title: 'As a user, I want to view my task dashboard so that I can track my work',
    description: 'Users need a comprehensive view of their assigned tasks and progress',
    storyPoints: 3,
    priority: 'High',
    status: 'Todo',
    assignee: 'Mike Johnson',
    tags: ['dashboard', 'tasks']
  },
  {
    id: '99fda886-25c8-4b30-977e-f9619c3f11c2',
    sprintId: '0436495f-4c89-4bc5-bdf7-45285ce43a8f',
    title: 'As a user, I want to receive notifications so that I stay updated on important changes',
    description: 'Users should be notified about task assignments, deadlines, and project updates',
    storyPoints: 5,
    priority: 'Medium',
    status: 'Done',
    assignee: 'Alice Brown',
    tags: ['notifications', 'real-time']
  },
  {
    id: '63ed2fa7-1eba-4105-b7b0-f81799fba8a5',
    sprintId: null,
    title: 'As a project manager, I want to create and manage sprints so that I can organize work',
    description: 'Project managers need tools to plan, create, and monitor sprint progress',
    storyPoints: 13,
    priority: 'High',
    status: 'Todo',
    assignee: 'Bob Wilson',
    tags: ['sprint-management', 'planning']
  }
]

// Mock data for tasks
export const mockTasks: Task[] = [
  {
    id: 'af63bf53-6757-4079-ab1a-195746051e39',
    userStoryId: 'e5606309-db26-44e6-b2c9-dc8ad10ed9c4',
    title: 'Implement login API',
    description: 'Create an API endpoint for user login',
    status: 'In Progress',
    assignee: 'John Doe'
  },
  {
    id: '6a5e7c6c-f598-4d6f-b727-953e8c0631e7',
    userStoryId: 'e5606309-db26-44e6-b2c9-dc8ad10ed9c4',
    title: 'Implement user authentication',
    description: 'Add user authentication to the login API',
    status: 'Todo',
    assignee: 'Mike Johnson'
  },
  {
    id: 'e698cee5-09a2-4d7d-96fe-6966e1c5563a',
    userStoryId: '25b6fe76-ecf4-4ea8-b5ae-b98bcc1370ca',
    title: 'Implement user management API',
    description: 'Create API endpoints for user management',
    status: 'In Progress',
    assignee: 'Jane Smith'
  },
  {
    id: '4ee8dc90-3dd8-42ac-b0d2-512cd2155c71',
    userStoryId: '25b6fe76-ecf4-4ea8-b5ae-b98bcc1370ca',
    title: 'Create user management UI',
    description: 'Develop the user interface for managing users',
    status: 'Todo',
    assignee: 'John Doe'
  },
  {
    id: '59165c2e-13f7-4cfe-992e-6ba4c5f0ae5c',
    userStoryId: '99fda886-25c8-4b30-977e-f9619c3f11c2',
    title: 'Implement notification system',
    description: 'Create a system to manage user notifications',
    status: 'In Progress',
    assignee: 'Alice Brown'
  },
  {
    id: '223fe365-8954-4f2a-a933-7b2356ecedf1',
    userStoryId: '99fda886-25c8-4b30-977e-f9619c3f11c2',
    title: 'Design notification UI',
    description: 'Develop the user interface for notifications',
    status: 'Todo',
    assignee: 'Mike Johnson'
  },
  {
    id: 'ce03ec70-46b4-4f65-8b63-4fe1730e9b38',
    userStoryId: 'c81160ee-e3bb-44c8-89b3-f246c2d9110a',
    title: 'Design task dashboard UI',
    description: 'Create the layout and design for the task dashboard',
    status: 'Todo',
    assignee: 'Mike Johnson'
  },
  {
    id: 'd7b0f6c6-a2ea-41b6-b240-e0e8c6981cc5',
    userStoryId: 'c81160ee-e3bb-44c8-89b3-f246c2d9110a',
    title: 'Implement task dashboard functionality',
    description: 'Add functionality to display user tasks in the dashboard',
    status: 'Todo',
    assignee: 'Mike Johnson'
  },
  {
    id: 'ef17b2a3-e389-40f9-bf59-de59a622f371',
    userStoryId: '63ed2fa7-1eba-4105-b7b0-f81799fba8a5',
    title: 'Create sprint planning document',
    description: 'Outline the goals and tasks for the sprint',
    status: 'Todo',
    assignee: 'Bob Wilson'
  },
  {
    id: '23a74771-db85-4fa0-94c7-d7acb8220eed',
    userStoryId: '63ed2fa7-1eba-4105-b7b0-f81799fba8a5',
    title: 'Set up sprint board',
    description: 'Create a board to track sprint progress',
    status: 'Todo',
    assignee: 'Mike Johnson'
  },
  {
    id: 'ef9243a9-0938-4b14-b5db-3ba1de675ce0',
    userStoryId: '63ed2fa7-1eba-4105-b7b0-f81799fba8a5',
    title: 'Conduct sprint planning meeting',
    description: 'Hold a meeting to discuss sprint goals and tasks',
    status: 'Todo',
    assignee: 'Bob Wilson'
  }
]

// API
type FilterStoryPayload = {
  sprintId: string
  searchText: string
  priority: string
  assignee: string
}
export const getListSprints = () => Promise.resolve(mockSprints)

export const getListUserStories = (payload: FilterStoryPayload) =>
  Promise.resolve(
    mockUserStories.filter((userStory) => {
      return (
        userStory.sprintId === payload.sprintId &&
        userStory.title.toLowerCase().includes(payload.searchText.toLowerCase()) &&
        userStory.priority.toLowerCase().includes(payload.priority.toLowerCase()) &&
        userStory.assignee?.toLowerCase().includes(payload.assignee.toLowerCase())
      )
    })
  )

export const getListTasks = (userStoryId: string) =>
  Promise.resolve(mockTasks.filter((task) => task.userStoryId === userStoryId))
