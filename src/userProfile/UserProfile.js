import React, {useState, useEffect} from 'react'
import { auth, db } from "../firebase"
import { useSelector } from "react-redux"
import {  selectEmail, selectDisplayName, selectProfileURL } from "../features/userSlice"
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input'
import "react-phone-number-input/style.css";
import ImageOne from '../assets/unlocked.jpg'
import ImageTwo from '../assets/locked.jpg'
import "./UserProfile.css"

export const profileUnsubscribers = [];

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
    let isSubscribed = true;
    const docRef = db.collection("users").doc(user.uid);

    const unsubscribe = docRef.onSnapshot((doc) => {
      if(doc.exists) {
        if (isSubscribed) {
          setUserData(doc.data());
        }
      } else {
        docRef.set({
          name: userDisplayName,
          email: userEmail,
          phoneNum: "",
          hobby: "",
          photoUrl: userProfileURL || "",
    
        }).then(() => {
          if (isSubscribed) {
            console.log("Document successfully written!");
            console.log(doc.data());
            setUserData(doc.data());
          }
        }).catch((error) => {
          console.error("Error writing document: ", error);
        });
      }
    });

    profileUnsubscribers.push(unsubscribe);

    return () => isSubscribed = false;
  }, [user.uid, userData, userDisplayName, userEmail, userProfileURL]);

  const addUser = (e) => {
    e.preventDefault();
    setError("");

    db.collection("users").doc(user.uid).set({
      name: userDisplayName,
      email: userEmail,
      phoneNum: (phoneNum && isValidPhoneNumber(phoneNum)) ? phoneNum : (userData.phoneNum ? userData.phoneNum : ""),
      hobby: hobby.length > 0 ? hobby : (userData.hobby ? userData.hobby : ""),
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
    <div className="wrapper">
      <section>
        <div className="container">
          <div className="user infoBx">
            <div className="formBx">
              <h2>Your Profile</h2>
              <div>Name: {userData.name}</div>
              <div>Email: {userData.email}</div>
              <div>Phone Number: {userData.phoneNum}</div>
              <div>Hobby: {userData.hobby}</div>
              <a href="#">Edit</a>
            </div>
            <div className="imgBx"><img src={ImageTwo} alt="locked" /></div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="user editBx">
            <div className="imgBx"><img src={ImageOne} alt="unlocked" /></div>
            <div className="formBx">
              <form onSubmit={addUser}>
                <h2>Update Profile</h2>
                <div>{error}</div>
                <input placeholder={userDisplayName} type="text" readOnly/>
                <input placeholder={userEmail} type="text" readOnly/>
                <PhoneInput onChange={setPhoneNum} value={phoneNum} placeholder="Phone Number"/>
                <input onChange={(e) => setHobby(e.target.value)} placeholder="Hobby" type="text"/>
                <button type="submit">Save</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UserProfile
