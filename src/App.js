import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Statistics from "./components/Statistics";
import ThemeToggler from "./components/ThemeToggler";
import { HomePage, QuizPage, ErrorPage } from "./pages";

function App() {
  return (
    <Router>
      <ThemeToggler />
      <Statistics />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/quiz">
          <QuizPage />
        </Route>
        <Route path="/*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
