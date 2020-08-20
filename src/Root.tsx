import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useRouteMatch,
} from "react-router-dom";
import { HomePage, UserPage, TodosPage } from "./pages";
import searchContainer from "./searchContainer";

// TODO
// - review
// - inside the TodosPage, we need change the button filter to checkboxes
//   then create a filter against these Selected options.
// - integrate the React.Suspense CM and the beta react-router.

function UserAndTodosPageRoutes() {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <searchContainer.StoresProvider>
        <Route exact path={`${path}/:id`}>
          <UserPage />
        </Route>
        <Route exact path={`${path}/:id/todos`}>
          <TodosPage />
        </Route>
      </searchContainer.StoresProvider>
    </Switch>
  );
}

function App() {
  return (
    <div className="App">
      <header>
        <NavLink to="/">Home page</NavLink>
      </header>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/users">
          <UserAndTodosPageRoutes />
        </Route>
      </Switch>
    </div>
  );
}

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}
