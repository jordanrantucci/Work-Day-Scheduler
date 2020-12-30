$(document).ready(function() { // this is used to let the HTML load before calling the JS

    const timeDate = $("<div>") // this creates a variable and generates a div
    $(".jumbotron").append(timeDate); // this appends the div to the jumbotron (top of the page)
    
    function timeDisplay () { //a function for time display
        const timeBlock = moment().format('MMMM Do YYYY, h:mm:ss a') //the moment syntax was taken from the moment.js library
        timeDate.text(timeBlock) //this allows the time to appear as text
    } 
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
            timeColumn.attr("class", "col-3");
            timeColumn.text(timeArray[i].time);
            timeColumn.css("font-size", "30px");
            timeColumn.css("text-align", "center");
            row.append(timeColumn);
            // this section creates the event description column
            const descriptionColumn = $("<textarea>");
            descriptionColumn.attr("class", "col-7 input");
            row.append(descriptionColumn)

        }

    }
    containerDisplay();



});