import { createFileRoute } from '@tanstack/react-router'
import ListTodos from '../components/ListTodos'
import AddTodo from '../components/AddTodo'

export const Route: any = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className='grid gap-y-4'>
      <ListTodos/>
      <AddTodo/>
    </div>
  )
}
