class BeatMachine {
    constructor() {
        // Selectors
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
    }

    // Methods
    isActive() {
        this.classList.toggle('active');
    }

    repeat() {
        let step = this.index % 8;
        this.index++;
        const activeBar = document.querySelectorAll(`.b${step}`);
        activeBar.forEach(bar => {
            bar.style.animation = 'playTrack .3s alternate ease-in-out 2';
        })
    }

    start() {
        const interval = (60/this.bpm) * 1000;
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }

    updateBtn() {
        if (!this.isPlaying) {
            this.playBtn.innerText = 'Stop';
            this.playBtn.classList.add('active');
        } else {
            this.playBtn.innerText = 'Play';
            this.playBtn.classList.remove('active');
        }
    }
}

// Instance
const beatMachine = new BeatMachine();

// EventListeners
beatMachine.pads.forEach(pad => {
    pad.addEventListener('click', beatMachine.isActive);
    pad.addEventListener('animationend', function() {
        this.style.animation = '';
    })
})

beatMachine.playBtn.addEventListener('click', function() {
    beatMachine.updateBtn();
    beatMachine.start();
})