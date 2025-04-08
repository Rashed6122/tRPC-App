import { createFileRoute } from '@tanstack/react-router'
import ViewTodo from '../../components/ViewTodo'

export const Route = createFileRoute('/todos/$todoId')({
  component: todo,
})

function todo() {
  const { todoId } = Route.useParams()
  return <div>
    <ViewTodo id = {todoId}/>
  </div>
}
