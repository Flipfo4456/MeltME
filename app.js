//66010338 was the creator
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

const timer = document.getElementById("timer");

//let timeLeft = 1500; //25 min = 1500 secs
//let timeLeft = 10; //Test
let timeLeft = 0; //Forward Test
let bufferNowTime;

const updateTimer = () =>{
    const minutes = Math.floor(timeLeft/60);// 25 min exactly, OntheLeft
    const secs = timeLeft %60;//ontheright

    timer.innerHTML = `${minutes.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`;//ชื่อตัวแปรint.toString(แปลง).padStart(จำนวนสตริง,"เติมอะไรถ้าไม่มี(0ใส่ข้างหน้า)")

};


/*                    Forward                                             */ 
const startTimer = () =>{
    start.disabled = true; // To Prevent spamming

    bufferNowTime = setInterval(() => {

        timeLeft++;
        updateTimer();
    
        
        /*if(timeLeft > 10 ){
            clearInterval(bufferNowTime);
            alert("Time's up!");


           
            timeLeft = 0; //Forward Test
            updateTimer();
            start.disabled = false;
        }*/
        
        
        
    }, 1000);//-1000ms = 1secs
    
};

const stopTimer = () => {
    clearInterval(bufferNowTime);


    if (timeLeft > 10) {
        timeLeft = 5; // Set count down 
        updateTimer();
        
        // immediately
        let countdownInterval = setInterval(() => {
            timeLeft--; 
            updateTimer();

            if (timeLeft <= 0) {
                clearInterval(countdownInterval); // Stop the countdown when time reaches 0
                start.disabled = false; // can press start
            }
        }, 1000); // Countdown every 1 sec
    } else {
        //  Time under or  =  expected val
        updateTimer();
        start.disabled = false; // can press start
    }

    /*
    if (timeLeft > 10) {
        timeLeft = 0; // Reset the time if it's over 10 seconds
        updateTimer();
    }*/


    start.disabled = false; // can press start
};

const resetTimer = () => {
    clearInterval(bufferNowTime);
    
    timeLeft = 0; //Forward Test
    updateTimer();
    start.disabled = false;
    
};







document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        stopTimer(); // Pause when user quit our tab
    } 
});

start.addEventListener("click", startTimer);//Wait for any actions

stop.addEventListener("click", stopTimer);//Wait for any actions

reset.addEventListener("click", resetTimer);//Wait for any actions





/*backward*/
/*
const startTimer = () =>{
    start.disabled = true; // Disable start button to prevent spamming

    bufferNowTime = setInterval(() => {

        timeLeft--;
        updateTimer();
    
        if(timeLeft < 0 ){
            clearInterval(bufferNowTime);
            alert("Time's up!");


            //timeLeft = 1500;
            timeLeft = 10;
            updateTimer();
            start.disabled = false;
        }
        
        
        
    }, 1000);//-1000ms = 1secs
    
};

const stopTimer = () => {
    clearInterval(bufferNowTime);
    start.disabled = false; // Re-enable start button when stopped
};

const resetTimer = () => {
    clearInterval(bufferNowTime);
    
    
    
    //timeLeft=1500;
    timeLeft = 10;
    updateTimer();
    start.disabled = false;
    
};










document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        stopTimer(); // Pause when tab is hidden
    } 
});

start.addEventListener("click", startTimer);//Wait for any actions

stop.addEventListener("click", stopTimer);//Wait for any actions

reset.addEventListener("click", resetTimer);//Wait for any actions

*/
