import React, {useState, useEffect} from "react"
import { useSelector } from "react-redux"
import "./Feed.css"
import InputOption from "./InputOption"
import Post from "./Post"
import CreateIcon from "@material-ui/icons/Create"
import ImageIcon from "@material-ui/icons/Image"
import SubscriptionsIcon from "@material-ui/icons/Subscriptions"
import EventNoteIcon from "@material-ui/icons/EventNote"
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay"
import firebase from "firebase/app"
import { db } from "../firebase"
import { selectEmail, selectDisplayName, selectProfileURL } from "../features/userSlice"
import FlipMove from "react-flip-move";

export const unsubscriber = [];

function Feed() {
  const userEmail = useSelector(selectEmail);
  const userDisplayName = useSelector(selectDisplayName);
  const userProfileURL = useSelector(selectProfileURL);
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const unsubscribe = db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot => (
      setPosts(snapshot.docs.map(doc => (
        {
          id: doc.id,
          data: doc.data()
        })))
    ));

    unsubscriber.push(unsubscribe);

    return () => setPosts([]) 
  }, []);

  const sendPost = e => {
    e.preventDefault();

    db.collection("posts").add({
      name: userDisplayName,
      description: userEmail,
      message: input,
      photoUrl: userProfileURL || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp()

    }).then((ref) => {
      console.log("Document written with ID: ", ref.id);
    
    }).catch((error) => {
      console.error("Error adding document: ", error);
    })

    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );

    setInput("");
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form onSubmit={sendPost}>
            <input type="text" onChange={(e) => setInput(e.target.value)} />
            <button　type="submit">Send</button>
          </form>
        </div>

        <div className="feed__inputOptions">
          <InputOption Icon={ ImageIcon } title="Photo" color="#70B5F9" />
          <InputOption Icon={ SubscriptionsIcon } title="Video" color="#E7A33E" />
          <InputOption Icon={ EventNoteIcon } title="Event" color="#C0CBCD" />
          <InputOption Icon={ CalendarViewDayIcon } title="Write article" color="#7FC15E" />
        </div>
      </div>

      {/* Posts */}
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl, timestamp }}) => (
          <Post 
            key={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
            timestamp={timestamp}
          />
        ))}
      </FlipMove>
    </div>
  )
}

export default Feed
