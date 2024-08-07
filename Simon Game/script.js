let audioRed = new Audio("./sounds/red.mp3");
let audioBlue = new Audio("./sounds/blue.mp3");
let audioGreen = new Audio("./sounds/green.mp3");
let audioYellow = new Audio("./sounds/yellow.mp3");
let audioWrong = new Audio("./sounds/wrong.mp3");

let listOfTileClicked = [];
let patternOfRandomlyGenratedTiles = [];

let step = 0;

function highlightTile(tile){
    $(tile).addClass("indicate");
    setTimeout(function(){
        $(tile).removeClass("indicate");
    }, 500);
}

function highlightTileWhenClicked(tile){
    $(tile).addClass("clicked");
    setTimeout(function(){
        $(tile).removeClass("clicked");
    }, 100);
}

function getRandomTile(pattern){
    var randomTileNum = Math.floor((Math.random() * 4) + 1);
    let randomTileQuery = ".color" + randomTileNum;
    let randomTileClass = "color" + randomTileNum;
    pattern.push(randomTileClass);
    highlightTile(randomTileQuery);
}

function buttonFunction(tileClicked){
    $("button").click(function(event) {
        highlightTileWhenClicked("." + $(event.target).attr('class'));
        tileClicked.push($(event.target).attr('class').slice(0, 6));

        if(step < patternOfRandomlyGenratedTiles.length){
            if(tileClicked[tileClicked.length - 1] !== patternOfRandomlyGenratedTiles[step]){
                $("h1").html("Game Over<br><em>reload to restart</em>");
                audioWrong.play();
                $("button").off();
            }
            if(tileClicked[tileClicked.length - 1] === patternOfRandomlyGenratedTiles[step]){
                step++;
                if(step >= patternOfRandomlyGenratedTiles.length){
                    step = 0;
                    setTimeout(function(){
                        getRandomTile(patternOfRandomlyGenratedTiles);
                        $("h1").text("Level: " + patternOfRandomlyGenratedTiles.length);
                    }, 700);
                }
            }
        }
    });

    $(".color1").click(function () { 
        audioRed.play();
    });
    $(".color2").click(function () {
        audioBlue.play();
    });
    $(".color3").click(function () {
        audioGreen.play();
    });
    $(".color4").click(function () {
        audioYellow.play();
    });
}

$(document).keypress(function() {

    $(document).off();

    $("h1").html("<em>Click through the highlighted sequence of tiles</em>");
    setTimeout(function(){
        $("h1").text("Level: " + patternOfRandomlyGenratedTiles.length);
    }, 2000);
    setTimeout(function(){
        getRandomTile(patternOfRandomlyGenratedTiles);
    }, 1200);

    buttonFunction(listOfTileClicked);

})