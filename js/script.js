var playing = false; //Setting the play variable to false
var score;
var action;
var timeremaining;
var correctAnswer;
//If we click on the start/reset
document.getElementById("startReset").onclick = function(){
     //Checking to see if we are playing   
     if(playing == true){
         
         //Button is a reset button and we are going to load the page 
        location.reload();
        
     }else{
         
         //If we are not playing     
         score = 0;    //Set score to zero
         playing = true;    
         document.getElementById("scorevalue").innerHTML = score;  //Change the value of the score
         show('score');
         //show countdown box    
         document.getElementById("timeRemaining").style.display = 'block';
         timeremaining = 13; //Setting initial timer timeremaining to 60secs
         document.getElementById('timeremainingValue').innerHTML = timeremaining;
         
         //Hide gameover box
         hide('gameOver');
         //Change the button to reset    
         document.getElementById("startReset").innerHTML = 'Reset Game';    
            
         startCountdown();
         
         //Generate multiple questions and answers
         generateQA();
         
        }
}


for(i = 1; i < 5; i++){
 //Clicking on 1st box to check for answer
document.getElementById('box' + i).onclick = function(){
  if(playing == true){  //Check if the user is playing
      if(this.innerHTML == correctAnswer){
          //Display a correct message and hide the wrong one
          hide('wrong');
          show('correct');
          //Increment the score
          score++;
          //Display the incremented the score
          document.getElementById('scorevalue').innerHTML = score;
          //Remove the correct message after 1.2 sec
          setTimeout(function(){hide('correct')},1200);
          //Generate multiple questions and answers after selecting a correct answer
         generateQA();
      }else{
          //Hide the correct message
          hide('correct');
          //Disply the wrong message
          show('wrong');
          //Remove display after 1.2 sec
          setTimeout(function(){hide('wrong')},1200);
      }
    }    
  }   
}

//Reduce the time by one second using loops 
//Start Countdown function 
function startCountdown(){
 action = setInterval(function(){
     //Reduce time by 1
     timeremaining -= 1;
     //target the value in timeremaning span
     document.getElementById('timeremainingValue').innerHTML = timeremaining;
     
     //Change the color of the timer when its below 10
     if(timeremaining < 10){
        document.getElementById('timeremainingValue').style.color = 'red';
        }
     
     //Checking to see if the time has reached zero
     if(timeremaining == 0){
         stopCountDown(); //Calling the stopCounter function when time remaining reaches 0
         
        //Displaying the game over message box whent he time remaining reaches 0 
        show('gameOver'); 
         
       //Displaying a game over display message with the score     
       document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
       hide('score');     
         
        // Calling the hide element functions
        hide('timeRemaining'); 
        hide('correct'); 
        hide('wrong'); 
        playing = false;
        //Change the start game button to reset 
        document.getElementById("startReset").innerHTML = 'Start Game'; 
        //Remove the red color on timer
        document.getElementById("timeremainingValue").removeAttribute('style'); 
        }
     
  }, 1000);       
}

 //Stop countdown function
 function stopCountDown(){
   clearInterval(action);    
 }

//Hide element function    
function hide(Id){
   document.getElementById(Id).style.display = 'none';   
}

//Show element function    
function show(Id){
   document.getElementById(Id).style.display = 'block';   
}

//Function to generate questions and multiple answers
function generateQA(){
    //Generating a random number
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    var operations = ['+', 'x'];
    var rand = Math.floor(Math.random() * 2);
    if(rand == 0){
       //Display an addition operation hen radn is 0    
       document.getElementById('question').innerHTML = x + '+' + y;
       correctAnswer = x + y;     
       }else{
       //Display a multiplication operation when rand is 1       
       document.getElementById('question').innerHTML = x + 'x' + y;
       correctAnswer = x * y;       
       } 
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById('box' + correctPosition).innerHTML = correctAnswer;//Fill one box wuith the correct answer
    
    //Fill the array with answers
    var answers = [correctAnswer];
    
    for(i = 1; i < 5; i++){
        if(i != correctPosition){
          //Creating wrong answer options
          var wrongAnswer;
        do{
             //Generating a wrong number
             wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random())); 
        }   while(answers.indexOf(wrongAnswer) > -1) //Checking to see if the wrong answer is in the array
          document.getElementById('box' + i).innerHTML = wrongAnswer;
          //Add wrongs answers to the array    
          answers.push(wrongAnswer);    
      }
    }
    
}

