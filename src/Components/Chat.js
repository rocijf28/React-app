import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase'; // pas pad aan naar jouw firebase.js
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // We maken een query naar de Firestore collectie 'messages'
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let msgs = [];
      snapshot.forEach((doc) => {
        msgs.push({...doc.data(), id: doc.id});
      });
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    if (!auth.currentUser) {
      alert("Je moet ingelogd zijn om een bericht te sturen.");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;

    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      name: displayName,
      uid,
      photoURL,
      createdAt: serverTimestamp()
    });

    setNewMessage('');
  };

  return (
    <div style={{border: '1px solid #ccc', padding: '1rem', maxWidth: '400px', margin: 'auto'}}>
      <h2>Chat</h2>
      <div style={{height: '300px', overflowY: 'auto', marginBottom: '1rem', border: '1px solid #eee', padding: '1rem'}}>
        {messages.map(msg => (
          <div key={msg.id} style={{marginBottom: '1rem', background: '#f9f9f9', padding: '0.5rem', borderRadius: '4px'}}>
            <p><strong>{msg.name}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{display: 'flex', gap: '0.5rem'}}>
        <input 
          type="text" 
          placeholder="Type je bericht..." 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          style={{flex: 1, padding: '0.5rem'}}
        />
        <button type="submit" style={{padding: '0.5rem 1rem'}}>Send</button>
      </form>
    </div>
  );
}

export default Chat;