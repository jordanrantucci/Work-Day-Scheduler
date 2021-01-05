$(document).ready(function() { // this is used to let the HTML load before calling the JS

    const timeDate = $("<div>")
    timeDate.attr("class", "time-block") // this creates a variable and generates a div
    $(".jumbotron").append(timeDate); // this appends the div to the jumbotron (top of the page)
    
    function timeDisplay () { //a function for time display
        const timeBlock = moment().format('MMMM Do YYYY, h:mm:ss a') //the moment syntax was taken from the moment.js library
        timeDate.text(timeBlock) //this allows the time to appear as text
    } 
    timeDisplay();
    setInterval(timeDisplay, 1000) // set interval to 1000 for 1,000 ms per second

    
    const timeArray = [
        {time: "9:00 AM", key:9},
        {time: "10:00 AM", key:10},
        {time: "11:00 AM", key:11},
        {time: "12:00 PM", key:12},
        {time: "1:00 PM", key:13},
        {time: "2:00 PM", key:14},
        {time: "3:00 PM", key:15},
        {time: "4:00 PM", key:16},
        {time: "5:00 PM", key:17}
    ]; //this is an array of object that will have to be appended to the planner container

    function saveButton(){ //This is the function for the save button to store the text locally
        $(".saveBtn").on("click", function(){
            const time = $(this).parent().attr("id"); //this is the key
            const input = $(this).siblings(".input").val(); //this is the value
            localStorage.setItem(time, input); // this will store the key and value
        })
    }
    //this function is to call the local storage on page reload.
    function getLocalStorage() {
        const numberArray = [9, 10, 11, 12, 13, 14, 15, 16, 17]
        const varArray = ["hour9", "hour10", "hour11", "hour12", "hour13", "hour14", "hour15", "hour16", "hour17"]
        for (var i = 0; i < numberArray.length; i++) { //the for loop runs through the length of the numbers array
            varArray[i] = localStorage.getItem("Hour" + numberArray[i]) //and is getting the hour and number array at i
            $("#textbox" + numberArray[i]).text(varArray[i]); // allowing for the text to be displayed in the textbox 
        }
    }
    function clearButton() { // this fuction creates the clear button 
        const clearButton = $("<button>") // this uses JQuery to generate a button
        clearButton.attr("class", "col-12 clearBtn") // this adds the class and matches the CSS name
        clearButton.text("Clear Schedule") // this generates the text inside the clear button
        $(".container").append(clearButton) //this appends the clear button to the page
    }


    function containerDisplay () { // this function is to create divs in the container this will create the rows needed
        const container = $(".container")
        for (var i = 0; i < timeArray.length; i++){ //the for loop will run through the time array length and create these elements in the container 
            //this section creates the time column with styling
            const row = $("<div>"); //jQuery to create the div element
            row.attr("class", "row hour"); //the attr method created attributes 
            row.attr("id", "Hour"+timeArray[i].key) //the id and the hour plus time array and setting the intiger
            container.append(row); //appends the container
            const timeColumn = $("<div>");
            timeColumn.attr("class", "col-3"); // this sets the column width
            timeColumn.text(timeArray[i].time); //the text method sets or returns the text content of the selected elements 
            row.append(timeColumn);
            // this section creates the event description column
            const descriptionColumn = $("<textarea>");
            descriptionColumn.attr("class", "col-7 input");
            descriptionColumn.attr("id", "textbox" + timeArray[i].key)
            row.append(descriptionColumn)
            // this section creates the save button column
            const saveButton = $("<button>");
            saveButton.attr("class", "col-2 saveBtn");
            saveButton.attr("id", "savebox" + timeArray[i].key)
            const image = $("<img>")
            image.attr("src", "./assets/save.jpg")//this adds a save image
            image.attr("id", "floppydisc") //this creates the id that is needed for the image to link CSS
            saveButton.append(image)
            row.append(saveButton);
        }
    }

    function timeChange () {
        const date = new Date();
        const hour = parseInt(date.getHours())
        for (var i = 0; i < 9; i++){
            if (hour === timeArray[i].key) {
                $("#textbox" + timeArray[i].key).attr("class", "col-7 input present")
            } else if (timeArray[i].key < hour) {
                $("#textbox" + timeArray[i].key).attr("class", "col-7 input past")
            } else if (timeArray[i].key > hour) {
                $("#textbox" + timeArray[i].key).attr("class", "col-7 input future")
            }
        }
    }

    function clearButtonOnClick() {
        $(".clearBtn").on("click", function () {
            if (confirm("Are you sure you want to clear all?")) {
                const numberArray = [9, 10, 11, 12, 13, 14, 15, 16, 17] 
                for (var i = 0; i < numberArray.length; i++) {
                    localStorage.clear("Hour" + numberArray[i])
                    $("#textbox" + numberArray[i]).val(' ')
                }
            }  
        })
    }

    containerDisplay();
    saveButton();
    getLocalStorage();
    setInterval(timeChange, 1000);
    timeChange();
    clearButton();
    clearButtonOnClick();

});