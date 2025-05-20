import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_teamLead/admin/addOne')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_teamLead/admin/addOne"!</div>
}
