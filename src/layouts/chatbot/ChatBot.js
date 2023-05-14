import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useLocation } from 'react-router-dom';

function ChatBot(props) {
  const [people, setPeople] = useState([]);
  const storedValue = localStorage.getItem("Email");

  useEffect(() => {
    if (storedValue) {
      fetch(`http://127.0.0.1:8000/api/affichage/${storedValue}`)
        .then((response) => response.json())
        .then((data) => setPeople(data[0]))
        .catch((error) => console.error(error));
    }
  },[storedValue]);
  useEffect(() => {
    const msgerForm = get(".msger-inputarea");
    const msgerInput = get(".msger-input");
    const msgerChat = get(".msger-chat");
    
    const BOT_MSGS = [
      "votre message est bien enregistrer m(me)r l'admin vous repondre le plus tot possible",
    ];
    
    // Icons made by Freepik from www.flaticon.com
    const BOT_IMG = "https://cdn-icons-png.flaticon.com/512/4712/4712139.png";
    const PERSON_IMG = ""+people.image;
    const BOT_NAME = "BOT";
    //const PERSON_NAME = "Sajad";
    const PERSON_NAME = people.nom + " " + people.prenom;
    msgerForm.addEventListener("submit", event => {
      event.preventDefault();
    
      const msgText = msgerInput.value;
      if (!msgText) return;
    
      appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
      msgerInput.value = "";
    
      botResponse();
    });
    
    function appendMessage(name, img, side, text) {
      //   Simple solution for small apps
      const msgHTML = `
        <div class="msg ${side}-msg">
          <img class="msg-img" src="${img}"  alt="Texte alternatif de l'image"/>

          <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">${name}</div>
              <div class="msg-info-time">${formatDate(new Date())}</div>
            </div>
    
            <div class="msg-text">${text}</div>
          </div>
        </div>
      `;
    
      msgerChat.insertAdjacentHTML("beforeend", msgHTML);
      msgerChat.scrollTop += 500;
    }
    
    function botResponse() {
      const r = random(0, BOT_MSGS.length - 1);
      const msgText = BOT_MSGS[r];
      const delay = msgText.split(" ").length * 100;
    
      setTimeout(() => {
        appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
      }, delay);
    }
    
    // Utils
    function get(selector, root = document) {
      return root.querySelector(selector);
    }
    
    function formatDate(date) {
      const h = "0" + date.getHours();
      const m = "0" + date.getMinutes();
    
      return `${h.slice(-2)}:${m.slice(-2)}`;
    }
    
    function random(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  }, [props, people]);
  const htmlContent=
  `
  <style>
  :root {
    --body-bg: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    --msger-bg: #fff;
    --border: 2px solid #ddd;
    --left-msg-bg: #999;
    --right-msg-bg: #999;
  }
  

  .msger {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    width: 100%;
    max-width: 867px;
    margin: 25px 10px;
    height: calc(100% - 50px);
    border: var(--border);
    border-radius: 5px;
    background: var(--msger-bg);
    box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.2);
  }
  
  .msger-header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: var(--border);
    background: #eee;
    color: #666;
  }
  
  .msger-chat {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
  }
  .msger-chat::-webkit-scrollbar {
    width: 6px;
  }
  .msger-chat::-webkit-scrollbar-track {
    background: #ddd;
  }
  .msger-chat::-webkit-scrollbar-thumb {
    background: #bdbdbd;
  }
  .msg {
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
  }
  .msg:last-of-type {
    margin: 0;
  }
  .msg-img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    background: #ddd;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
  }
  .msg-bubble {
    max-width: 450px;
    padding: 15px;
    border-radius: 15px;
    background: var(--left-msg-bg);
  }
  .msg-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .msg-info-name {
    margin-right: 10px;
    font-weight: bold;
  }
  .msg-info-time {
    font-size: 0.85em;
  }
  
  .left-msg .msg-bubble {
    border-bottom-left-radius: 0;
  }
  
  .right-msg {
    flex-direction: row-reverse;
  }
  .right-msg .msg-bubble {
    background: var(--right-msg-bg);
    color: #000;
    border-bottom-right-radius: 0;
  }
  .right-msg .msg-img {
    margin: 0 0 0 10px;
  }
  
  .msger-inputarea {
    display: flex;
    padding: 10px;
    border-top: var(--border);
    background: #eee;
  }
  .msger-inputarea * {
    padding: 10px;
    border: none;
    border-radius: 3px;
    font-size: 1em;
  }
  .msger-input {
    flex: 1;
    background: #ddd;
  }
  .msger-send-btn {
    margin-left: 10px;
    background: rgb(0, 196, 65);
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.23s;
  }
  .msger-send-btn:hover {
    background: rgb(0, 180, 50);
  }
  
  .msger-chat {
    background-color: #fcfcfe;
  }
  #mon-image {
    position: absolute;
    top: 100px;
    left: 1150px;
    height:70vh

  }
  </style>         
  <section class="msger">
  <header class="msger-header">
    <div class="msger-header-title">
      <i class="fas fa-comment-alt"></i> SimpleChat
    </div>
    <div class="msger-header-options">
      <span><i class="fas fa-cog"></i></span>
    </div>
  </header>

  <main class="msger-chat">
    <div class="msg left-msg">
      <img class="msg-img" src="https://cdn-icons-png.flaticon.com/512/4712/4712139.png"  alt="Bot"/>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">BOT</div>
          <div class="msg-info-time">12:45</div>
        </div>

        <div class="msg-text">
          Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
        </div>
      </div>
    </div>

    <div class="msg right-msg">
    <img class="msg-img" src="${people.image}"  alt="Texte alternatif de l'image"/>

      <div class="msg-bubble">
      <div class="msg-info">
          <div class="msg-info-name">${people.nom} ${people.prenom}</div>
          <div class="msg-info-time">12:46</div>
        </div>

        <div class="msg-text">
          You can change your name in JS section!
        </div>
      </div>
    </div>
  </main>

  <form class="msger-inputarea">
    <input type="text" class="msger-input" placeholder="Enter your message...">
    <button type="submit" class="msger-send-btn">Send</button>
  </form>
</section>`
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <img class="msg-img" src="https://cdn-icons-png.flaticon.com/512/4712/4712139.png" style={{ float: 'right', width: '300px', height: '300px', marginRight: '10px' }} alt="" />
        <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default ChatBot;
