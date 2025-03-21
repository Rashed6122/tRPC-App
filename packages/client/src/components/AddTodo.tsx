import { trpc } from "../lib/trpc"
import  useStore  from "../store/useTodoStore"

export default function AddTodo() {
  const {title, setTitle} = useStore()
  const addTodoMutation = trpc.todo.create.useMutation()
  const trpcContext = trpc.useUtils() 

  return (
    <div className='flex justify-between space-x-4'>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        type='text'
        placeholder='write your task...'
        className='flex-grow rounded-md'
      />
      <button className='bg-blue-500 hover:bg-blue-600 active:bg-blue-500 text-white py-1 px-3 rounded-md'
      onClick={()=> {
        addTodoMutation.mutate({title: title},
          {onSuccess: ()=>{
            trpcContext.todo.allTodos.invalidate()
            setTitle('')
          }}
        )
      }}>
        Add todo
      </button>
    </div>
  )
}
