type Sprint = {
  id: string
  name: string
  startDate: string
  endDate: string
  status: 'Planning' | 'Active' | 'Completed',
  userStories?: UserStory[]
  lengthUserStories: number
}

type UserStory = {
  id: string
  title: string
  description: string
  storyPoints: number
  priority: 'High' | 'Medium' | 'Low'
  status: 'Todo' | 'In Progress' | 'Done'
  assignee?: string
  tags?: string[]
  tasks?: Task[]
  lengthTasks: number
}

type Task = {
  id: string
  title: string
  description: string
  status: 'Todo' | 'In Progress' | 'Done'
  assignee: string
}


type FilterOptions = {
  priority?: 'High' | 'Medium' | 'Low'
  assignee?: string
  searchText?: string
}


type DataContext = { 
  sprints: Sprint[]
  filterOptions: FilterOptions
}
type ModalContext = {
  showModal: 'edit' | 'add' | 'hide'
  userStory?: UserStory
}

/**
 * Usage context:
 */

// <DataContext>
//  <DataDispatch>
//   {children}
//  <ModalContext>
//    <ModalDispatch>
//      {children}
//    </ModalDispatch>
//  </ModalContext>
//  </DataDispatch>
// </DataContext>

