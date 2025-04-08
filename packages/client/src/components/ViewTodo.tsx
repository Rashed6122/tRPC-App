import { trpc } from "../lib/trpc"

export default function ViewTodo(props : { id: string }) {

  const response = trpc.todo.getOne.useQuery({ id: props.id })
    return (
       <h2>{ response.data?.title }</h2> 
  )
}
