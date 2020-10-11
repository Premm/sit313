import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/base/Nav";
import { NavBar } from "./components/base/NavBar";
import { NavBrand } from "./components/base/NavBrand";
import { NavItem } from "./components/base/NavItem";
import { NavLink } from "./components/base/NavLink";
import { Button } from "./components/base/Button";
import { Input } from "./components/base/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Home } from "./components/pages/home";
import { NewTask } from "./components/pages/tasks/new";
import { Task } from "./components/pages/tasks/task";
import { Tasks } from "./components/pages/tasks/tasks";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Nav bg="light">
        <NavBar>
          <NavBrand>
            <h3>ICrowdTasker</h3>
          </NavBrand>
        </NavBar>
        <NavBar>
          <NavItem>
            <NavLink to="#">How It Works</NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="#">Requesters</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="#">Workers</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="#">Pricing</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="#">About</NavLink>
          </NavItem>
        </NavBar>
        <NavBar>
          <Button variant="primary">Login</Button>
        </NavBar>
      </Nav>

      {/* Content */}
      <section className="flex-grow-1 d-flex flex-column align-items-center  mb-5">
        <Switch>
          <Route path="/tasks/new">
            <NewTask />
          </Route>
          <Route path="/tasks/:taskId">
            <Task />
          </Route>
          <Route path="/tasks">
            <Tasks />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </section>
      {/* End Content */}

      <footer>
        <Nav bg="light">
          <NavBar>
            <NavItem>
              <h4>Newsletter</h4>
            </NavItem>
            <NavItem>
              <form>
                <div className="input-group px-2 d-flex flex-row">
                  <Input
                    name="email"
                    onChange={() => console.log("control value here")}
                  />
                  <div className="input-group-append">
                    <Button
                      variant={"secondary"}
                      onClick={(e) => e.preventDefault()}
                    >
                      Subscribe
                    </Button>
                  </div>
                </div>
              </form>
            </NavItem>
          </NavBar>
          <NavBar>
            <NavItem>
              <h4>Connect</h4>
            </NavItem>
            <NavItem>
              <NavLink to="#">
                <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="#">
                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="#">
                <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
              </NavLink>
            </NavItem>
          </NavBar>
        </Nav>
      </footer>
    </div>
  );
}

export default App;
