import React from "react";
import { rootFetch, Users } from "../utils";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

async function fetchUsers() {
  return (await rootFetch(
    "https://jsonplaceholder.typicode.com/users"
  )) as Users;
}

export default function HomePage() {
  const { isLoading, isError, error, data } = useQuery("users", fetchUsers);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data) {
    return <div>No found users</div>;
  }

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>
          <div>
            <span>{user.username}</span>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
            <span>{user.email}</span>
            <Link to={`/users/${user.id}/todos`}>Check the todos</Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
