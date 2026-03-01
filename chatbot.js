function sendMessage(){
    const input=document.getElementById("input");
    const message=input.value.trim();
    if(message==="") return;
    addMessage(message,"user");
    input.value="";
    showTypingEffect();
    setTimeout(()=>{
        const reply=generateReply(message.toLowerCase());
        hideTypingEffect();
        addMessage(reply,"bot");
    },1500); // 1.5 sec delay
}

function addMessage(text,type){
    const chat=document.getElementById("chat");
    const msg=document.createElement("div");
    msg.classList.add("message",type);
    msg.innerText=text;
    chat.appendChild(msg);
    chat.scrollTop=chat.scrollHeight;
}

function generateReply(msg){
    // Only respond to user questions, no help
    if(msg.includes("hello")||msg.includes("hi")){
        return "Hello! Main ChatBot hoon. Tum kya discuss karna chahte ho?";
    }
    if(msg.includes("time")){
        return "Abhi ka time hai: "+new Date().toLocaleTimeString();
    }
    if(msg.includes("name")||msg.includes("server")){
        return "Yeh sirf ek chatting bot hai, koi real server nahi hai.";
    }
    if(msg.includes("help") || msg.includes("assist") || msg.includes("how") || msg.includes("guide")){
        return "Sorry, main help nahi de sakta. Main sirf chatting ke liye hoon.";
    }
    // Default: echo back user question
    return "Tumne ye kaha: \""+msg+"\". Main sirf is ka reply de sakta hoon.";
}

// Typing animation
function showTypingEffect(){
    const chat=document.getElementById("chat");
    const typing=document.createElement("div");
    typing.classList.add("message","bot");
    typing.id="typing";
    typing.innerText="...";
    chat.appendChild(typing);
    chat.scrollTop=chat.scrollHeight;
}

function hideTypingEffect(){
    const typing=document.getElementById("typing");
    if(typing) typing.remove();
}

// Enter key support
document.getElementById("input").addEventListener("keypress",function(e){
    if(e.key==="Enter") sendMessage();
});
