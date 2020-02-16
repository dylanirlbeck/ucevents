import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Modal from "react-modal";
import Event from "./EventCard";
import Navigation from "./Navigation";
import EventModal from "./EventModal";
import Tag from "./FilterTag";

// // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const ALL_EVENTS = gql`
  {
    events {
      name
      tags
      description
      time {
        start
        end
      }
    }
  }
`;

const ALL_TAGS = gql`
  {
    tags
  }
`;

const Layout = () => {
  const { loading, error, data } = useQuery(ALL_EVENTS);
  const tagObj = useQuery(ALL_TAGS);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // IDK what this does
    //    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // TODO: render a loading icon
  if (loading || tagObj.loading) return <p>Loading...</p>;
  // TODO: render something better
  if (error || tagObj.error) return <p>Error :(</p>;

  return (
    <div className="content-center justify-center">
      <Navigation />
      <div className="container flex">
        <div className="px-20 mx-4 my-3 grid grid-cols-3 gap-4 row-gap-4">
          {data.events.map(({ name, tags }) => (
            <Event name={name} tags={tags} onClick={_ => setIsOpen(true)} />
          ))}
        </div>
        <div className="fixed absolute right-0 w-64">
          <ul className="fixed flex flex-col">
            {tagObj.data.tags.map((tag, idx) => {
              return <Tag key={idx} name={tag} />;
            })}
          </ul>
        </div>
      </div>
      <EventModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};

export default Layout;
