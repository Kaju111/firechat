import React, { useState } from "react";
import "./addUser.css";
import { db } from "../../../lib/firebase";
import {
  arrayUnion,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useUserStore } from "../../../lib/userStore";

const AddUser = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "user");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const username = formData.get("username");

  //   try {
  //     const userRef = collection(db, "user");
  //     const q = query(userRef, where("username", "==", username));
  //     const querySnapshot = await getDocs(q);

  //     if (!querySnapshot.empty) {
  //       querySnapshot.forEach((doc) => {
  //         setUser(doc.data());
  //       });
  //     } else {
  //       setUser(null); // Clear user if not found
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleAdd = async (e) => {
    e.preventDefault();

    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const handleAdd = async (e) => {
  //   e.preventDefault();
  //   if (!user) return; // Check if user exists

  //   const chatRef = collection(db, "chats");
  //   const userChatsRef = collection(db, "userchats");

  //   try {
  //     const newChatRef = doc(chatRef);

  //     await setDoc(newChatRef, {
  //       createdAt: serverTimestamp(),
  //       messages: [],
  //     });

  //     await updateDoc(doc(userChatsRef, user.id), {
  //       chats: arrayUnion({
  //         chatId: newChatRef.id,
  //         lastMessage: "",
  //         receiverId: currentUser.id,
  //         updatedAt: Date.now(),
  //       }),
  //     });

  //     await updateDoc(doc(userChatsRef, currentUser.id), {
  //       chats: arrayUnion({
  //         chatId: newChatRef.id,
  //         lastMessage: "",
  //         receiverId: user.id,
  //         updatedAt: Date.now(),
  //       }),
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button type="submit">Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
