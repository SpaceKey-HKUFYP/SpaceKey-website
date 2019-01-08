import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Divider } from 'semantic-ui-react'
import NavigationBar from './NavigationBar'

const LoginForm = () => (
  <div className='login-form'>
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    // <style>{`
    //   body > div,
    //   body > div > div,
    //   body > div > div > div.login-form {
    //     height: 100%;
    //   }
    // `}</style>
    <Segment
        textAlign='center'
        style={{ padding: '1em 0em' }}
        vertical
        inverted>
        <NavigationBar />
    </Segment>

    <Divider hidden />
    <Divider hidden />
    <Divider hidden />

    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/images/logo.png' /> Sign up
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Re-enter password'
              type='password'
            />

            <Button color='teal' fluid size='large'>
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message>
          Have an account? <a href='#'>Log in</a>
        </Message>
      </Grid.Column>
    </Grid>

    <Divider hidden />
    <Divider hidden />
    <Divider hidden />
  </div>
)

export default LoginForm
