import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import db, { CONTACTS_DATABASE_ID } from "../../db";
import { useParams } from "react-router-dom";
import Button from "../../components/button/Button";

const Details = () => {
  const [contact, setContact] = useState();
  const [isEditMode, setIdEditMode] = useState(false);
  const { id } = useParams();

  const handleNameInput = (event) => {
    setContact({
      ...contact,
      name: event.target.value,
    });
  };
  const handleLastNameInput = (event) => {
    setContact({
      ...contact,
      lastName: event.target.value,
    });
  };
  const handleEmailInput = (event) => {
    setContact({
      ...contact,
      eMail: event.target.value,
    });
  };
  const handleAgeInput = (event) => {
    setContact({
      ...contact,
      age: event.target.value,
    });
  };
  const getContact = async () => {
    const docRef = doc(db, CONTACTS_DATABASE_ID, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Contact", docSnap.data());
      setContact(docSnap.data());
    } else {
      console.log("No document with id", id, "found");
    }
  };
  const handleEditContact = () => {
    console.log("Edit contact");
    setIdEditMode(true);
  };
  const handleSubmit = async () => {
    const docRef = doc(db, CONTACTS_DATABASE_ID, id);
    await updateDoc(docRef, contact);
    setIdEditMode(false);
    getContact();
  };
  useEffect(() => {
    getContact();
  }, []);
  return (
    <div>
      <Button onClick={handleEditContact}>Edit</Button>
      <h6>Contact Details:</h6>
      <>
        {!isEditMode && contact && (
          <div>
            <p>Name: {contact.name}</p>
            <p>Last name: {contact.lastName}</p>
            <p>E-mail: {contact.eMail}</p>
            <p>Age: {contact.age}</p>
          </div>
        )}
      </>
      {isEditMode && contact && (
        <div className="modal">
          <h2>Contact Form</h2>
          <label>
            First Name
            <input
              type="text"
              name="name"
              value={contact.name}
              onChange={handleNameInput}
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              name="lastName"
              value={contact.lastName}
              onChange={handleLastNameInput}
            />
          </label>
          <label>
            Email
            <input
              type="text"
              name="eMail"
              value={contact.eMail}
              onChange={handleEmailInput}
            />
          </label>
          <label>
            Age
            <input
              type="number"
              name="age"
              value={contact.age}
              onChange={handleAgeInput}
            />
          </label>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      )}
    </div>
  );
};
export default Details;
