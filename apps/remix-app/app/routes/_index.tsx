import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
  defer,
  json,
} from "@remix-run/cloudflare";
import { Await, Form, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { API } from "~/utils/api";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const ping = await API(context).index.$get();
  if (!ping.ok) {
    throw new Error("API Ping failed");
  }

  const todosPromise = API(context).todos.$get();
  return defer({
    ping: await ping.json(),
    todos: todosPromise.then((todos) => todos.json()),
  });
};

export const action = async (args: ActionFunctionArgs) => {
  const formData = await args.request.formData();
  if (formData.get("add") === "add") {
    const name = formData.get("name");
    if (typeof name !== "string") {
      return json({ error: "Invalid name" }, { status: 400 });
    }
    await API(args.context).todos.$post({ form: { name } });
  } else if (typeof formData.get("remove") === "string") {
    const id = formData.get("remove");
    if (typeof id !== "string") {
      return json({ error: "Invalid id" }, { status: 400 });
    }
    await API(args.context).todos.$delete({ form: { id } });
  } else if (typeof formData.get("complete") === "string") {
    const id = formData.get("complete");
    if (typeof id !== "string") {
      return json({ error: "Invalid id" }, { status: 400 });
    }
    await API(args.context).todos["mark-complete"].$put({ form: { id } });
  }
  return json({ success: true });
};

export default function Index() {
  const { ping, todos } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Edge Stack's Remix App!</h1>
      <p>API Ping: {ping.message}</p>
      <h2>Todos</h2>
      <Form method="POST">
        <input id="name" name="name" type="text" placeholder="Add a new todo" />
        <button type="submit" name="add" value="add">
          Add
        </button>
        <ul>
          <Suspense fallback={<div>Loading todos...</div>}>
            <Await resolve={todos}>
              {(todos) => (
                <>
                  {todos.length === 0 && <p>No todos found</p>}
                  {todos.map((todo) => (
                    <li key={todo.id}>
                      <span>
                        {todo.name} Complete:{todo.completed ? "✅" : "❌"}{" "}
                        <button type="submit" name="remove" value={todo.id}>
                          Remove
                        </button>
                        <button type="submit" name="complete" value={todo.id}>
                          {todo.completed ? "Uncomplete" : "Complete"}
                        </button>
                      </span>
                    </li>
                  ))}
                </>
              )}
            </Await>
          </Suspense>
        </ul>
      </Form>
    </div>
  );
}
