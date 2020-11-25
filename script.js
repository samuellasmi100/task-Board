let arrayOfTask = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")): [];
let idOfTask = localStorage.getItem("currentId") ? JSON.parse(localStorage.getItem("currentId")): 1;
 
if (localStorage.getItem("tasks").length > 0){
    showAllTask( "getItemInStorage");
}

function saveTasksToLocalStorage(){
    let jsonFormatOfTasksArray = JSON.stringify(arrayOfTask);
    localStorage.setItem("tasks", jsonFormatOfTasksArray);
    let jsonCurrentId = JSON.stringify(idOfTask);
    localStorage.setItem("currentId", jsonCurrentId);

}

const taskContent = document.querySelector(".aMission");
const taskDate = document.querySelector(".aDate");
const taskTime = document.querySelector(".aTime");

taskContent.value = localStorage.getItem("content") ? JSON.parse(localStorage.getItem("content")): "";
taskDate.value = localStorage.getItem("date") ? JSON.parse(localStorage.getItem("date")): "";
taskTime.value = localStorage.getItem("time") ? JSON.parse(localStorage.getItem("time")): "";

function saveFromToLocalStorage(){
localStorage.setItem("content",JSON.stringify(taskContent.value))
localStorage.setItem("date", JSON.stringify(taskDate.value))
localStorage.setItem("time", JSON.stringify(taskTime.value))


}


function addMission() {
    let taskInformation = {
        mission: document.querySelector(".aMission").value,
        date: document.querySelector(".aDate").value,
        time: document.querySelector(".aTime").value,
        id: idOfTask 
    }
    if(taskInformation.mission && taskInformation.date && taskInformation.time){
        arrayOfTask.push(taskInformation);

    } else {
        alert ("Please Fill In All The Fields")
    }
   idOfTask++;
    console.log(arrayOfTask);
    showAllTask();
    saveTasksToLocalStorage();
    resetForm();
    
}

function showAllTask(name) {
    let wrapperDiv = document.querySelector(".wrapperTasks");
    wrapperDiv.innerHTML = "";
    for (let i = 0; i < arrayOfTask.length; i++) {
        let firstDiv = document.createElement("div");
        firstDiv.className = "task";
        firstDiv.id = i;
        if(name == "getItemInStorage"){
            firstDiv.className = "task  fadeTask"
        }else{
            i == (arrayOfTask.length - 1) ?   firstDiv.className = "task  fadeTask":""

        }
        let secendDiv = document.createElement("div");
        secendDiv.className = "content";


        let firstP = document.createElement("p");
        firstP.className = "firstP"
        firstP.innerHTML = arrayOfTask[i].mission;
        
        let secendP = document.createElement("p");
        secendP.className = "secendP"
        secendP.innerHTML = arrayOfTask[i].date;
        
        let thirdP = document.createElement("p");
        thirdP.className = "thirdP"
        thirdP.innerHTML = arrayOfTask[i].time;

        let button = document.createElement("button");
        button.className = "glyphicon glyphicon-remove";
        button.dataset.id = arrayOfTask[i].id;
        button.onclick = function (task) {
            deleteUser(task.target.dataset.id)
           
        }

        wrapperDiv.appendChild(firstDiv)
        firstDiv.appendChild(button)

        firstDiv.appendChild(secendDiv)
        secendDiv.appendChild(firstP)
        secendDiv.appendChild(secendP)
        secendDiv.appendChild(thirdP)
        
    }
    removeFade()
}

function deleteUser(id) {
     arrayOfTask = arrayOfTask.filter(task => task.id !== +id);
     showAllTask();
     saveTasksToLocalStorage();
}

function resetForm() {
    taskContent.value = "";
    taskDate.value = "";
    taskTime.value ="";
}
function removeFade(){
    var elem = document.querySelectorAll(".task");

   
    setTimeout(function(){ 


    for (var i = 0; i < elem.length; i++) {
        elem[i].classList.remove('fadeTask');
     }


}, 3000);

}
