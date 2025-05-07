import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { z } from "zod";
import todoLogo from "../assets/todolist.png";
import { trpc } from "../lib/trpc";
import { useNavigate } from "@tanstack/react-router";
import { useUserStore } from "../hooks/userStore/useUserStore";
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

function SignIn() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
  });

  const createUserMutation = trpc.auth.login.useMutation({
    onMutate: async (newUser) => {
      console.log("onMutate", newUser);
    },
    onSuccess: (data) => {
      console.log("onSuccess", data);
      setUser(data.user);
      navigate({ to: "/auth" });
    },
  });
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      const data = createUserMutation.mutate({
        email: value.email,
        password: value.password,
      });
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
          Sign in to your account
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
                        type="password"
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
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            )}
          />
        </form>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?
          <a
            onClick={() => {
              navigate({ to: "/register" });
            }}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Create a new account
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
