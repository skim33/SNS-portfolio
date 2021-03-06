import React, {useState, useEffect} from 'react'

import { auth, db } from '../firebase'
import { useSelector } from 'react-redux'
import {  selectEmail, selectDisplayName, selectProfileURL } from '../features/userSlice'
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input'

import './UserProfile.css'
import 'react-phone-number-input/style.css';
import Icon from './Icon'

import ImageOne from '../assets/unlocked.jpg'
import ImageTwo from '../assets/locked.jpg'

export const profileUnsubscribers = [];

const UserProfile = ({ isToggled }) => {
  const userEmail = useSelector(selectEmail);
  const userDisplayName = useSelector(selectDisplayName);
  const userProfileURL = useSelector(selectProfileURL);
  const [phoneNum, setPhoneNum] = useState("");
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState([]);
  const [isActive, setIsActive] = useState(false);
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
          likes: "",
          dislikes: "",
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
      likes: likes.length > 0 ? likes : (userData.likes ? userData.likes : ""),
      dislikes: dislikes.length > 0 ? dislikes : (userData.dislikes ? userData.dislikes : ""),
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
    setLikes("");
    setDislikes("");
    if (phoneNum && !isValidPhoneNumber(phoneNum)) setError("Invalid Phone Number");
    if (!phoneNum && likes.length === 0 && dislikes.length === 0) setError("No Profile Info To Update");
  }

  return (
    <div className={`wrapper ${isToggled && 'toggled'}`}>
      <section className={isActive ? 'active' : ''}>
        <Icon />
        <div className={isActive ? 'container active' : 'container'}>
          <div className="user infoBx">
            <div className="displayBx">
              <h2>Your Profile</h2>
              <div style={{textAlign: 'center', color: 'crimson'}}>{error}</div>
              <div>Name: <span>{userData.name}</span></div>
              <div>Email: <span>{userData.email}</span></div>
              <div>Phone Number: <span>{userData.phoneNum}</span></div>
              <div>Likes: <span>{userData.likes}</span></div>
              <div>Dislikes: <span>{userData.dislikes}</span></div>
              <button className="btn" onClick={() => setIsActive(!isActive)}>Update</button>
            </div>
            <div className="imgBx"><img src={ImageTwo} alt="locked" /></div>
          </div>

          <div className="user editBx">
            <div className="imgBx"><img src={ImageOne} alt="unlocked" /></div>
            <div className="formBx">
              <form onSubmit={addUser}>
                <h2>Update Profile</h2>
                <input style={{border: '1px solid crimson'}} placeholder={userDisplayName} type="text" readOnly/>
                <input style={{border: '1px solid crimson'}} placeholder={userEmail} type="text" readOnly/>
                <PhoneInput onChange={setPhoneNum} value={phoneNum} placeholder="Phone Number"/>
                <input onChange={(e) => setLikes(e.target.value)} placeholder="Likes" type="text"/>
                <input onChange={(e) => setDislikes(e.target.value)} placeholder="DisLikes" type="text"/>
                <div className="btnBx">
                  <button type="submit" className="btn" onClick={() => setIsActive(!isActive)}>Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UserProfile
