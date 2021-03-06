import React from 'react'
import { View, Dimensions } from 'react-native'
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Toast
} from 'native-base'

import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import { Toggle, Value } from 'react-powerplug'

import { queryFn, signUpFn } from '../graphql/login'

//console.log('AllGraphql', AllGraphql)

const AdoptContainer = adopt({
  queryFn,
  signUpFn
})

class SignUp extends React.PureComponent {
  state = {
    account: '',
    password: '',
    nickname: ''
  }

  accountInput = e => {
    console.log(e.nativeEvent.text)
    this.setState({
      account: e.nativeEvent.text
    })
  }

  passwordInput = e => {
    console.log(e.nativeEvent.text)
    this.setState({
      password: e.nativeEvent.text
    })
  }

  nicknameInput = e => {
    console.log(e.nativeEvent.text)
    this.setState({
      nickname: e.nativeEvent.text
    })
  }

  signUp = signUpFn => async () => {
    console.log('test')
    console.log('signUpFn', signUpFn)
    // console.log(this.state.account, this.state.password, this.state.nickname)
    // await
    signUpFn.mutation({
      variables: {
        email: this.state.account,
        password: this.state.password,
        nickname: this.state.nickname
      }
    })
    console.log('gogo')
  }
  showToast = () => {
    Toast.show({
      text: 'Wrong password!',
      buttonText: 'Okay',
      position: 'bottom'
    })
  }

  render() {
    return (
      <AdoptContainer>
        {({ signUpFn, queryFn }) => {
          const {
            result: { error, data, loading }
          } = signUpFn
          if (loading) {
            return <Text>loading</Text>
          }
          let ShowToast: any = {}
          if (error) {
            return <Text>{error.message}</Text>
            // ShowToast = Toast.show({
            //   text: error.message, buttonText: "Okay", duration: 3000
            // })
          }
          if (data) {
            // ShowToast = Toast.show({
            //   text: "SignUp Success", buttonText: "Okay", duration: 3000
            // })
            return <Text>SignUp Success</Text>
          }
          console.log('signUpss', signUpFn)

          return (
            <Container>
              <Content>
                <Item
                  style={{ marginTop: Dimensions.get('window').height * 0.1 }}
                >
                  <Input
                    placeholder="email"
                    value={this.state.account}
                    onChange={this.accountInput}
                  />
                </Item>
                <Item style={{}}>
                  <Input
                    placeholder="password"
                    secureTextEntry
                    value={this.state.password}
                    onChange={this.passwordInput}
                  />
                </Item>
                <Item style={{}}>
                  <Input
                    placeholder="nickname"
                    value={this.state.nickname}
                    onChange={this.nicknameInput}
                  />
                </Item>
                <Button
                  onPress={this.signUp(signUpFn)}
                  full
                  style={{ marginTop: 40 }}
                >
                  <Text>SignUp</Text>
                </Button>
              </Content>
            </Container>
          )
        }}
      </AdoptContainer>
    )
  }
}
export default SignUp
