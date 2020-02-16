import React from "react";
import { useForm, useField } from "react-form";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const JOIN_EVENT = gql`
  {
    mutation JoinEvent($user: User, $eventID: String!) {
        joinEvent(user: $user, eventID: $eventID)
    }
  }
`;

function FirstNameField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("firstName", {});

  return (
    <>
      <input {...getInputProps()} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
}
function LastNameField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("lastName", {});

  return (
    <>
      <input {...getInputProps()} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
}

function PhoneField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("phone", {});

  return (
    <>
      <input {...getInputProps()} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
}

function EmailField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("email", {});

  return (
    <>
      <input {...getInputProps()} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
}
const AttendEventForm = props => {
  const [joinEvent, { data }] = useMutation(JOIN_EVENT);
  const {
    Form,
    meta: { isSubmitting, canSubmit },
  } = useForm({
    onSubmit: async (values, instance) => {
      // onSubmit (and everything else in React Form)
      // has async support out-of-the-box
      //
      let user = {
        first_name: values.firstName,
        last_name: values.lastName,
        phone_number: values.phone,
        email: values.email,
      };
      joinEvent({ variables: { user, eventID: "5e48a2f02ab28d0017be4301" } });
    },
    debugForm: true,
  });

  return (
    <Form>
      <div>
        <label>
          FirstName: <FirstNameField />
        </label>
      </div>
      <div>
        <label>
          LastName: <LastNameField />
        </label>
      </div>
      <div>
        <label>
          Phone: <PhoneField />
        </label>
      </div>

      <div>
        <label>
          Email: <EmailField />
        </label>
      </div>

      <div>
        <button type="submit" disabled={!canSubmit}>
          Submit
        </button>
      </div>

      <div>
        <em>{isSubmitting ? "Submitting..." : null}</em>
      </div>
    </Form>
  );
};
export default AttendEventForm;
