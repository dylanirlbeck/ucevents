import React from "react";
import "./App.css";
import Layout from "./Layout.js";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "https://campus-outlook.herokuapp.com",
});

client
  .query({
    query: gql`
      {
        events {
          name
          description
        }
      }
    `,
  })
  .then(result => console.log(result));

const App = () => (
  <ApolloProvider client={client}>
    <Layout />
  </ApolloProvider>
);

export default App;
