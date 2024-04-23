import React, { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "../addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const { currentUser } = useUserStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });
        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser.id]);

  // useEffect(() => {
  //   const unSub = onSnapshot(
  //     doc(db, "userchats", currentUser.id),
  //     async (res) => {
  //       try {
  //         if (res.exists()) {
  //           const items = res.data().chats;
  //           const promises = items.map(async (item) => {
  //             const userDocRef = doc(db, "users", item.receiverId);
  //             const userDocSnap = await getDoc(userDocRef);

  //             if (userDocSnap.exists()) {
  //               const user = userDocSnap.data();
  //               return { ...item, user };
  //             } else {
  //               console.log("User document does not exist.");
  //               return null;
  //             }
  //           });

  //           const chatData = await Promise.all(promises);
  //           const filteredChats = chatData.filter((chat) => chat !== null);
  //           const sortedChats = filteredChats.sort(
  //             (a, b) => b.updatedAt - a.updatedAt
  //           );

  //           setChats(sortedChats);
  //         } else {
  //           console.log("Document does not exist.");
  //           // Clear chats if document does not exist
  //           setChats([]);
  //         }
  //       } catch (error) {
  //         console.log("Error fetching chat data:", error);
  //         // Handle error fetching chat data
  //       }
  //     }
  //   );

  //   return () => {
  //     unSub();
  //   };
  // }, [currentUser.id]);

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="search" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {chats.map((chat) => (
        <div className="item" key={chat.chatId}>
          <img src={chat.user.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
