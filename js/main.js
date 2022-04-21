const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');  // it acquires full form
const messageInput = document.getElementById('messageInp')   // input field
const messageContainer = document.querySelector(".container")     // container for dynamic messages

var audio = new Audio('notification.mp3')

const append = (message, position) => {    // this function is creating dynamic divs for all operations
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}


form.addEventListener('submit', (e) => {   // it targets submit button
    e.preventDefault();    // it prevents the page from going to default state
    const message = messageInput.value;
    append(`You: ${message}`, 'right'); 
    socket.emit('send', message);
    messageInput.value = '';
})



const username = prompt("Enter your name to join to Chat-Cat","Guest");

socket.emit('new-user-joined', username); 

socket.on('user-joined', username => {
    append(`${username} joined the chat`, 'left')
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
});


socket.on('left', name => {
    append(`${ name } left the chat`, 'left')
})

