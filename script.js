class Stopwatch{
    #currentTime = 0;
    #idInterval = 0;

    start(callback = () => {}){
        this.#idInterval = setInterval(() => {
            this.#currentTime++;
            callback();
        }, 1000);
    }

    stop(){
        clearInterval(this.#idInterval);
    }

    reset(callback = () => {}){
        this.#currentTime = 0;
        this.stop();
        callback();
    }

    get elapsedTime(){
        return `${Stopwatch.formatTime(this.#currentTime)}`
    }

    static formatTime(ThisSeconds){
        let hours = Math.floor(ThisSeconds / 3600);
        let minutes = Math.floor((ThisSeconds % 3600) / 60);
        let seconds = Math.floor(ThisSeconds - hours * 3600 - minutes * 60);

        return `${Stopwatch.ZeroPadding(hours)} : ${Stopwatch.ZeroPadding(minutes)} : ${Stopwatch.ZeroPadding(seconds)}`;
   }

    static ZeroPadding(number){
        let numberInString = String(number);
        
        return numberInString.length === 1? `0${numberInString}` : numberInString;
    }
}

function updateDisplay(){
    pStopwatch.textContent = sw1.elapsedTime;
}

function startStopwacht(){
    sw1.start(updateDisplay);
    buttonStart.removeEventListener('click', startStopwacht);
}

const pStopwatch = document.getElementById("time"); 
const buttonStart = document.getElementById("start");
const buttonStop = document.getElementById("stop");
const buttonReset = document.getElementById("reset");
const sw1 = new Stopwatch();

buttonStart.addEventListener("click", startStopwacht);

buttonStop.addEventListener("click", () =>{
    sw1.stop();
    buttonStart.addEventListener("click", startStopwacht);
});

buttonReset.addEventListener("click", () =>{
    sw1.reset(updateDisplay);
    buttonStart.addEventListener("click", startStopwacht);
});