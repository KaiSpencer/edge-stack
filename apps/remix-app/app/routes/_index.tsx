import { API } from "@full-stack-cloudflare/api";
import { json, type MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const ping = await API["v1.0"].$get();
  return json(await ping.json());
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix!</h1>
      <p>API Ping: {loaderData.message}</p>
    </div>
  );
}
