
// Declare the button object

	// Taskbar
btnStart = document.getElementById("btnStart");					// the start menu button object
startMenu = document.getElementById("startMenu");				// the start menu it self object
taskBar = document.getElementById("tasks");

	// Start menu
btnShutdown = document.getElementById("btnShutdown");			// the shut down item object


// click elsewhere to close the start menu
window.addEventListener('mousedown', function(e){
	if (!startMenu.contains(e.target) &&						// Checks if the click was not inside the start menu and start menu buttom
		!btnStart.contains(e.target) 							// It will reset the button and hide de start menu
		){
		btnStart.className = "taskbar-button";
		startMenu.className = "taskbar-startMenu";
	}

	/*if(btnStart.contains(e.target)){

	}*/
});

// clicking the start menu button will open the start menu
btnStart.addEventListener("click",function(e){
	if (btnStart.className == "taskbar-button"){ 				// Checks if the button is not active
		btnStart.className += " active";						// to active it and show the start menu
		startMenu.className += " open";
	}
	else{
		btnStart.className = "taskbar-button";					// if the button is then it will disable 
		startMenu.className = "taskbar-startMenu";				// nand hide the start menu
	}
});


// clicking the shut down item in the star menu it will hide de body (not doing that)
btnShutdown.addEventListener('click', function(){
	//document.getElementById('sys').className = "hide";

	alert("Don't do that ever again.");
});

// Notification bar icon functions

// (Empty)

// clock in the notification section
function startTime() {
	const today = new Date();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	//document.getElementById('time').innerHTML =  h + ":" + m + ":" + s;
	document.getElementById('time').innerHTML =  h + ":" + m;
	setTimeout(startTime, 1000);
}

function checkTime(i) {
	if (i < 10) {i = "0" + i};  								// add zero in front of numbers < 10
	return i;
}

function newTask(title, id, icon){
	/*if (icon != ""){
		icon = `<img src='` + icon + `'>`
	}
	else icon = ""*/

    let win = `
	<div id="` + id + `Task" class="taskbar-button win">
		` + icon + `
		<span>` + title + `</span>
	</div>
    `;

    taskBar.innerHTML += win;                                                   // Add the window in the winArea
    //windowsList.push(id)                                                        // Add the window in the windowsList
    return id;                                                                  // Returns the random generated ID
}

function killTask(task){
    for (let i = 0; i < taskBar.children.length; i++){
		if (task.id + "Task" == taskBar.children[i].id){
			taskBar.removeChild(document.getElementById(task.id + "Task"));
		}
	}
}

