// detoxgpt.js

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
    },2000);
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
    // Greetings
    if(msg.includes("hello")||msg.includes("hi"))
        return "Hello! Main DetoxGPT hoon. Batao kya help chahiye.";

    // Discord channels - partial match
    if(msg.includes("discord") && msg.includes("channel"))
        return "Discord channels example for a chatting server:\n\n"+
               "INFORMATION:\n#rules\n#announcements\n"+
               "GENERAL:\n#general-chat\n#media\n"+
               "VOICE:\n🔊 General VC\n🔊 Gaming VC";

    // HTML
    if(msg.includes("html"))
        return "HTML structure website ka skeleton hai. Agar chaho main template bana ke de sakta hoon.";

    // Server names
    if(msg.includes("server name")||msg.includes("name"))
        return "Server name examples:\n- Void Lounge\n- DarkNest\n- Orange Realm\n- Toxic Hub";

    // Time
    if(msg.includes("time"))
        return "Abhi ka time hai: "+new Date().toLocaleTimeString();

    // Help
    if(msg.includes("help"))
        return "Main choti moti help kar sakta hoon. Specific batao.";

    // Unknown queries
    return "Samajh gaya, aur thoda detail me batao taake main sahi help kar saku.";
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

// Enter key
document.getElementById("input").addEventListener("keypress",function(e){
    if(e.key==="Enter") sendMessage();
});
