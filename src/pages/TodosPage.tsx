import React from "react";
import { rootFetch, Todos, fetchUser } from "../utils";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import matchSorter from "match-sorter";
import { useStoreState } from "restatum";
import searchContainer, { FilterTodos } from "../searchContainer";

async function fetchTodos(_: string, userId: number) {
  if (!Boolean(userId) || typeof userId !== "number") {
    throw new Error(
      `Invalid type for "userId". It expects number type but received type of ${typeof userId}`
    );
  }
  return (await rootFetch(
    `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
  )) as Todos;
}

function FilterableTodoList({ todos }: { todos: Todos }) {
  const [search, setSearch] = useStoreState(searchContainer.search);
  const [filterTodos, setFilterTodos] = useStoreState(
    searchContainer.filterTodos
  );

  const filteredTodos = matchSorter(todos, search, { keys: ["title"] }).filter(
    (todo) => {
      if (filterTodos === FilterTodos.COMPLETED) {
        return todo.completed;
      }
      if (filterTodos === FilterTodos.NOT_COMPLETED) {
        return !todo.completed;
      }
      return todo;
    }
  );

  return (
    <section>
      <header>
        <input
          type="text"
          placeholder="Search todo"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div>
          <button onClick={() => setFilterTodos(FilterTodos.ALL)}>All</button>
          <button onClick={() => setFilterTodos(FilterTodos.COMPLETED)}>
            Completed
          </button>
          <button onClick={() => setFilterTodos(FilterTodos.NOT_COMPLETED)}>
            Not completed
          </button>
        </div>
      </header>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </section>
  );
}

export default function TodosPage() {
  let { id } = useParams<{ id: string }>();
  const userId = parseInt(id);
  const userQuery = useQuery(["user", userId], fetchUser);
  const todosQuery = useQuery(["todos", userId], fetchTodos);

  if (userQuery.isLoading) {
    return <div>Loading user...</div>;
  }

  if (!userQuery.data) {
    return <div>No found user</div>;
  }

  function renderTodoList() {
    if (todosQuery.isLoading) {
      return <div>Loading todos...</div>;
    }

    if (todosQuery.isError) {
      return (
        <span>Todos query error: {(todosQuery.error as Error).message}</span>
      );
    }

    return !todosQuery.data ? (
      <div>No found todos</div>
    ) : (
      <FilterableTodoList todos={todosQuery.data} />
    );
  }

  return (
    <div>
      <header>
        <h3>
          Hi! My name is{" "}
          <Link to={`/users/${userQuery.data.id}`}>{userQuery.data.name}</Link>
        </h3>
      </header>
      {renderTodoList()}
    </div>
  );
}
