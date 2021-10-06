import { Avatar } from "@material-ui/core"
import React, { forwardRef, useState, useEffect } from "react"
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
import { Tooltip, ClickAwayListener, Button } from '@material-ui/core'

const Post = forwardRef(({ name, description, message, photoUrl, timestamp }, ref ) => {
  const [postId, setPostId] = useState("");
  const [likesNum, setLikesNum] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const userId = useSelector(selectUid);

  const handleTooltipClose = () => {
    setOpen(false);
  }

  const handleTooltipOpen = () => {
    setOpen(true);
  }

  useEffect(() => {
    db.collection("posts").where("timestamp", "==", timestamp)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          setPostId(doc.id);
      });
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
        setLikesNum(count);
      })
      .catch((error) => {
        console.log("Error getting length: ", error)
      })
    }
  })

  useEffect(() => {
    if (postId) {
      db.collection("posts").doc(postId).collection("likedBy").doc(userId).get().then((doc) => {
      if (doc.exists) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
      }).catch((error) => {
        console.log("Error getting liked: ", error)
      })
    }
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
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div>
            <Tooltip
              PopperProps={{disablePortal: true}}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="SSSSSS"
            >
              <Button style={{'margin': '0', 'padding': '0'}} onClick={handleTooltipOpen}><InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" /></Button>
            </Tooltip>
          </div>
        </ClickAwayListener>
        <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
      </div>
    </div>
  )
})

export default Post
