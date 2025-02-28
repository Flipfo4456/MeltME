//66010338 was the creator
// Get the audio element and the button
const audio = document.getElementById('background-music');
const button = document.getElementById('toggle-button');
const volumeSlider = document.getElementById('volume-slider');
const AudioPanel = document.getElementById('AudioPanel');

//audio.play().catch(error => console.log("Auto-play blocked:", error));
    // Toggle Audio panel visibility
function toggleAudio() {
    AudioPanel.style.display = (AudioPanel.style.display === "block") ? "none" : "block";
}

// Flag to track the music state
let isMusicPlaying = false;

// Add event listener for button click
button.addEventListener('click', () => {
    if (isMusicPlaying) {
        // Pause the music and update button text
        audio.pause();
        button.textContent = "Turn Music Off";
        button.style.backgroundColor = "rgb(246, 25, 25)"; // Change background
         
    } else {
        // Play the music and update button text
        audio.play();
        button.textContent = "Turn Music On";
        button.style.backgroundColor = "rgb(139, 209, 35)"; // Change background
    }
    // Toggle the music state
    isMusicPlaying = !isMusicPlaying;
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});


const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
// const rest = document.getElementById("rest");

const timer = document.getElementById("timer");

let timeLeft = 10;
let totalTime = 10; // Set full duration (example: 1 minute)
let extraTime = 5;
let bufferNowTime;
let fireInterval;
let smokeInterval;

const updateTimer = () => {
    
    const minutes = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

};

const updateExtra = () => {
    
    const min = Math.floor(extraTime / 60);
    const sec = extraTime % 60;
    timer.innerHTML = `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;

};

if(start.disabled = true && timeLeft == 0){
        alert("Pls, Click reset");
    }
const startTimer = () =>{
    
    start.disabled = true; // Disable start button to prevent spamming

    bufferNowTime = setInterval(() => {

        if (timeLeft > 0) {
            start.disabled = true;
            timeLeft--;
            document.getElementById("candle").style.height = (100 * (timeLeft / totalTime)) + "px";
            updateTimer();
        }else{
            alert("Session end!"); // You can modify this action
            start.disabled = true;
            clearInterval(bufferNowTime);
            clearInterval(fireInterval); // Stop fire particles
            clearInterval(smokeInterval); // Stop smoke particles when the flame is out
            document.getElementById("flame").style.display = "none";
            createSmoke(); 
            timeLeft=0;
            updateTimer();

            const extraCountdown = setInterval(() => {
                stop.disabled = true;
                reset.disabled = true;
                if (extraTime > 0 && timeLeft==0) {
                    extraTime--;
                    updateExtra(); // Update the timer display
                } else {
                    clearInterval(extraCountdown);
                    alert("Extra time over!"); // You can modify this action
                    stop.disabled = false;
                    reset.disabled = false;
                    // start.disabled = false; // Re-enable start button after extra time
                }
            }, 1000);
        }
        
        
    }, 1000);//-1000ms = 1secs
    
    
    extraTime = 5; //secs
    smokeInterval = setInterval(createSmokeParticles, 1500); // Generate smoke while flame is burning
    fireInterval = setInterval(createFireParticles, 500); // Generate fire particles
};
                
        
        
    const stopTimer = () => {
        clearInterval(bufferNowTime);
                    
        /*            
        if (timeLeft > 1500) {
            timeLeft = 300; // Set count down 
            updateTimer();
                        
            // immediately
            let countdownInterval = setInterval(() => {
                timeLeft--; 
                updateTimer();
                            
                if (timeLeft <= 0) {
                    timeLeft = 0; // Set count down 
                    alert("Time's up!");
                    totalTime = 1500; 
                    clearInterval(countdownInterval); // Stop the countdown when time reaches 0
                    start.disabled = false; // can press start
                }
            }, 1000); // Countdown every 1 sec
        } else {*/
        //  Time under or  =  expected val
        updateTimer();
        start.disabled = false; // can press start
        // }
            
            
        start.disabled = false; // can press start
    };




    const resetTimer = () => {
        clearInterval(bufferNowTime);
        clearInterval(fireInterval);
        clearInterval(smokeInterval);

        timeLeft = totalTime; // รีเซ็ตเวลา
        updateTimer();
        
        document.getElementById("candle").style.height = "100px"; // รีเซ็ตความสูงเทียน
        document.getElementById("flame").style.display = "block"; // แสดงเปลวไฟใหม่

        start.disabled = false;
    };




    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopTimer();
        }
    });


    function createFireParticles() {
        if (timeLeft <= 0) return; // Stop fire particles when time is up

        for (let i = 0; i < 3; i++) {  
            setTimeout(() => {
                const fire = document.createElement("div");
                fire.classList.add("fire-particle");

                // More random positioning
                let randomX = Math.random() * 20 - 10; // Random left movement (-10 to 10)
                let randomY = Math.random() * 10 - 5;  // Random upward movement (-5 to 5)
                
                fire.style.left = `calc(50% + ${randomX}px)`;
                fire.style.top = `calc(-50px + ${randomY}px)`;
                fire.style.animationDuration = (0.5 + Math.random() * 0.5) + "s"; 
                
                document.getElementById("candle").appendChild(fire);
                setTimeout(() => fire.remove(), 1000); // Remove fire after animation
            }, i * 100);
        }
    }

    function createSmokeParticles() {
        if (timeLeft <= 0) return; // Stop smoke particles when time is up

        for (let i = 0; i < 3; i++) {  
            setTimeout(() => {
                const smoke = document.createElement("div");
                smoke.classList.add("smoke-particle");

                // More random positioning
                let randomX = Math.random() * 20 - 10; // Random left movement (-10 to 10)
                let randomY = Math.random() * 15 - 7;  // Random slight vertical variation (-7 to 7)

                smoke.style.left = `calc(50% + ${randomX}px)`;
                smoke.style.top = `calc(-70px + ${randomY}px)`;
                smoke.style.animationDuration = (2 + Math.random()) + "s"; // Random duration

                document.getElementById("candle").appendChild(smoke);
                setTimeout(() => smoke.remove(), 3000); // Remove after animation
            }, i * 300);
        }
    }



    function createSmoke() {
        const smoke = document.createElement("div");
        smoke.classList.add("smoke");
        document.getElementById("candle").appendChild(smoke);
        setTimeout(() => smoke.remove(), 2000); // Remove after animation
    }
    updateTimer(); // Initialize the timer display



    start.addEventListener("click", ()=>{
        if(start.disabled = true && timeLeft == 0){
        alert("Pls, Click reset");
    }else{startTimer();}
    });


    stop.addEventListener("click", stopTimer);
    reset.addEventListener("click", resetTimer);

    /*rest.addEventListener("click", () => {
            timeLeft += 5; // Add 5 minutes (300 seconds)
            //totalTime += 5; // Increase total time for progress calculation
            updateTimer(); // Update the display
        });*/