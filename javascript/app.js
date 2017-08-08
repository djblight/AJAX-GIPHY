// Initial array of monsters
      var monsters = ["Godzilla", "Ghidorah", "Mechagodzilla", "Mothra", "Destoroyah", "Anguirus", "Hedorah", "Rodan", "MUTOS", "King Kong", "Titanosaurus", "Battra", "Megalon", "SpaceGodzilla", "Baragon", "Kamacuras", "Ebirah", "Gabara"];

      // displayMonsterInfo function re-renders the HTML to display the appropriate content
      function displayMonsterInfo() {

        // var gif - "img src"
        var monster = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+monster+"&apikey=c9dea75e2f16401196c8f12b6f2b72bd&limit=10&rating=pg";

        

        // Creating an AJAX call for the specific monster button being clicked
       
        
        $.ajax({url: queryURL,method: "GET"})
          .done(function(response) {

          for(var i=0;i<response.data.length;i++){
            var still = response.data[i].images.downsized_still.url;
            var animated = response.data[i].images.downsized.url;
            var monsterImg = $("<img>").attr("src", still);
            monsterImg.attr("data-still", still);
            monsterImg.attr("data-animated", animated);
            monsterImg.attr("data-status", still);
            
          $('#gifdiv').prepend("<p>Rating: "+response.data[i].rating+"</p>");

          $('#gifdiv').prepend(monsterImg);
                    
          };       
          });
         };
              
          $(document).on("click", "img", function(){
            var state = $(this).attr("data-status");

            if (state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-status", "animated");
            var audioroar = document.getElementById("roar");
            audioroar.play();

          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-status", "still");

          }
        });
         
          
      // Function for displaying monster data
      function renderButtons() {

        // Deleting the monsters prior to adding new monsters
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < monsters.length; i++) {

          // Then dynamicaly generating buttons for each monster in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of monster to our button
          a.addClass("monster");
          // Adding a data-attribute
          a.attr("data-name", monsters[i]);
          // Providing the initial button text
          a.text(monsters[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a monster button is clicked
      $("#add-monster").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var monster = $("#monster-input").val().trim();

      // Setting the input value to a variable and then clearing the input
        $("input[type='text']").val("");
        // Adding monster from the textbox to our array
        monsters.push(monster);

        // Calling renderButtons which handles the processing of our monster array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "monster"
      $(document).on("click", ".monster", displayMonsterInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();