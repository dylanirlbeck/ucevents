import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ALL_EVENTS = gql`
  {
    events {
      name
      description
    }
  }
`;

const Layout = () => {
  const { loading, error, data } = useQuery(ALL_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.getAllEvents.map(({ name, description }) => (
    <div key={name}>
      <span className="font-bold">{name}</span>
      <span>{description}</span>
    </div>
  ));
};

export default Layout;
