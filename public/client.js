const socket = io();

let username;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");

do {
  username = prompt("Please type your name:");
} while (!username);

document.querySelector(".usernameEl").textContent = username;

socket.emit("user-joined", username);

textarea.addEventListener("keyup", (e) => {
  if (!e.shiftKey && e.key === "Enter") sendMessage(e.target.value);
});

const scrollToBottom = () => (messageArea.scrollTop = messageArea.scrollHeight);

function sendMessage(message) {
  let msg = {
    user: username,
    message: message.trim(),
  };
  appendMassege(msg, "outgoing");
  textarea.value = "";
  socket.emit("message", msg);
}

function appendMassege(msg, className) {
  let mainDiv = document.createElement("div");
  mainDiv.classList.add(className, "message");

  mainDiv.innerHTML = `
    <h4>${msg.user} : ${new Date().toLocaleTimeString()}</h4>
    <pre>${msg.message}</pre>
  `;
  messageArea.appendChild(mainDiv);
  scrollToBottom();
}

socket.on("message", (msg) => appendMassege(msg, "incoming"));
socket.on("user-joined", (username) =>
  appendMassege(
    { user: "CHI-CHAT", message: `${username}: has joined` },
    "incoming"
  )
);
