/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// _____________________________
// OLD... Apollo V1.X
// _____________________________

// import { ApolloProvider } from 'react-apollo';
// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import ApolloClient, { createNetworkInterface } from 'apollo-client';

// const client = new ApolloClient({
//   networkInterface: createNetworkInterface({ uri: 'http://localhost:8080/graphql' }),
// });

// const store = createStore(
//   combineReducers({
//     apollo: client.reducer(),
//   }),
//   {}, // initial state
//   composeWithDevTools(
//     applyMiddleware(client.middleware()),
//   ),
// );

/**
 * And below....
 * <ApolloProvider store={store} client={client}>
 */

// _____________________________
// NEW... Apollo V2
// _____________________________

import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
// import gql from 'graphql-tag';
import { ApolloProvider, graphql } from 'react-apollo';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:8080/graphql' }),
  cache: new InMemoryCache().restore({}), // replaces the internal redux store
});

// example logger from migration docs
const logger = new ApolloLink((operation, forward) => {
  console.log(operation.operationName);
  return forward(operation).map((result) => {
    console.log(`received result from ${operation.operationName}`);
    return result;
  })
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit App.js
          </Text>
          <Text style={styles.instructions}>
            {instructions}
          </Text>
        </View>
      </ApolloProvider>
    );
  }
};
