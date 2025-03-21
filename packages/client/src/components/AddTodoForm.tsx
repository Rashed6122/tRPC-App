import { trpc } from "../lib/trpc"
import { useForm } from '@tanstack/react-form'
import type { AnyFieldApi } from '@tanstack/react-form'


function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
      <>
        {field.state.meta.isTouched && field.state.meta.errors.length ? (
          <em>{field.state.meta.errors.join(', ')}</em>
        ) : null}
        {field.state.meta.isValidating ? 'Validating...' : null}
      </>
    )
  }

export default function AddTodoForm() {
    const addTodoMutation = trpc.todo.create.useMutation()
    const trpcContext = trpc.useUtils() 

    const form = useForm({
      defaultValues: {
        Todo: '',
      },
      onSubmit: async ({ value }) => {
        addTodoMutation.mutate({title: value.Todo},
          {onSuccess: ()=>{
            trpcContext.todo.allTodos.invalidate()
            form.reset();
          }}
        )
      },
    })

    return (
      <div className="grid gap-y-4 max-w-xl mx-auto justify-items-center">
        <h1>Add new Task to your todo list </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <div>
            <form.Field
              name="Todo"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'Task is required'
                      : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 500))
                  return (
                    value.includes('error') && 'No "error" allowed in first name'
                  )
                },
              }}
              children={(field) => {
                return (
                  <>
                    <label htmlFor={field.name}>Task: </label>
                    <input className='flex-grow rounded-md mb-6 max-w-xl'
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </>
                )
              }}
            />
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button type="submit" disabled={!canSubmit} className="bg-blue-500 hover:bg-blue-600 active:bg-blue-500 text-white py-1 px-3 rounded-md" >
                {isSubmitting ? '...' : 'Submit'}
              </button>
            )}
          />
        </form>
      </div>
    )


//   return (
//     <div className='flex justify-between space-x-4'>
//       <input
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//         type='text'
//         placeholder='Get milk...'
//         className='flex-grow rounded-md'
//       />
//       <button className='bg-blue-500 hover:bg-blue-600 active:bg-blue-500 text-white py-1 px-3 rounded-md'
//       onClick={()=> {
//         addTodoMutation.mutate({title: title},
//           {onSuccess: ()=>{
//             trpcContext.todo.allTodos.invalidate()
//             setTitle('')
//           }}
//         )
//       }}>
//         Add todo
//       </button>
//     </div>
//   )
}
