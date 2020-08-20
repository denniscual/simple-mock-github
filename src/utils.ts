type FetchParams = Parameters<typeof fetch>;

export async function rootFetch(...args: FetchParams): Promise<unknown> {
  try {
    const response = await fetch(...args);
    return await response.json();
  } catch (err) {
    throw err;
  }
}

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Users = User[];

export type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

export type Todos = Todo[];

export async function fetchUser(_: string, userId: number) {
  if (!Boolean(userId) || typeof userId !== "number") {
    throw new Error(
      `Invalid type for "userId". It expects number type but received type of ${typeof userId}`
    );
  }

  return (await rootFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  )) as User;
}
