import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import Login from './screens/Login'
import { StackNavigator, TabNavigator } from 'react-navigation'
import {Button} from 'native-base'
import Home from './screens/Home'
export interface Props { }
export interface State {
  LoginIn: Boolean,
  changeLoginStatus: Function
}

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

export const LoginStack : any = StackNavigator({
  Login: {
    screen: Login
  }
})
export const TabBarStack : any = TabNavigator({
  HomePage: {
    screen: Home
  }
})
export default class App extends React.Component<Props, State> {
  changeLoginStatus: () => void
  constructor(props: any) {
    super(props)
    this.changeLoginStatus = () => {
      this.setState(state => {
        const newLogin = !state.LoginIn
        return {
          LoginIn: newLogin
        }
      })
    }
    this.state = {
      LoginIn: false,
      changeLoginStatus: this.changeLoginStatus
    }
  }
  render() {
    if (this.state.LoginIn) {
      return <TabBarStack></TabBarStack>

    } else {
      return <LoginStack screenProps={this.state}></LoginStack>
    }

  }
}