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
      image_url
      time {
        start
        end
      }
    }
  }
`;

const EVENTS_BY_TAG = gql`
  query getEventsByTag($tags: [String!]) {
    eventsByTags(tags: $tags) {
      name
      tags
      description
      image_url
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
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [activeTag, setActiveTag] = React.useState(null);
  const [events, setEvents] = React.useState([]);
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

  const document = activeTag == null ? ALL_EVENTS : EVENTS_BY_TAG;
  const variablesObject =
    activeTag == null
      ? { variables: {} }
      : { variables: { tags: [activeTag] } };
  const { loading, error, data } = useQuery(document, variablesObject);
  const tagObj = useQuery(ALL_TAGS);

  // TODO: render a loading icon
  if (loading || tagObj.loading) return <p>Loading...</p>;
  // TODO: render something better
  if (error || tagObj.error) return <p>Error :(</p>;
  if (events.length == 0) {
    setEvents(data.eventsByTags ? data.eventsByTags : data.events);
  }
  return (
    <div className="content-center justify-center">
      <Navigation />
      <div className="container flex">
        <div className="px-20 mx-4 my-3 grid grid-cols-3 gap-4 row-gap-4">
          {events.map(({ name, tags, image_url }) => (
            <Event
              key={name}
              name={name}
              tags={tags}
              image={image_url}
              onClick={_ => setIsOpen(true)}
            />
          ))}
        </div>
        <div className="fixed absolute right-0 w-64">
          <ul className="fixed flex flex-col">
            {tagObj.data.tags.map((tag, idx) => {
              return (
                <Tag
                  key={idx}
                  name={tag}
                  onClick={e => {
                    e.preventDefault();
                    setActiveTag(tag);
                    setEvents([]);
                  }}
                />
              );
            })}
          </ul>
        </div>
      </div>
      <EventModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};

export default Layout;
