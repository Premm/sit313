import React, { useEffect, useState } from "react";
import faker from "faker";
import "./App.css";
import Nav from "./components/Nav";
import NavBar from "./components/NavBar";
import NavBrand from "./components/NavBrand";
import NavItem from "./components/NavItem";
import NavLink from "./components/NavLink";
import Button from "./components/Button";
import HeroImage from "./components/HeroImage";
import FeaturedUserContainer from "./components/FeaturedUserContainer";
import FeaturedUser from "./components/FeaturedUser";
import SectionHeading from "./components/SectionHeading";
import Input from "./components/Input";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import myImage from "./img/heroImage.jpg";

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
      requester.logo = faker.image.nature();
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
