import React, {useState, useEffect} from 'react'
import { auth, db } from "../firebase"
import { useSelector } from "react-redux"
import {  selectEmail, selectDisplayName, selectProfileURL } from "../features/userSlice"
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input'
import "./UserProfile.css"

const UserProfile = () => {
  const userEmail = useSelector(selectEmail);
  const userDisplayName = useSelector(selectDisplayName);
  const userProfileURL = useSelector(selectProfileURL);
  const [phoneNum, setPhoneNum] = useState("");
  const [hobby, setHobby] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    var docRef = db.collection("user").doc(user.uid);

    docRef.get().then((doc) => {
      if(doc.exists) {
        setUserData(doc.data());
      } else {
        docRef.set({
          name: userDisplayName,
          email: userEmail,
          phoneNum: "",
          hobby: "",
          photoUrl: userProfileURL || "",
    
        }).then(() => {
          console.log("Document successfully written!");
          setUserData(doc.data());
        
        }).catch((error) => {
          console.error("Error writing document: ", error);
        });
      }
    });
  }, [user.uid, userData, userDisplayName, userEmail, userProfileURL]);

  const addUser = (e) => {
    e.preventDefault();
    setError("");

    db.collection("user").doc(user.uid).set({
      name: userDisplayName,
      email: userEmail,
      phoneNum: (phoneNum && isValidPhoneNumber(phoneNum)) ? phoneNum : userData.phoneNum,
      hobby: hobby.length > 0 ? hobby : userData.hobby,
      photoUrl: userProfileURL || "",

    }).then(() => {
      console.log("Document successfully written!");
    
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });

    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );

    setPhoneNum(undefined);
    setHobby("");
    if (phoneNum && !isValidPhoneNumber(phoneNum)) setError("Invalid Phone Number");
    if (!phoneNum && hobby.length === 0) setError("No Profile Info To Update");
  }

  return (
    <div className="profile">
      <form onSubmit={addUser}>
        <div>{error}</div>
        <input placeholder={userDisplayName} type="text" readOnly/>
        <input placeholder={userEmail} type="text" readOnly/>
        <PhoneInput onChange={setPhoneNum} value={phoneNum} placeholder="Phone Number"/>
        <input onChange={(e) => setHobby(e.target.value)} placeholder="Hobby" type="text"/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default UserProfile
