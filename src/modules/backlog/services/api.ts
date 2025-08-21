export interface Sprint {
  id: string
  name: string
  goal: string
  status: string
  startDate: string
  endDate: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  showUserStory?: boolean
}

export interface UserStory {
  id: string
  sprintId: string
  title: string
  description: string
  statusId: string
  priorityId: string
  point: number
  createdBy: string
  createdAt: string
  updatedAt: string
}

const BASE_URL = 'http://localhost:3000'

export async function fetchSprints(): Promise<Sprint[]> {
  const res = await fetch(`${BASE_URL}/sprints`)
  if (!res.ok) throw new Error('Failed to fetch sprints')
  return res.json()
}

export async function fetchUserStories(): Promise<UserStory[]> {
  const res = await fetch(`${BASE_URL}/user-stories`)
  if (!res.ok) throw new Error('Failed to fetch user stories')
  return res.json()
}

export async function createSprint(data: Partial<Sprint>): Promise<Sprint> {
  const res = await fetch(`${BASE_URL}/sprints`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to create sprint')
  return res.json()
}

export async function createUserStory(data: Partial<UserStory>): Promise<UserStory> {
  const res = await fetch(`${BASE_URL}/user-stories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to create user story')
  return res.json()
}
