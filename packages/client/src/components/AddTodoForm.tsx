import { trpc } from "../lib/trpc";
import { useForm, AnyFieldApi } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import useCreateTodo from "../hooks/todos/useCreateTodo";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className="block text-sm/6 font-medium text-red-700">
          {field.state.meta.errors.map((err) => err.message).join(",")}
        </em>
      ) : null}
    </>
  );
}

export default function AddTodoForm() {
  const addTodoMutation = useCreateTodo();
  const categories = trpc.category.getAll.useQuery();
  const trpcContext = trpc.useUtils();
  const navigate = useNavigate();

  const schema = z.object({
    Todo: z.string().min(3, { message: "Title must be at least 3" }),
    subTask: z.array(
      z.object({
        item: z.string().min(3, { message: "Task must be at least 3" }),
      }),
    ),
    category: z.string(),
    pinned: z.boolean(),
  });

  const form = useForm({
    defaultValues: {
      Todo: "",
      subTask: [{ item: "" }],
      category: "",
      pinned: false,
    },
    validators: {
      onChange: schema,
    },

    onSubmit: async ({ value }) => {
      addTodoMutation.mutate(
        {
          title: value.Todo,
          subTasks: value.subTask,
          pinned: value.pinned,
          categoryId: value.category,
        },
        {
          onSuccess: () => {
            navigate({ to: "/" });
          },
        },
      );
      console.log(value);
    },
  });

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Add new Task to your Todo list{" "}
        </h1>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
            <form.Field
              name="category"
              children={(field) => {
                return (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Category:
                    </label>
                    <select
                      id="categories"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Choose a Category</option>
                      {categories.data?.map((category) => {
                        return (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        );
                      })}
                    </select>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="Todo"
              children={(field) => {
                return (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Title:
                    </label>
                    <div className="mt-2">
                      <input
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                    <FieldInfo field={field} />
                  </div>
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
                        <form.Field key={i} name={`subTask[${i}].item`}>
                          {(subField) => {
                            return (
                              <div>
                                <label className="block text-sm/6 font-medium text-gray-900">
                                  Task {i + 1}:
                                </label>
                                <div className="flex justify-between items-center space-x-2">
                                  <input
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    value={subField.state.value}
                                    onChange={(e) =>
                                      subField.handleChange(e.target.value)
                                    }
                                  />
                                  <button
                                    onClick={() => {
                                      field.removeValue(i);
                                    }}
                                    className="text-red-500 hover:text-white hover:bg-red-500 p-1 rounded"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 "
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                      />
                                    </svg>
                                  </button>
                                </div>
                                <FieldInfo field={subField} />
                              </div>
                            );
                          }}
                        </form.Field>
                      </>
                    );
                  })}
                  <button
                    className="bg-green-500 hover:bg-green-600 active:bg-green-500 text-white py-1 px-3 rounded-md mt-4"
                    onClick={() => field.pushValue({ item: "" })}
                    type="button"
                  >
                    Add Task
                  </button>
                </div>
              );
            }}
          </form.Field>
          <div>
            <form.Field
              name="pinned"
              children={(field) => {
                return (
                  <div>
                    <div className="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        checked={field.state.value}
                        onChange={(e) => field.handleChange(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      ></input>
                      <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Pin this task
                      </label>
                    </div>
                  </div>
                );
              }}
            />
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSubmitting ? "..." : "Submit"}
              </button>
            )}
          />
        </form>
      </div>
    </div>
  );
}
