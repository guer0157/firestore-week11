import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import db, { CONTACTS_DATABASE_ID } from "../../db";
import { useParams } from "react-router-dom";

const Details = () => {
  const [contact, setContact] = useState();
  const { id } = useParams();
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
  useEffect(() => {
    getContact();
  }, []);
  return (
    <div>
      <h6>Contact Details:</h6>
      {contact && (
        <div>
          <p>Name: {contact.name}</p>
          <p>Last name: {contact.lastName}</p>
          <p>E-mail: {contact.eMail}</p>
          <p>Age: {contact.age}</p>
        </div>
      )}
    </div>
  );
};
export default Details;
