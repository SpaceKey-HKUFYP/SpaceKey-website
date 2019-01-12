import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Rail,
  Sticky
} from "semantic-ui-react";
import NavigationBar from "./NavigationBar";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { context: null };
    this.handleNavigationBar = ref => {
      this.setState({ context: ref });
    };
  }

  render() {
    return (
      <div ref={this.handleNavigationBar} className="login-form">
        <Rail
          internal
          position="left"
          attached
          style={{ top: "auto", height: "auto", width: "100%" }}
        >
          <Sticky context={this.state.context}>
            <Segment inverted>
              <NavigationBar />
            </Segment>
          </Sticky>
        </Rail>
        <div style={{ paddingTop: "89.8167px" }}>
          <Grid
            textAlign="center"
            style={{ height: "100%", margin: "75px" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                <Image src="/images/logo.png" /> Log-in to your account
              </Header>
              <Form size="large">
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                  />

                  <Button color="teal" fluid size="large">
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <Link to="/signup">Sign Up</Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default LoginForm;
