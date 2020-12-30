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

    const timeArray = [{time: "9:00 AM", key:9},{time: "10:00 AM", key:10}, {time: "11:00 AM", key:11},
    {time: "12:00 PM", key:12}, {time: "1:00 PM", key:13}, {time: "2:00 PM", key:14}, {time: "3:00 PM", key:15},
    {time: "4:00 PM", key:16}, {time: "5:00 PM", key:17}] //this is an array of object that will have to be appended to the planner container

    function containerDisplay () { // this function is to create divs in the container this will create the rows needed
        const container = $(".container")
        for (var i = 0; i < timeArray.length; i++){
            //this section creates the time column with styling
            const row = $("<div>");
            row.attr("class", "row hour");
            container.append(row);
            const timeColumn = $("<div>");
            timeColumn.attr("class", "col-3"); // this sets the column width
            timeColumn.text(timeArray[i].time);
            timeColumn.css("font-size", "30px");
            timeColumn.css("text-align", "center");
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
            image.css("height", "65px")
            saveButton.append(image)
            row.append(saveButton);
        }
    }
    containerDisplay();

    function saveButton() {
        for(var i = 0; i < timeArray.length; i++){
            const saveButton = $("#savebox" + timeArray[i].key);
            saveButton.on("click", function(){
                const textBoxStorage = $("#textbox" + this[i].key)
                localStorage.setItem("input" + timeArray[i].key, textBoxStorage.value);
            })
        }
    }
    saveButton();



});