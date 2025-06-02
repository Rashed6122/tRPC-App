import { useState } from "react";
import { IoIosOptions } from "react-icons/io";
import {
  useCreateCategory,
  useCreateCategoryForAll,
} from "../hooks/categories/useCreateCategory";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";

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

const ToolsDropdown = () => {
  const [open, setOpen] = useState(false);
  const { getUser } = useAuth();
  const user = getUser();
  const toggleDropdown = () => setOpen(!open);
  const createCategory = useCreateCategory();
  const createCategoryForAll = useCreateCategoryForAll();

  const schema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3" }),
    forAll: z.boolean(),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      forAll: false,
    },
    validators: {
      onChange: schema,
    },

    onSubmit: async ({ value }) => {
      form.reset();
      if (value.forAll) {
        const data = createCategoryForAll.mutate(
          {
            name: value.name,
          },
          {
            onSuccess: () => {
              setOpen(false);
            },
          }
        );
      } else {
        const data = createCategory.mutate(
          {
            name: value.name,
          },
          {
            onSuccess: () => {
              setOpen(false);
            },
          }
        );
      }
    },
  });

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center px-4 py-2 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none"
      >
        <IoIosOptions />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5">
          <div className="py-1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="flex flex-col justify-start items-center gap-3 mx-4"
            >
              <h2 className="flex justify-center text-blue-800 font-semibold">
                Add New Category
              </h2>
              <div>
                <form.Field
                  name="name"
                  children={(field) => {
                    return (
                      <div className="flex flex-col justify-start items-start gap-2">
                        <label
                          htmlFor={field.name}
                          className="text-sm font-medium text-gray-800 warm:text-brown-800 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-neutral-200"
                        >
                          Category name:
                        </label>
                        <input
                          className="flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-base shadow-sm transition-[border-color,_color,_box-shadow] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-950 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 warm:focus-visible:ring-brown-600 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:file:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 text-gray-800 warm:text-brown-800 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-100"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                      </div>
                    );
                  }}
                />
              </div>
              {user.role === "ADMIN" && (
                <div>
                  <form.Field
                    name="forAll"
                    children={(field) => {
                      return (
                        <div className="flex flex-row justify-start items-start gap-2">
                          <input
                            id={field.name}
                            type="checkbox"
                            checked={field.state.value}
                            onChange={(e) =>
                              field.handleChange(e.target.checked)
                            }
                            className="peer h-4 w-4 rounded border-gray-300 bg-gray-50 text-primary-600 focus:ring-primary-500 dark:border-neutral-600 dark:bg-neutral-700 dark:focus:ring-offset-neutral-800 dark:focus:ring-offset-neutral-700"
                            name={field.name}
                          />
                          <label
                            htmlFor={field.name}
                            className="text-xs font-medium text-gray-800 warm:text-brown-800 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-neutral-200"
                          >
                            Add this category for all users
                          </label>
                          <FieldInfo field={field} />
                        </div>
                      );
                    }}
                  />
                </div>
              )}

              <div className="flex flex-row justify-start items-center gap-3">
                <button
                  className="inline-flex items-center bg-blue-700 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-gray-300 bg-primary-500 text-gray-50 shadow hover:bg-primary-600 dark:text-neutral-200 border border-transparent h-9 px-4 py-2 dark:bg-neutral-700 dark:hover:bg-neutral-600 warm:bg-brown-700 warm:hover:bg-brown-800"
                  type="submit"
                >
                  Create
                </button>
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-gray-300 hover:bg-gray-100 warm:hover:bg-brown-100 hover:text-primary-500 warm:hover:text-brown-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:text-neutral-300 warm:text-brown-700 h-9 px-4 py-2 text-gray-800"
                  type="button"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsDropdown;
