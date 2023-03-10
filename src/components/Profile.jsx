import { Component } from "react";
import { Container } from "react-bootstrap";
import Details from "./Details";

class Profile extends Component {
  render() {
    return (
      <Container>
        <h2 className="text-white mt-5 display-4">Edit Profile</h2>
        <hr className="line" />
        <Details />
      </Container>
    );
  }
}

export default Profile;
