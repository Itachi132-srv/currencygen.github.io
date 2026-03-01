// detoxgpt.js

function sendMessage(){
    const input = document.getElementById("input");
    const message = input.value.trim();
    if(message === "") return;

    addMessage(message, "user");
    input.value = "";

    showTypingEffect();

    setTimeout(()=>{
        const reply = generateReply(message.toLowerCase());
        hideTypingEffect();
        addMessage(reply, "bot");
    },2000);
}

function addMessage(text, type){
    const chat = document.getElementById("chat");
    const msg = document.createElement("div");
    msg.classList.add("message", type);
    msg.innerText = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

function generateReply(msg){
    // Example rules: sirf user ka poocha hua answer
    if(msg.includes("hello") || msg.includes("hi"))
        return "Hello! Main DetoxGPT hoon. Batao kya help chahiye.";

    if(msg.includes("discord") && msg.includes("channel")){
        return "Discord channel example:\n\n" +
               "INFORMATION:\n#rules\n#announcements\n\n" +
               "GENERAL:\n#general-chat\n#media\n\n" +
               "VOICE:\n🔊 General VC\n🔊 Gaming VC";
    }

    if(msg.includes("html"))
        return "HTML structure website ka skeleton hai. Agar chaho, main template bana ke de sakta hoon.";

    if(msg.includes("server name") || msg.includes("name"))
        return "Server names examples:\n- Void Lounge\n- DarkNest\n- Orange Realm\n- Toxic Hub";

    if(msg.includes("time"))
        return "Abhi ka time hai: " + new Date().toLocaleTimeString();

    if(msg.includes("help"))
        return "Main choti moti help kar sakta hoon. Specific batao.";

    // Agar koi unknown query
    return "Main samajh gaya, aur detail me batao taake main sahi help kar saku.";
}

// Typing animation
function showTypingEffect(){
    const chat = document.getElementById("chat");
    const typing = document.createElement("div");
    typing.classList.add("message","bot");
    typing.id = "typing";
    typing.innerText = "...";
    chat.appendChild(typing);
    chat.scrollTop = chat.scrollHeight;
}

function hideTypingEffect(){
    const typing = document.getElementById("typing");
    if(typing) typing.remove();
}

// Enter key
document.getElementById("input").addEventListener("keypress", function(e){
    if(e.key === "Enter") sendMessage();
});
