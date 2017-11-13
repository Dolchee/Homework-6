console.log("script.js connected");

$(document).ready(function() {
    // STEP 1. create Array of sports
    var topics = ["Soccer", "Football", "Basketball", "IceHockey", "Baseball", "Tennis", "Golf", "Motorsport", "Cricket", "Volleyball", "Raquetball", "Dodgeball", "Tabletennis"];
    
    // STEP 2. create function that shows the gif buttons (07 MovieButton Exercise)
    
    function renderButtons () {
        $("#gifButtons").empty();
        for (var i = 0; i < topics.length; i++) { 
            var gifButton = $("<button>");
            gifButton.addClass("sport");
            gifButton.addClass("button");
            gifButton.attr("data-name", topics[i]);
            gifButton.text(topics[i]);
            $("#gifButtons").append(gifButton);
        }
    }
    
    // STEP 3. create a function so when user clicks on a button the gifs show up (08-LogMovieName)
    
    function addButton () {
        $("#addGif").on("click", function() {
            var topic = $("sportsInput").val().trim();
            topics.push(topic);
            
            renderButtons();

        });
    }
    
    
    // (09-ClickJSON)
    function displayGifs () {
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=iQ284OSEPYM6fo7QJGMQCnRO9KWDLntU";
        console.log(queryURL);
        
        $.ajax({
            url:queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response);
            $("#gif-view").empty();
         
            
            var results = response.data;
            
            for (var i=0; i < results.length; i++) {
                
            
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            var gifImage = $("<img>");
            
            gifImage.attr("src", results[i].images.fixed_height.url);
            console.log(results[i].images.fixed_height.url);
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
            gifImage.attr("data-state", "still");
            gifImage.addClass("image");
            gifDiv.append(gifImage);
           
            $("#gif-view").prepend(gifDiv);
        }
        });
    }
renderButtons();    
addButton();
$(document).on("click",".sport", displayGifs);
//pausing gif exercise
$(document).on("click",".image", function (){
    var state = $(this).attr('data-state');
        if ( state == 'still'){
             $(this).attr('src', $(this).data('animate'));
             $(this).attr('data-state', 'animate');
        }else{
             $(this).attr('src', $(this).data('still'));
             $(this).attr('data-state', 'still');
        }
    
    });
});
    
    