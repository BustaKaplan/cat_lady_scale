// Main JS File for Cat Lady Scale

$(document).ready(function(){

    function Behavior (description, pointValue) {
        this.description = description;
        this.pointValue = pointValue;
      };

    Behavior.prototype = {
        getListItem: function () {
            return '<div class="behavior-item">' +
                '<div class="description">' + this.description + '</div>' +
                '<div class="points">' + this.pointValue + '</div>' +
                '</div>';
        },
    }

    function Status (title, image, number) {
        this.title = title;
        this.image = image;
        this.number = number;
    }
    Status.prototype = {
        imagePath: function (){
            return 'images/' + this.image;
        }
    }

    var catLadyBehaviors = [
        new Behavior("agrees that there's a cat gif for everything", 3),
        new Behavior("own one dog", -2),
        new Behavior("own one cat", 2),
        new Behavior("own more than one cat", 5),
        new Behavior("own more than one dog", -5),
        new Behavior("takes selfies with cats", 4),
        new Behavior("has allergies", -3),
        new Behavior("is petting a cat right MEOW!", 5),
        new Behavior("buys wet food by the pallet", 4),
    ];

    var CAT_LADY_SCALE = {
        10: new Status("Cat-sylum", 'cat_lady.jpg', '10' ),
        9: new Status("ALL OF THE CATS", 'all_kittens.jpg', '9' ),
        8: new Status("Takin Selfies With Cats", 'cat_selfie.jpg', '8' ),
        7: new Status("A One-Cat Kind of Human", 'one_cat.jpg', '7' ),
        6: new Status("Cat Gifs Are...Alright", 'grumpy.jpg', '6' ),
        5: new Status("Indifferent", 'cat_dog_friends.jpg', '5' ),
        4: new Status("Ehh, Dogs Greater...", 'cat_backseat.jpg', '4' ),
        3: new Status("Dogs are where it's at", 'dogs.jpg', '3' ),
        2: new Status("I wish I were allergic", 'allergic.jpg', '2' ),
        1: new Status("Cats...like, the musical?", 'cats.jpg', '1' ),
        0: new Status("What's a cat? Never heard of 'em", 'dog_heaven.jpg', '0' ),
    };

    var catLady = {
        behaviors: [],
        addBehavior : function (newBehavior) {
          this.behaviors.push(newBehavior);
          this.updateStatus();
        },

        status: CAT_LADY_SCALE[5], // just the inital status... INDIFFERENT
        updateStatus: function () {
          var howCrazy = 5;
          for (var j = 0; j < this.behaviors.length; j++) {
          var howCrazy = howCrazy + catLady.behaviors[j].pointValue;
          console.log("index = " + howCrazy);
            if(howCrazy > 10) { howCrazy = 10};
            if(howCrazy < 0) { howCrazy = 0};
          }

this.status = CAT_LADY_SCALE[howCrazy];
console.log(this.status);
        },
    };

    $('#add-behavior').click(function(e){
      e.preventDefault();
        var i = $("option[selected]").val();


        var now = catLadyBehaviors[i];
        console.log(now);
        catLady.addBehavior(now);

        displayNewBehavior(now);
        function displayNewBehavior (behavior) {
          var listItem = behavior.getListItem();
          $(".behavior-list").append(listItem);
        }

    });

    window.onclick = displayStatus;
    function displayStatus (catLadyStatus) {
      var x = catLady.status.title;
      console.log("STATUS IS " + x);
      document.getElementById("oneDisplayed").src= "images/" + catLady.status.image;
      document.getElementById("status-title2").textContent =catLady.status.title;

      //var selectC = "c" + catLady.status.number;
      //$('.boldCircle').removeClass('boldCircle');
      //$('.boldNumber').removeClass('boldNumber');
      //console.log(selectC);
      //$('#'+selectC).addClass('boldCircle');
    //};

    var selectC = catLady.status.number;
    $('.boldCircle').removeClass('boldCircle');
    $('.boldNumber').removeClass('boldNumber');
    console.log(selectC);
    $('.scale'+selectC).addClass('boldNumber');
    $('#c'+selectC).addClass('boldCircle');
  };

    function fillBehaviorDropDown ()
    {
        for (var i = 0; i < catLadyBehaviors.length; i++) {
            var description = catLadyBehaviors[i].description;
            var points = catLadyBehaviors[i].pointValue;
            var option = '<option value="' + i +'">' + description + '</option>';
            $('#new-behavior-form .behaviors').append(option);
        }
    }

    $('body').on('change', 'select', function(){
        $('option[selected]').removeAttr('selected');
        $("option[value=" + this.value + "]").attr('selected', true);
    });

    // initial setup
    fillBehaviorDropDown(); // fill drop down
    displayStatus(catLady.status); // display initial cat lady status
    console.log(catLady)
});
