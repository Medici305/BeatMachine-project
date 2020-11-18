class BeatMachine {
  constructor() {
    // Selectors
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.selects = document.querySelectorAll("select");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }

  // Methods
  isActive() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 8;
    this.index++;
    const activeBar = document.querySelectorAll(`.b${step}`);
    activeBar.forEach((bar) => {
      bar.style.animation = "playTrack .3s alternate ease-in-out 2";
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
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
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }

  changeSound(e) {
    const selectName = e.target.name;
    const selectValue = e.target.value;
    switch (selectName) {
      case "kick-select":
        this.kickAudio.src = selectValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectValue;
        break;
    }
  }
}

// Instance
const beatMachine = new BeatMachine();

// EventListeners
beatMachine.pads.forEach((pad) => {
  pad.addEventListener("click", beatMachine.isActive);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

beatMachine.playBtn.addEventListener("click", function () {
  beatMachine.updateBtn();
  beatMachine.start();
});

beatMachine.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    beatMachine.changeSound(e);
  });
});
