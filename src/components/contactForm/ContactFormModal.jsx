import { useState } from "react";
import "./modal.css";
import Button from "../button/Button";
import { collection, addDoc } from "firebase/firestore";
import db, { CONTACTS_DATABASE_ID } from "../../db";
const Modal = ({ open, onCloseModal }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const handleNameInput = (event) => {
    setName(event.target.value);
  };
  const handleLastNameInput = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };
  const handleAgeInput = (event) => {
    setAge(event.target.value);
  };
  const handleSubmit = async () => {
    const newContact = {
      name,
      lastName,
      eMail: email,
      age: age,
    };
    const collectionRef = collection(db, CONTACTS_DATABASE_ID);
    await addDoc(collectionRef, newContact);
    onCloseModal();
  };
  return open ? (
    <div className="container">
      <div className="modal">
        <h2>Contact Form</h2>
        <label>
          First Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleNameInput}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleLastNameInput}
          />
        </label>
        <label>
          Email
          <input
            type="text"
            name="eMail"
            value={email}
            onChange={handleEmailInput}
          />
        </label>
        <label>
          Age
          <input
            type="number"
            name="age"
            value={age}
            onChange={handleAgeInput}
          />
        </label>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  ) : null;
};
export default Modal;
