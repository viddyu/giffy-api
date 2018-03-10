$(document).ready(() => {
    
    var topics = ["Martian man hunter", "Superman", "Deadpool", "Wolverine", "Nightcrawler",
        "Black panther", "Iron man", "Wonderwoman", "Batman",
    ];

    // Function to render topics
    function displayGif() {
        
        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            gif + "&api_key=lE7OSkoYyNb9OvcuX66DZXpeiiZAYAX8&rating=pg&limit=10";

         
        $.get(queryURL).then(function (response) {
            console.log(response); 
            var results = response.data;

            
            for (var i = 0; i < results.length; i++) {

                // create a <div> to hold the gif,
                var gifDiv = $("<div>").addClass("gifStyle");

                // retrieve still url that will be used to display initial image
                // and store it in var stillGif.
                var stillGif = results[i].images.original_still.url;

                // Retrieve the URL for the animated gif  and store it in var animateGif.
                var animateGif = results[i].images.original.url;

                var image = $("<img>").attr("src", stillGif).attr("gif-still", stillGif).attr("state", "still").attr("gif-animate", animateGif).addClass("gif").attr("alt", "famous athlete");

                // Retrieve the rating and store in 'rating' var
                var rating = results[i].rating;
                // Create a <p> to display rating
                var p = $("<p>").text("Rating: " + rating);

                // Event listener for the qimage clicked
                $(image).on("click", function () {
                    // Get the value of the attribute clicked and store it in var state
                    var state = $(this).attr("state");
                    // Toggle between state="still" and state="animate" with each click
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("gif-animate"));
                        $(this).attr("state", "animate");
                    } else if (state === "animate") {
                        $(this).attr("src", $(this).attr("gif-still"));
                        $(this).attr("state", "still");
                    }
                });

                // Append the image
                gifDiv.append(image);
                // Append the paragraph
                gifDiv.append(p);

                // Add gifs to the beginning of gifs-view.
                $("#gifs-view").prepend(gifDiv);

            }
        })
    }
    
    // Function for generating gif buttons
    function renderButtons() {
        
        // Delete the gifs prior to re-looping through the array
        $("#buttons-view").empty();
        
        // Loop through topics array
        for (var i = 0; i < topics.length; i++) {
            
            // Generate a button for each gif in the array
            var a = $("<button>");
            // Add a class of gif-btn to each button
            a.addClass("gif-btn btn btn-primary");
            // Add an attribute of data-name to each button
            a.attr("data-name", topics[i]);
            // Labeling the button with the array item string
            a.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    $("#gif-input").click(
        function () {
            $(this).val('');
        });

    $("#add-gif").on("click", function (event) {

        event.preventDefault();


        var gif = $("#gif-input").val().trim();

        
        if (gif.length === 0) {
            alert("Text-box is empty!")
            return false
        }

        
        topics.push(gif);

        
        renderButtons();
    });
    
    // Call the renderButtons function to display the intial buttons
    renderButtons();

    
    $(document).on("click", ".gif-btn", displayGif);

})