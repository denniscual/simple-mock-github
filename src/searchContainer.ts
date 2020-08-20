import { createContainer } from "restatum";

export enum FilterTodos {
  ALL = "ALL",
  COMPLETED = "COMPLETED",
  NOT_COMPLETED = "NOT_COMPLETED",
}

export default createContainer({
  search: {
    initialState: "",
  },
  filterTodos: {
    initialState: FilterTodos.ALL,
  },
});
