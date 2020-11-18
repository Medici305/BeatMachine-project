class BeatMachine {
  constructor() {
    // Selectors
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.selects = document.querySelectorAll("select");
    this.muteBtn = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
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

  muteSound(e) {
    const muteIndex = e.target.getAttribute("data-track");
    const muteIcon = e.target.children[0];
    if (muteIcon.classList.contains("fa-volume-up")) {
      muteIcon.classList.remove("fa-volume-up");
      muteIcon.classList.add("fa-microphone-slash");
    } else {
      muteIcon.classList.add("fa-volume-up");
      muteIcon.classList.remove("fa-microphone-slash");
    }
    if (muteIcon.classList.contains("fa-microphone-slash")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }

  changeTempo(e) {
    const selectBar = document.querySelector(".tempo-nr");
    selectBar.innerText = e.target.value;
    let color = `hsl(0, ${e.target.value}%, 50%)`;
    selectBar.style.color = color;
  }

  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playButton = document.querySelector(".play");
    if (playButton.classList.contains("active")) {
      this.start();
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

beatMachine.muteBtn.forEach((mute) => {
  mute.addEventListener("click", function (e) {
    beatMachine.muteSound(e);
  });
});

beatMachine.tempoSlider.addEventListener("input", function (e) {
  beatMachine.changeTempo(e);
});

beatMachine.tempoSlider.addEventListener("change", function (e) {
  beatMachine.updateTempo(e);
});
