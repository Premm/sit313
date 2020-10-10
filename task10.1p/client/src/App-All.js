import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import C from "classnames";
import faker from "faker";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

import myImage from "./img/heroImage.jpg";

/*
####################################################
CSS I ADDED - I used bootrstrap for the rest.
####################################################

@font-face {
  font-family: "Roboto";
  src: url("./fonts/Roboto-Regular.ttf");
}

.hero-image {
  max-height: 400px;
}

html,
body {
  font-family: "Roboto", Arial, Helvetica, sans-serif;
}

*/

const variantMapper = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  danger: "btn-danger",
};

const sizeMapper = {
  sm: "btn-sm",
  lg: "btn-lg",
};

const Button = (props) => {
  return (
    <button
      className={C(
        "btn",
        props.variant && variantMapper[props.variant],
        props.size && sizeMapper[props.size],
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
};

const FeaturedUser = (props) => {
  return (
    <div className={C("d-flex", "col-6", "col-lg-3", "col-md-4")}>
      <div className={C("card", "mb-2")}>
        <div className={C("card-image")}>
          <img src={props.imageUri} width="100%" alt={props.alt} />
        </div>
        <div className={C("card-body")}>
          <h3>{props.name}</h3>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
};

FeaturedUser.propTypes = {
  className: PropTypes.string,
  imageUri: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
};

const FeaturedUserContainer = (props) => {
  return (
    <div className={C("d-flex flex-row flex-wrap py-2", props.className)}>
      {props.children}
    </div>
  );
};

const HeroImage = (props) => {
  return (
    <div
      className={C(
        "hero-image",
        "d-flex",
        "align-items-center",
        "justify-content-center",
        "overflow-hidden"
      )}
    >
      <img src={props.uri} alt={props.alt} />
    </div>
  );
};
HeroImage.propTypes = {
  className: PropTypes.string,
  uri: PropTypes.string,
  alt: PropTypes.string,
};

const Input = (props) => {
  return (
    <input
      className={C(props.className, "form-control")}
      name={props.name}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
    ></input>
  );
};
Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const bgMapper = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  light: "bg-light",
  dark: "bg-dark",
};

const Nav = (props) => {
  return (
    <div className={C(props.bg && bgMapper[props.bg])}>
      <nav
        className={C(
          "nav d-flex justify-content-between container",
          props.className
        )}
      >
        {props.children}
      </nav>
    </div>
  );
};

Nav.propTypes = {
  className: PropTypes.string,
  bg: PropTypes.string,
};

const NavBar = (props) => {
  return <div className={C("navbar")}>{props.children}</div>;
};

NavBar.propTypes = {
  className: PropTypes.string,
};

const NavBrand = (props) => {
  return <div className={C(props.className)}>{props.children}</div>;
};

NavBrand.propTypes = {
  className: PropTypes.string,
};

const NavItem = (props) => {
  return <div className={C("nav-item", props.className)}>{props.children}</div>;
};

NavItem.propTypes = {
  className: PropTypes.string,
};

const NavLink = (props) => {
  return (
    <Link className={C("nav-link", props.className)} to={props.to}>
      {props.children}
    </Link>
  );
};

NavLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
};

const SectionHeading = (props) => {
  return (
    <div className={"d-flex justify-content-center py-4"}>
      <h2>{props.children}</h2>
    </div>
  );
};

function App() {
  const [requesters, setRequesters] = useState([]);

  useEffect(() => {
    // replace this code with loading through API.
    // generate some dummy data for now.
    const tempRequesters = [];
    for (let i = 0; i < 8; ++i) {
      const requester = {};
      requester.id = uuidv4();
      requester.name = faker.name.findName();
      requester.logo = faker.image.avatar();
      requester.description = faker.lorem.paragraph();
      tempRequesters.push(requester);
    }

    setRequesters(tempRequesters);
  }, []);

  return (
    <>
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

      <section>
        <HeroImage uri={myImage} alt="Hero Image"></HeroImage>
      </section>

      <section>
        <div className="container">
          <SectionHeading>Featured Users</SectionHeading>
          <div className="row">
            <FeaturedUserContainer>
              {requesters.map((req) => (
                <FeaturedUser
                  key={req.id}
                  imageUri={req.logo}
                  alt={"requester logo"}
                  name={req.name}
                  description={req.description}
                />
              ))}
            </FeaturedUserContainer>
          </div>
        </div>
      </section>
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
                      variant={"primary"}
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
    </>
  );
}

export default App;
