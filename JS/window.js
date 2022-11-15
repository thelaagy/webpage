
// Start the important arrays etc
const winArea = document.getElementById("winArea");
const windowsList = []


// Update the draggable windows
function updateDrags(){
    for (let i = 0; i < windowsList.length; i++){
        dragElement(document.getElementById(windowsList[i]));
    }
}

// Close a window, usually used on close buttons on the title bar
function windowClose(w){
    try{
        let cont = w.parentNode.parentNode.parentNode;
        let win = w.parentNode.parentNode;

        for (let i = 0; i < windowsList.length; i++){   // Finds where the window is on the windowsList array
            if (windowsList[i] == win.id){
                windowsList.splice(i, 1)                // Remove the window from windowsList array
            }
        }

        killTask(win);
        cont.removeChild(win);                          // Remove the actual window from the winArea
        updateDrags();                                  // Update the grab function since there is less windows
    }
    catch(e){
        console.log(e);                                 // Shows an error if something goes wrong on the console
        return false;                                   // and return false
    }
    return true;                                        // returns true if everything goes right
}

function windowMinimize(w){
    try{
        let win = w;
        if (w.className == "minbutton")
            win = w.parentNode.parentNode;

        if (win.className.search(/ minimized/i) < 0){
            win.className += " minimized";
            document.getElementById( win.id + "header").className = document.getElementById( win.id + "header").className.replace(/ active/g,"");
            document.getElementById( win.id + "Task").className = document.getElementById( win.id + "Task").className.replace(/ active/g,"");
            //function windowActive(winArea.children[winArea.children.length-2], event)
        }
    }
    catch(e){
        console.log(e);                                 // Shows an error if something goes wrong on the console
        return false;                                   // and return false
    }
    return true;    
}

// Create a new window
function newWindow(title, content, icon, style, contentStyle){
    if (icon)
		icon = `<img src="` + icon + `">`
	else icon = ""
    
    let id = "window" + Math.floor(Math.random() * 9999999999999999);           // Generate a ID number to avoid ID conflicts 
                                                                                // (it is still possible but almost impossible)
    let win = `
    <div id="` + id + `" class="window" style="top: ` + (40 + windowsList.length * 10) + `px; left: ` + (40 + windowsList.length * 10) + `px; ` + style + `">
        <div id="` + id + `header" class="titlebar">
            ` + icon +`
            ` + title + `
            <div class="closebutton" onclick="windowClose(this)"></div>
            <div class="minbutton" onclick="windowMinimize(this)"></div>
        </div>
        <div class="content" style="` + contentStyle + `">
            `+ content + `
        </div>
    </div>`;

    winArea.innerHTML += win;                                                   // Add the window in the winArea
    windowsList.push(id)                                                        // Add the window in the windowsList
    newTask(title,id,icon);
    updateDrags();                                                              // Update the grab function since there is one more window
    return id;                                                                  // Returns the random generated ID
}


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (document.getElementById(elmnt.id + "header")) {
    	// if present, the header is where you move the DIV from:
    	document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
    	// otherwise, move the DIV from anywhere inside the DIV:
    	elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
    	e = e || window.event;
    	e.preventDefault();
    	// get the mouse cursor position at startup:
    	pos3 = e.clientX;
    	pos4 = e.clientY;
    	document.onmouseup = closeDragElement;
    	// call a function whenever the cursor moves:
    	document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
	    e = e || window.event;
	    e.preventDefault();
	    // calculate the new cursor position:
	    pos1 = pos3 - e.clientX;
	    pos2 = pos4 - e.clientY;
	    pos3 = e.clientX;
	    pos4 = e.clientY;
	    // set the element's new position:
	    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    	elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }  

    function closeDragElement() {
	    // stop moving when mouse button is released:
	    document.onmouseup = null;
	    document.onmousemove = null;
    }
}

window.addEventListener('mousedown', function(e){

    for (let i = 0; i < windowsList.length; i++){                       // on each click, execute the windowActive which verify if the
        try{                                                            // window is active or not
            windowActive(document.getElementById(windowsList[i]), e);
        }
        catch(e){
            console.log(e);
        }
    }
});


function windowActive(elemnt, event){
    let header = document.getElementById( elemnt.id + "header");
    let task = document.getElementById( elemnt.id + "Task");

    if (event.target.id == task.id  || elemnt.contains(event.target) ||  task.contains(event.target)){               // Check if the user clicked on the window
        if (header.className.search(/ active/i) < 0     // Check if the user clicked on the title bar of the window
        ){
            if (document.getElementById(elemnt.id).className.search(/ minimized/i) > 0){
                document.getElementById(elemnt.id).className = document.getElementById(elemnt.id).className.replace(/ minimized/g,"");
            }

            pushWindow(document.getElementById(elemnt.id));                                     // Put the window on top
            header.className += " active";              // Add the active class in the title bar
            task.className += " active";
        }
        else if (event.target.id == task.id || task.contains(event.target)){
            header.className = header.className.replace(/ active/g,"");
            task.className = task.className.replace(/ active/g,"");
            document.getElementById(elemnt.id).className += " minimized";
        }
    }
    else{                                                                                       // Remove the "active" class of the title bar
        header.className = header.className.replace(/ active/g,"");
        task.className = task.className.replace(/ active/g,"");
    }
    
    /*if (event.target.id == elemnt.id + "Task"  || elemnt.contains(event.target) ||  document.getElementById( elemnt.id + "Task").contains(event.target)){               // Check if the user clicked on the window
        if (document.getElementById( elemnt.id + "header").className.search(/ active/i) < 0     // Check if the user clicked on the title bar of the window
        ){
            if (document.getElementById(elemnt.id).className.search(/ minimized/i) > 0){
                document.getElementById(elemnt.id).className = document.getElementById(elemnt.id).className.replace(/ minimized/g,"");
            }

            pushWindow(document.getElementById(elemnt.id));                                     // Put the window on top
            document.getElementById( elemnt.id + "header").className += " active";              // Add the active class in the title bar
            document.getElementById( elemnt.id + "Task").className += " active";
        }
        else if (event.target.id == elemnt.id + "Task" || document.getElementById( elemnt.id + "Task").contains(event.target)){
            document.getElementById( elemnt.id + "header").className = document.getElementById( elemnt.id + "header").className.replace(/ active/g,"");
            document.getElementById( elemnt.id + "Task").className = document.getElementById( elemnt.id + "Task").className.replace(/ active/g,"");
            document.getElementById( elemnt.id).className += " minimized";
        }
    }
    else{                                                                                       // Remove the "active" class of the title bar
        document.getElementById( elemnt.id + "header").className = document.getElementById( elemnt.id + "header").className.replace(/ active/g,"");
        document.getElementById( elemnt.id + "Task").className = document.getElementById( elemnt.id + "Task").className.replace(/ active/g,"");
    }*/
}


function pushWindow(window){
    for (let i = 0; i < winArea.children.length; i++ ){
        if (window.id == winArea.children[i].id){                           // Find where the selected window is on the div
            if (i != winArea.children.length-1){
                winArea.insertBefore(window, winArea.children[winArea.children.length]);// Put the selected window on top
                break;
            }
        }        
    }
}