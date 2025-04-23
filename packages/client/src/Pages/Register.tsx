import { useForm, AnyFieldApi } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import todoLogo from "../assets/todolist.png";

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

export default function Register() {
  const navigate = useNavigate({ from: "/addOne" });

  const schema = z
    .object({
      name: z.string().min(3, { message: "Name must be at least 3" }),
      email: z.string().email({ message: "Invalid email address" }),
      age: z.number().positive({ message: "Age must be at least 1" }),
      phone: z.string().min(10, {
        message: "Phone number must be at least 10 digits",
      }),
      password: z.string().min(6, { message: "Password must be at least 6" }),
      confirmPassword: z
        .string()
        .min(6, { message: "Password must be at least 6" }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ["confirmPassword"],
        });
      }
    });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      age: 0,
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: schema,
    },

    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-12 w-auto"
          src={todoLogo}
          alt="Your Company"
        ></img>
        <h1 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Creat New Account
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
              name="name"
              children={(field) => {
                return (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Full Name:
                    </label>
                    <div className="mt-2">
                      <input
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                      />
                    </div>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="email"
              children={(field) => {
                return (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Email:
                    </label>
                    <div className="mt-2">
                      <input
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                      />
                    </div>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="age"
              children={(field) => {
                return (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Age:
                    </label>
                    <div className="mt-2">
                      <input
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        id={field.name}
                        name={field.name}
                        type="number"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(parseInt(e.target.value))
                        }
                        required
                      />
                    </div>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="phone"
              children={(field) => {
                return (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Phone Number:
                    </label>
                    <div className="mt-2">
                      <input
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                      />
                    </div>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="password"
              children={(field) => {
                return (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Password:
                    </label>
                    <div className="mt-2">
                      <input
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        id={field.name}
                        name={field.name}
                        required
                        type="password"
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
          <div>
            <form.Field
              name="confirmPassword"
              children={(field) => {
                return (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Confirm Password:
                    </label>
                    <div className="mt-2">
                      <input
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        id={field.name}
                        name={field.name}
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                      />
                    </div>
                    <FieldInfo field={field} />
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
