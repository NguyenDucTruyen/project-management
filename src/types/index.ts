export interface UserStory {
  id: string;
  title: string;
  description: string;
  storyPoints: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Todo' | 'In Progress' | 'Done';
  assignee?: string;
  tags?: string[];
}

export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'Planning' | 'Active' | 'Completed';
  userStories: UserStory[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  sprints: Sprint[];
}

export type ViewMode = 'kanban' | 'list';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
