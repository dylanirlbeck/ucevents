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
      id
      name
      tags
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
      id
      name
      tags
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
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [activeTag, setActiveTag] = React.useState(null);
  const [events, setEvents] = React.useState([]);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedEvent(null);
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
  //console.log("EVENTS" + JSON.stringify(events));
  return (
    <div className="content-center justify-center">
      <Navigation />
      <div className="container flex">
        <div className="px-20 mx-4 my-3 grid grid-cols-3 gap-4 row-gap-4">
          {events.map(({ name, id, tags }) => (
            <Event
              key={id}
              name={name}
              tags={tags}
              onClick={_ => {
                openModal();
                console.log("ONCLICKEVENT");
                setSelectedEvent(id);
              }}
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
      {modalIsOpen ? (
        <EventModal
          id={selectedEvent}
          modalIsOpen={true}
          closeModal={closeModal}
        />
      ) : (
        React.null
      )}
      }
    </div>
  );
};

export default Layout;
