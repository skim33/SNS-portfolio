import { Avatar } from "@material-ui/core"
import React, { forwardRef, useState, useEffect, useRef } from "react"
import "./Post.css"
import InputOption from "./InputOption"
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined"
import ThumbUp from "@material-ui/icons/ThumbUp"
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined"
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined"
import SendOutlinedIcon from "@material-ui/icons/SendOutlined"
import { db } from "../firebase"
import { useSelector } from "react-redux"
import { selectUid } from "../features/userSlice"
import { useDetectOutsideClick } from './useDetectOutsideClick'
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';

const Post = forwardRef(({ name, description, message, photoUrl, timestamp }, ref ) => {
  const [postId, setPostId] = useState("");
  const [likesNum, setLikesNum] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const dropdownRef = useRef(null);
  const [showMenu, setShowMenu] = useDetectOutsideClick(dropdownRef, false);
  const userId = useSelector(selectUid);

  useEffect(() => {
    let isSubscribed = true;
    
    db.collection("posts").where("timestamp", "==", timestamp)
    .get()
    .then((querySnapshot) => {
      if (isSubscribed) {
        querySnapshot.forEach((doc) => {
          setPostId(doc.id);
        });
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

    if (postId) {
      var count = 0;

      db.collection("posts").doc(postId).collection("likedBy").get().then((querySnapshot) => {
        querySnapshot.docChanges().forEach(change => {
          if (change.type === "added") ++count;
          else --count;
        })
        if (isSubscribed) {
          setLikesNum(count);
        }
      })
      .catch((error) => {
        console.log("Error getting length: ", error)
      })
    }

    return () => isSubscribed = false;
  });

  useEffect(() => {
    let isSubscribed = true;

    if (postId) {
      db.collection("posts").doc(postId).collection("likedBy").doc(userId).get().then((doc) => {
      if (doc.exists) {
        if (isSubscribed) {
          setIsLiked(true);
        }
      } else {
        if (isSubscribed) {
          setIsLiked(false);
        }
      }
      }).catch((error) => {
        console.log("Error getting liked: ", error)
      })
    }
    return () => isSubscribed = false;
  }, [userId, postId])

  const clickLikeBtn = () => {
    var docRef = db.collection("posts").doc(postId).collection("likedBy").doc(userId);

    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());

        if (doc.id === userId) {
          docRef.delete().then(()=>{
            console.log("Document successfully deleted!");
          }).catch((error) => {
            console.error("Error removing document: ", error);
          })
          setIsLiked(false);
        }
      }
      else {
        console.log("No such document!");

        db.collection("posts").doc(postId).collection("likedBy").doc(userId).set({
          id: userId
        })

        setIsLiked(true)
      }

    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  return (
    <div ref={ref} className="post">
      <div className="post__header">
        <Avatar src={photoUrl}>{name[0]}</Avatar>
        <div className="post__info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="post__body">
        <p>{message}</p>
      </div>

      <br />

      <div className="post__buttons">
        <InputOption Icon={isLiked ? (ThumbUp) : (ThumbUpAltOutlinedIcon)} title="Like" color="gray" likesNum={likesNum} clickLikeBtn={clickLikeBtn} />
        <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" />
        <div className="menu-container">
          <div onClick={() => setShowMenu(!showMenu)} className="menu-trigger"><InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" /></div>

          <ul ref={dropdownRef} className={`menu ${showMenu ? 'active' : ''}`}>
            <li><span　style={{'display': 'inline-block', 'verticalAlign': 'middle', 'paddingLeft': '3px'}}><FacebookIcon color="primary" /></span><a href="https://www.facebook.com/login/" target="_blank" rel="noreferrer" style={{'display': 'inline', 'verticalAlign': 'middle'}}>Facebook</a></li>
            <li><span style={{'display': 'inline-block', 'verticalAlign': 'middle', 'paddingLeft': '3px'}}><TwitterIcon style={{'fill': "#00acee"}} /></span><a href="https://twitter.com/i/flow/login" target="_blank" rel="noreferrer" style={{'display': 'inline', 'verticalAlign': 'middle'}}>Twitter</a></li>
            <li><span style={{'display': 'inline-block', 'verticalAlign': 'middle', 'paddingLeft': '3px'}}><LinkedInIcon style={{'fill': "#0072b1"}} /></span><a href="https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin" target="_blank" rel="noreferrer" style={{'display': 'inline', 'verticalAlign': 'middle'}}>LinkedIn</a></li>
          </ul>
        </div>
        <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
      </div>
    </div>
  )
})

export default Post
