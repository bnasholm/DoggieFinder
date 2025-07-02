import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import ErrorInterceptor from "./components/errors/ErrorInterceptor";

const App = () => {
  return (
    <Router basename="/doggie-finder">
      <ErrorInterceptor />
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

const Root = () => {
  return <Navigate to="/search" />;
};

export default App;
