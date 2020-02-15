import React from "react";
import "./App.css";
import Layout from "./Layout.js";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://34.69.193.74/",
});

client
  .query({
    query: gql`
      {
        getAllEvents {
          name
          description
        }
      }
    `,
  })
  .then(result => console.log(result));

//import Event from "./EventCard";
/*function App() {*/
//return (
//<div className="App">
//<header className="App-header">
//<img src={logo} className="App-logo" alt="logo" />
//<p>
//Edit <code>src/App.js</code> and save to reload.
//</p>
//<a
//className="App-link"
//href="https://reactjs.org"
//target="_blank"
//rel="noopener noreferrer">
//Learn React
//</a>
//</header>
//</div>
//);
/*}*/

const App = () => (
  <ApolloProvider client={client}>
    <Layout />
  </ApolloProvider>
);

export default App;
