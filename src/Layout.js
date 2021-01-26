import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Modal from "react-modal";
import Event from "./EventCard";
import Navigation from "./Navigation";
import EventModal from "./EventModal";
import SubmitModal from "./SubmitModal";
import Tag from "./FilterTag";

// // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

//const CREAT_EVENT = gql``;

const ALL_EVENTS = gql`
  {
    events {
      id
      name
      tags
      image_url
      location
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
      image_url
      location
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
  const [submitModalIsOpen, setSubmitModalIsOpen] = React.useState(false);
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

  const closeSubmitModal = () => {
    setSubmitModalIsOpen(false);
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
  if (error || tagObj.error) return <p>Error: {error.toString()} </p>;
  if (events.length == 0) {
    setEvents(data.eventsByTags ? data.eventsByTags : data.events);
  }
  return (
    <div className="content-center justify-center">
      <Navigation onClick={_ => setSubmitModalIsOpen(true)} />
      <div className="container flex">
        <div className="px-20 mx-4 my-3 grid grid-cols-3 gap-4 row-gap-4">
          {events.map(({ name, time, id, tags, location, image_url }) => (
            <Event
              key={id}
              name={name}
              date={new Date(1000 * time.start).toDateString()}
              tags={tags}
              image={image_url}
              location={location}
              onClick={_ => {
                openModal();
                console.log("ONCLICKEVENT");
                setSelectedEvent(id);
              }}
            />
          ))}
        </div>
        <div className="fixed right-0 w-64 text-xl">
          <div className="fixed font-bold text-red-800">Tags</div>
          <div className="mt-10">
            <ul className="fixed flex flex-col">
              {tagObj.data.tags.map((tag, idx) => {
                return (
                  <Tag
                    key={idx}
                    isActive={tag == activeTag}
                    name={tag}
                    onClick={e => {
                      e.preventDefault();
                      setActiveTag(tag == activeTag ? null : tag);
                      setEvents([]);
                    }}
                  />
                );
              })}
            </ul>
          </div>
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
      {submitModalIsOpen ? (
        <SubmitModal modalIsOpen={true} closeModal={closeSubmitModal} />
      ) : (
        React.null
      )}
    </div>
  );
};

export default Layout;
