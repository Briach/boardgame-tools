<template>

  <div class="container-fluid my-auto" wfd-id="5">

  <div class="row mb-5 justify-content-center">
    <div class="col-11 col-sm-10 col-lg-6 text-center">
      <h2>Countdown</h2>
    </div>
  </div>
  <div class="row mb-10 justify-content-center">
    <div id="timer" class="col-11 col-sm-10 col-lg-6 justify-content-center mb-5">
      <div class="base-timer">
        <svg class="svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g class="circle">
            <path
              :stroke-dasharray="circleDasharray"
              class="path-remaining"
              d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "></path>
          </g>
        </svg>
        <span class="label">
          {{ getFormattedTimer }}
        </span>
      </div>
    </div>
  </div>

  <div class="row mt-10 justify-content-center">
    <form class="w-auto w-sm-half w-lg-quarter" onsubmit="return false;">
      <div class="form-row row-eq-spacing-sm">
        <div class="col-sm">
          <label for="timeIntervall" class="required">Intervall</label>
          <input type="number" class="form-control" id="timeIntervall" placeholder="10" required="required" v-model="timeIntervall">
          <div class="form-text">
            The number of minutes to count down. You can change this while the Countdown runs, it will keep the time it already counted.
          </div>
        </div>
      </div>
    </form>
  </div>

  <div class="row justify-content-center">
    <button class="btn btn-primary mx-20 my-20" v-if="!isCounterActive" v-on:click="startTimer()">Start</button>
    <button class="btn btn-primary mx-20 my-20" v-if="isCounterActive" v-on:click="pauseTimer()">Pause</button>
    <button class="btn btn-secondary mx-20 my-20" v-on:click="resetTimer()">Reset</button>
  </div>

  </div>

</template>

<script>
export default {
  name: 'SimpleTimer',
  props: {},
  data() {
    return {
      counter: 0,
      isCounterActive: false,
      isTimerCreated: false,
      timerName: "",
      timeIntervall: 10,
      stickyAlerts: document.getElementsByClassName("sticky-alerts")[0]
    }
  },

  computed: {
    timeLimit: function() {
      return this.timeIntervall * 60
    },
    timeLeft: function() {
      return this.timeLimit - this.counter;
    },
    getFormattedTimer: function () {
      var time = 0;
      if (this.counter >= this.timeLimit) { time = this.counter - this.timeLimit }
      else { time = this.timeLimit - this.counter; }

      var hours = (Math.floor(time / 60)).toString();
      var minutes = (time % 60).toString();
      
      if (hours.length < 2) {
        hours = "0" + hours;
      }
      if (minutes.length < 2) {
        minutes = "0" + minutes;
      }

      var formatted = hours + ":" + minutes;
      if (this.counter >= this.timeLimit) {
        formatted = "-" + formatted;
      }

      return formatted;
    },
    now: function () {
      return Date.now()
    },
    // Update the dasharray value as time passes, starting with 283
    circleDasharray() {
      if (this.counter >= this.timeLimit) {
        return "0 283";
      }
      else {
        return `${(this.timeFraction * 283).toFixed(0)} 283`;
      }
    },
    timeFraction() {
      const rawTimeFraction = this.timeLeft / this.timeLimit;
      return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction);
    },
  },
  methods: {
    startTimer: function () {
      this.isCounterActive = true;

      this.interval = setInterval(() => {
        if (this.counter == this.timeLimit) {
          var sound = new Audio();
          // source: http://soundbible.com/1252-Bleep.html
          sound.src = "../assets/audio/bleep.wav";
          sound.load();
          sound.play();
        }
        this.counter++;
      }, 1000)

      this.initStickyAlert({
        content: "Timer <b>" + this.timerName + "</b> was started!",      
        title: "Timer Started",     
        alertType: "",             
        fillType: "",               
        hasDismissButton: true,     
        timeShown: 5000             
      })
    },

    pauseTimer: function () {
      this.isCounterActive = false;
      clearInterval(this.interval);

      this.initStickyAlert({
        content: "Countdown was paused!",      
        title: "Timer Paused",     
        alertType: "",             
        fillType: "",               
        hasDismissButton: true,     
        timeShown: 5000             
      })
    },

    resetTimer: function () {
      this.counter = 0;
    },

    makeId: function(length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    toastAlert: function(alertId, timeShown) {
        var alertElement = document.getElementById(alertId);

        // Setting the default timeShown
        if (timeShown === undefined) {
            timeShown = 5000;
        }

        // Alert is only toasted if it does not have the .show class
        if (!alertElement.classList.contains("show")) {
            // Add .alert-block class if it does not exist
            if (!alertElement.classList.contains("alert-block")) {
                alertElement.classList.add("alert-block");
            }

            // Show the alert
            // The 0.25 seconds delay is for the animation
            setTimeout(function() {
                alertElement.classList.add("show");
            }, 250);

            // Wait some time (timeShown + 250) and fade out the alert
            var timeToFade = timeShown + 250;
            setTimeout(function() {
                alertElement.classList.add("fade");
            }, timeToFade);

            // Wait some more time (timeToFade + 500) and dispose the alert (by removing the .alert-block class)
            // Again, the extra delay is for the animation
            // Remove the .show and .fade classes (so the alert can be toasted again)
            var timeToDestroy = timeToFade + 500;
            setTimeout(function() {
                alertElement.classList.remove("alert-block");
                alertElement.classList.remove("show");
                alertElement.classList.remove("fade");
            }, timeToDestroy);
        }
    },

    initStickyAlert: function(param) {
        // Setting the variables from the param
        var content = ("content" in param) ? param.content: "";
        var title = ("title" in param) ? param.title: "";
        var alertType = ("alertType" in param) ? param.alertType: "";
        var fillType = ("fillType" in param) ? param.fillType: "";
        var hasDismissButton = ("hasDismissButton" in param) ? param.hasDismissButton: true;
        var timeShown = ("timeShown" in param) ? param.timeShown: 5000;

        // Create the alert element
        var alertElement = document.createElement("div");

        // Set ID to the alert element
        alertElement.setAttribute("id", this.makeId(6));

        // Add the title
        if (title) {
            content = "<h4 class='alert-heading'>" + title + "</h4>" + content;
        }

        // Add the classes to the alert element
        alertElement.classList.add("alert");
        if (alertType) {
            alertElement.classList.add(alertType);
        }
        if (fillType) {
            alertElement.classList.add(fillType);
        }

        // Add the close button to the content (if required)
        if (hasDismissButton) {
            content = "<button class='close' data-dismiss='alert' type='button' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" + content;
        }

        // Add the content to the alert element
        alertElement.innerHTML = content;

        // Append the alert element to the sticky alerts
        this.stickyAlerts.insertBefore(alertElement, this.stickyAlerts.childNodes[0]);

        // Toast the alert
        this.toastAlert(alertElement.getAttribute("id"), timeShown);
    }
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* Sets the containers height and width */
.base-timer {
  position: relative;
  width: 300px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.base-timer .svg {
  /* Flips the svg and makes the animation to move left-to-right */
  transform: scaleX(-1);
}

/* Removes SVG styling that would hide the time label */
.base-timer .circle {
  fill: none;
  stroke: none;
}

/* The SVG path that displays the timer's progress */
.base-timer .path-elapsed {
  stroke-width: 7px;
  stroke:grey;
}

.base-timer .path-remaining {
  /* Just as thick as the original ring */
  stroke-width: 7px;
  /* Rounds the line endings to create a seamless circle */
  stroke-linecap: round;
  /* Makes sure the animation starts at the top of the circle */
  transform: rotate(90deg);
  transform-origin: center;
  /* One second aligns with the speed of the countdown timer */
  transition: 1s linear all;
  /* Allows the ring to change color when the color value updates */
  stroke: var(--primary-color);
}
.dark mode .base-timer .path-remaining {
  stroke: var(--primary-color);
}

.base-timer .label {
  position: absolute;    

  /* Size should match the parent container */    
  width: 300px;
  height: 300px;

  /* Keep the label aligned to the top */    
  top: 0;

  /* Create a flexible box that centers content vertically and horizontally */    
  display: flex;
  align-items: center;
  justify-content: center;

  /* Sort of an arbitrary number; adjust to your liking */
  font-size: 48px;
}

</style>
