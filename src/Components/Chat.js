import React, { useEffect, useState } from "react";
import { auth, db, googleProvider } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Chat() {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const userUid = currentUser.uid;
    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", userUid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let chats = [];
      snapshot.forEach((doc) => {
        const chatData = doc.data();
        const otherParticipant = chatData.participants.find(
          (participant) => participant !== userUid
        );
        chats.push({
          ...chatData,
          id: doc.id,
          displayName:
            users.find((u) => u.id === otherParticipant)?.displayName ||
            "Onbekend",
        });
      });
      setChats(chats);
    });

    return () => unsubscribe();
  }, [currentUser, users]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "Users"));
        const fetchedUsers = [];
        snapshot.forEach((doc) => {
          const userDoc = { ...doc.data(), id: doc.id };
          if (userDoc.id !== currentUser.uid) {
            fetchedUsers.push(userDoc);
          }
        });
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Fout bij ophalen gebruikers:", error);
      }
    };

    fetchUsers();
  }, [currentUser]);

  useEffect(() => {
    if (!selectedChatId) return;

    const q = query(
      collection(db, `chats/${selectedChatId}/messages`),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let msgs = [];
      snapshot.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id });
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [selectedChatId]);

  const startNewChat = async () => {
    if (!selectedUser) {
      alert("Selecteer een gebruiker om een nieuwe chat te starten.");
      return;
    }

    const { uid } = currentUser;

    const newChat = {
      participants: [uid, selectedUser.id],
      createdAt: serverTimestamp(),
    };

    const chatRef = await addDoc(collection(db, "chats"), newChat);

    setSelectedChatId(chatRef.id);
    setIsCreatingChat(false);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    if (!currentUser) {
      alert("Je moet ingelogd zijn om een bericht te sturen.");
      return;
    }

    const { uid, displayName, photoURL } = currentUser;

    await addDoc(collection(db, `chats/${selectedChatId}/messages`), {
      text: newMessage,
      name: displayName,
      uid,
      photoURL,
      createdAt: serverTimestamp(),
    });

    setNewMessage("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-700">Loading...</h2>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800">
          Beste gebruiker, login om toegang te krijgen tot je chats.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Chat App</h2>

      {!selectedChatId && (
        <div>
          <button
            onClick={() => setIsCreatingChat(!isCreatingChat)}
            className="mb-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-200"
          >
            {isCreatingChat ? "Annuleer" : "Nieuwe chat starten"}
          </button>

          {isCreatingChat && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">
                Selecteer een gebruiker:
              </h3>
              <select
                onChange={(e) =>
                  setSelectedUser(users.find((u) => u.id === e.target.value))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Kies een gebruiker --</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.displayName}
                  </option>
                ))}
              </select>
              <button
                onClick={startNewChat}
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
              >
                Start Chat
              </button>
            </div>
          )}

          <h3 className="text-lg font-semibold mb-3">Beschikbare chats:</h3>
          <ul className="space-y-4">
            {chats.map((chat) => {
              const otherParticipant = chat.participants.find(
                (participant) => participant !== currentUser.uid
              );

              const otherUser = users.find((u) => u.id === otherParticipant);

              return (
                <li
                  key={chat.id}
                  className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedChatId(chat.id)}
                >
                  <h4 className="text-lg font-bold">
                    {`Chat met ${otherUser?.displayName || "Onbekend"}`}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Deelnemers: {chat.participants.length}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {selectedChatId && (
        <div>
          <button
            onClick={() => setSelectedChatId(null)}
            className="mb-6 px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
          >
            Terug naar chats
          </button>
          <div className="h-64 overflow-y-auto mb-6 border border-gray-300 rounded-lg p-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="mb-4 p-4 bg-white border border-gray-300 rounded-lg shadow"
              >
                <p>
                  <strong>{msg.name}:</strong> {msg.text}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Type je bericht..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
            >
              Verstuur
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
