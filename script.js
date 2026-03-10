// const API = "https://lifeos-backend-mhsa.onrender.com/"
const API = "https://lifeos-backend-mhsa.onrender.com"

/* ---------- PAGE NAV ---------- */

function showPage(page){

    document.querySelectorAll(".page").forEach(p=>{
        p.style.display="none"
    })

    document.getElementById(page).style.display="block"

}
/* ---------- THEME ---------- */

function toggleTheme() {
    document.body.classList.toggle("dark") // toggle dark mode class
    // Save current theme to localStorage
    localStorage.setItem("theme", document.body.classList.contains("dark"))
}

function loadTheme() {
    const theme = localStorage.getItem("theme")
    if (theme === "true") {
        document.body.classList.add("dark")
    }
}
/* ---------- JOURNAL ---------- */

function loadJournal(){

fetch(API+"journal")
.then(res=>res.json())
.then(data=>{

const list=document.getElementById("journalList")
list.innerHTML=""

data.forEach(j=>{

const li=document.createElement("li")

li.innerHTML=`
${j.content}
<button onclick="editJournal(${j.id},'${j.content}')">✏</button>
<button onclick="deleteJournal(${j.id})">🗑</button>
`

list.appendChild(li)

})

})

}

function addJournal(){

const text=document.getElementById("journalInput").value

fetch(API+"journal",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({content:text})
}).then(()=>{

document.getElementById("journalInput").value=""
loadJournal()
loadAnalytics()

})

}


function deleteJournal(id){

fetch(API+"journal/"+id,{
method:"DELETE"
}).then(()=>{
loadJournal()
loadAnalytics()
})

}

function editJournal(id, content){
    const newText = prompt("Edit journal", content)

    // If user presses cancel or enters empty string, do nothing
    if(newText === null || newText.trim() === "") return;

    fetch(API+"journal/"+id,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({content:newText})
    }).then(loadJournal)
}


/* ---------- HABITS ---------- */

function loadHabits(){

fetch(API+"habits")
.then(res=>res.json())
.then(data=>{

const list=document.getElementById("habitList")
list.innerHTML=""

data.forEach(h=>{

const li=document.createElement("li")

li.innerHTML=`
${h.habit}
<button onclick="editHabit(${h.id},'${h.habit}')">✏</button>
<button onclick="deleteHabit(${h.id})">🗑</button>
`

list.appendChild(li)

})

})

}

function addHabit(){

const text=document.getElementById("habitInput").value

fetch(API+"/habits",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({habit:text})
}).then(()=>{
document.getElementById("habitInput").value=""
loadHabits()
loadAnalytics()
})

}

function deleteHabit(id){

fetch(API+"/habits/"+id,{
method:"DELETE"
}).then(()=>{
loadHabits()
loadAnalytics()
})
}

function editHabit(id,name){

const newName=prompt("Edit habit",name)

fetch(API+"/habits/"+id,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({habit:newName})
}).then(loadHabits)

}


/* ---------- LEARNING ---------- */

function loadLearning(){

fetch(API+"/learning")
.then(res=>res.json())
.then(data=>{

const list=document.getElementById("learningList")
list.innerHTML=""

data.forEach(l=>{

const li=document.createElement("li")

li.innerHTML=`
${l.topic}
<button onclick="editLearning(${l.id},'${l.topic}')">✏</button>
<button onclick="deleteLearning(${l.id})">🗑</button>
`

list.appendChild(li)

})

})

}

function addLearning(){

const topic=document.getElementById("topicInput").value

fetch(API+"/learning",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({topic})
}).then(()=>{
document.getElementById("topicInput").value=""
loadLearning()
loadAnalytics()
})

}

function deleteLearning(id){

fetch(API+"/learning/"+id,{
method:"DELETE"
}).then(()=>{
loadLearning()
loadAnalytics()
})

}

function editLearning(id,topic){

const newTopic=prompt("Edit learning",topic)
    if(newTopic === null || newTopic.trim() === "") return;


fetch(API+"/learning/"+id,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({topic:newTopic})
}).then(loadLearning)

}

/* ---------- TIMETABLE ---------- */

function loadSchedule(){

fetch(API+"/timetable")
.then(res=>res.json())
.then(data=>{

const list=document.getElementById("scheduleList")
list.innerHTML=""

data.forEach(s=>{

const li=document.createElement("li")

li.innerHTML=`
${s.time} - ${s.activity}
<button onclick="editSchedule(${s.id},'${s.time}','${s.activity}')">✏</button>
<button onclick="deleteSchedule(${s.id})">🗑</button>
`

list.appendChild(li)

})

})

}

function addSchedule(){

const time=document.getElementById("timeInput").value
const activity=document.getElementById("activityInput").value

fetch(API+"/timetable",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({time,activity})
}).then(()=>{
loadSchedule()
loadAnalytics()
})

}

function deleteSchedule(id){

fetch(API+"/timetable/"+id,{
method:"DELETE"
}). then(()=>{
loadSchedule()
loadAnalytics()
})

}

function editSchedule(id,time,activity){

const newTime=prompt("Edit time",time)
const newActivity=prompt("Edit activity",activity)

if(newTime===null || newActivity===null){
return
}

fetch(API+"/timetable/"+id,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({time:newTime,activity:newActivity})
}).then(loadSchedule)

}
/* ---------- ANALYTICS ---------- */
// function updateAnalytics(){
//     document.getElementById("journalCount").innerText = document.querySelectorAll("#journalList li").length;
//     document.getElementById("habitCount").innerText = document.querySelectorAll("#habitList li").length;
//     document.getElementById("learningCount").innerText = document.querySelectorAll("#learningList li").length;

//     document.getElementById("journalCount2").innerText = document.querySelectorAll("#journalList li").length;
//     document.getElementById("habitCount2").innerText = document.querySelectorAll("#habitList li").length;
//     document.getElementById("learningCount2").innerText = document.querySelectorAll("#learningList li").length;
// }
function loadAnalytics(){

fetch(API+"/analytics")
.then(res=>res.json())
.then(data=>{
// console.log("Hello");
// console.log(data.journal +"hello");
document.getElementById("journalCount").innerText=data.journal
document.getElementById("habitCount").innerText=data.habits
document.getElementById("learningCount2").innerText=data.learning
document.getElementById("journalCount2").innerText=data.journal
document.getElementById("habitCount2").innerText=data.habits
document.getElementById("learningCount").innerText=data.learning


})

}


/* ---------- INIT ---------- */

loadJournal()
loadHabits()
loadLearning()
loadAnalytics()
loadSchedule()
loadTheme()
showPage("dashboard")
