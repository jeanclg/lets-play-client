import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../routeComponents/Home";
import AuthRouter from "../routeComponents/auth/AuthRouter";
import HomeList from "../routeComponents/HomeList";
import UserDetails from "../routeComponents/UserDetails";
import Navbar from "./Navbar";
import Messages from "./Messages";
import Forum from "../routeComponents/Forum";
import About from "./About";
import PrivateRoute from "../routeComponents/auth/PrivateRoute";

import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={AuthRouter} />
          <PrivateRoute exact path="/home" component={HomeList} />
          <PrivateRoute exact path="/user/:id" component={UserDetails} />
          <PrivateRoute exact path="/messages/:id" component={Messages} />
          <PrivateRoute exact path="/forum" component={Forum} />
          <PrivateRoute exact path="/about" component={About} />
        </Switch>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
