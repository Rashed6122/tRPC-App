import { trpc } from "../lib/trpc";
import { useForm, AnyFieldApi } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.map((err) => err.message).join(",")}</em>
      ) : null}
    </>
  );
}

export default function AddTodoForm() {
  const addTodoMutation = trpc.todo.create.useMutation();
  const trpcContext = trpc.useUtils();
  const navigate = useNavigate({ from: "/addOne" });

  const schema = z.object({
    Todo: z.string().min(3, { message: "Task must be at least 3" }),
  });

  const form = useForm({
    defaultValues: {
      Todo: "",
      subTask: [{ name: "", age: 0 }],
    },
    // validators: {
    //   onChange: schema,
    // },

    onSubmit: async ({ value }) => {
      // addTodoMutation.mutate(
      //   { title: value.Todo },
      //   {
      //     onSuccess: () => {
      //       trpcContext.todo.allTodos.invalidate();
      //       navigate({ to: "/" });
      //     },
      //   }
      // );
      console.log(value);
    },
  });

  return (
    <div className="grid gap-y-4 max-w-xl mx-auto justify-items-center">
      <h1>Add new Task to your todo list </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="Todo"
            children={(field) => {
              return (
                <>
                  <label htmlFor={field.name}>Task: </label>
                  <input
                    className="flex-grow rounded-md mb-6 max-w-xl"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        <form.Field name="subTask" mode="array">
          {(field) => {
            return (
              <div>
                {field.state.value.map((_, i) => {
                  return (
                    <>
                      <form.Field key={i} name={`subTask[${i}].name`}>
                        {(subField) => {
                          return (
                            <div>
                              <label>
                                <div>Name for person {i}</div>
                                <input
                                  value={subField.state.value}
                                  onChange={(e) =>
                                    subField.handleChange(e.target.value)
                                  }
                                />
                              </label>
                            </div>
                          );
                        }}
                      </form.Field>
                      <form.Field key={i} name={`subTask[${i}].age`}>
                        {(subField) => {
                          return (
                            <div>
                              <label>
                                <div>Age for person {i}</div>
                                <input
                                  value={subField.state.value}
                                  onChange={(e) =>
                                    subField.handleChange(
                                      parseInt(e.target.value)
                                    )
                                  }
                                />
                              </label>
                            </div>
                          );
                        }}
                      </form.Field>
                    </>
                  );
                })}
                <button
                  onClick={() => field.pushValue({ name: "", age: 0 })}
                  type="button"
                >
                  Add person
                </button>
              </div>
            );
          }}
        </form.Field>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-500 text-white py-1 px-3 rounded-md"
            >
              {isSubmitting ? "..." : "Submit"}
            </button>
          )}
        />
      </form>
    </div>
  );
}
