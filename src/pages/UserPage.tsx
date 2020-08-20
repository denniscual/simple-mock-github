import React from "react";
import { fetchUser } from "../utils";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";

export default function UserPage() {
  let { id } = useParams<{ id: string }>();

  const { isLoading, isError, error, data } = useQuery(
    ["user", parseInt(id)],
    fetchUser
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data) {
    return <div>No found user</div>;
  }

  return (
    <div>
      <h4>{data.name}</h4>
      <div>
        <span>{data.username}</span>
        <span>{data.email}</span>
      </div>
      <Link to={`/users/${data.id}/todos`}>Check my todos</Link>
    </div>
  );
}
