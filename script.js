  //  dark mode
  let nav_button = document.getElementById("nav_button")
   let todo_list= document.getElementById("darkmode_design");
  nav_button.addEventListener("click",() =>{
    // let color_back= "#333";
    todo_list.style.backgroundColor = "#333"
    
    
  });
  

  
   // On app load, get all mytodo from localStorage
   window.onload = loadmytodo;

   // On form submit add task
   document.querySelector("form").addEventListener("submit", e => {
     e.preventDefault();
     addTask();
   });

   function loadmytodo() {
     // check if localStorage has any mytodo
     // if not then return
    //  localStorage.clear()
     if (localStorage.getItem("mytodo") == null) return;
     let me = localStorage.getItem("mytodo")
     let know = JSON.parse(me)
     console.log(know)

     // Get the mytodo from localStorage and convert it to an array
     let taskTodo = Array.from(JSON.parse(localStorage.getItem("mytodo")));

     // Loop through the mytodo and add them to the list
     taskTodo.forEach(task => {
       
        const list = document.querySelector("ul");
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
          <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
        list.insertBefore(li, list.children[0]);


      
     });
   }

   function addTask() {
     const task = document.querySelector("form input");
     const list = document.querySelector("ul");
     // return if task is empty
     if (task.value === "") {
       alert("Please add some task!");
       return false;
     }
     // check is task already exist
     if (document.querySelector(`input[value="${task.value}"]`)) {
       alert("Task already exist!");
       return false;
     }

     // add task to local storage
     localStorage.setItem("mytodo", JSON.stringify([...JSON.parse(localStorage.getItem("mytodo") || "[]"), { task: task.value, completed: false }]));
     

     // create list item, add innerHTML and append to ul
     const li = document.createElement("li");
     li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
     <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
     <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
     list.insertBefore(li, list.children[0]);
     // clear input
     task.value = "";
   }

   function taskComplete(event) {
     let mytodo = Array.from(JSON.parse(localStorage.getItem("mytodo")));
     mytodo.forEach(task => {
      // console.log(task)
       if (task.task === event.nextElementSibling.value) {
         task.completed = !task.completed;
       }
     });
     localStorage.setItem("mytodo", JSON.stringify(mytodo));
     let comp = event.nextElementSibling.classList;
     console.log(comp)
     event.nextElementSibling.classList.toggle("completed");
   }

   function removeTask(event) {
     let mytodo = Array.from(JSON.parse(localStorage.getItem("mytodo")));
     mytodo.forEach(task => {
       if (task.task === event.parentNode.children[1].value) {
         // delete task
         mytodo.splice(mytodo.indexOf(task), 1);
       }
     });
     localStorage.setItem("mytodo", JSON.stringify(mytodo));
     event.parentElement.remove();
   }

   // store current task to track changes
   var currentTask = null;

   // get current task
   function getCurrentTask(event) {
     currentTask = event.value;
   }

   // edit the task and update local storage
   function editTask(event) {
     let mytodo = Array.from(JSON.parse(localStorage.getItem("mytodo")));
     // check if task is empty
     if (event.value === "") {
       alert("Task is empty!");
       event.value = currentTask;
       return;
     }
     // task already exist
     mytodo.forEach(task => {
       if (task.task === event.value) {
         alert("Task already exist!");
         event.value = currentTask;
         return;
       }
     });
    //  mytodo.forEach(task => {
    //   if (task.completed === true){
    //     alert("You already complete the task!");
    //     return;
    //   }
    //  });
     // update task
     mytodo.forEach(task => {
       if (task.task === currentTask) {
         task.task = event.value;
       }
     });
     // update local storage
     localStorage.setItem("mytodo", JSON.stringify(mytodo));
   }