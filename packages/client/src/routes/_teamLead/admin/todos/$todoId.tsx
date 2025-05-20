import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_teamLead/admin/todos/$todoId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_teamLead/admin/todos/$todoId"!</div>
}
