import React from "react";
import faker from "faker";

import { HeroImage } from "../base/HeroImage";
import { FeaturedUserContainer } from "../base/FeaturedUserContainer";
import { FeaturedUser } from "../base/FeaturedUser";
import { SectionHeading } from "../base/SectionHeading";
import { v4 as uuidv4 } from "uuid";

import myImage from "../../img/heroImage.jpg";

export const Home = (props) => {
  const [requesters, setRequesters] = React.useState([]);

  React.useEffect(() => {
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
    </>
  );
};
