<template>

  <div class="container-fluid my-auto" wfd-id="5">  

  <div class="row mb-5 justify-content-center">
    <div class="col-11 col-sm-10 col-lg-6 text-center">
      <h2>Count Up</h2>
    </div>
  </div>
  <div class="row mb-10 justify-content-center">
    <div id="timer" class="col-11 col-sm-10 col-lg-6 justify-content-center mb-5">
      <div class="row justify-content-center">
            <span class="timer-text text-center col-sm-10 col-lg-8">
            {{ getFormattedTimer }}
            </span>
      </div>
    </div>
  </div>

  <div class="row m-10 mb-20 justify-content-center">
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
      interval: undefined,
      startTime: "",
      stopTime: "",
      stickyAlerts: document.getElementsByClassName("sticky-alerts")[0]
    }
  },

  computed: {
    getFormattedTimer: function () {
      var hours = (Math.floor(this.counter / 60)).toString();
      var minutes = (this.counter % 60).toString();

      if (hours.length < 2) {
        hours = "0" + hours;
      }
      if (minutes.length < 2) {
        minutes = "0" + minutes;
      }
      return hours + ":" + minutes;
    },
    now: function () {
      return Date.now()
    }
  },
  methods: {

    renameTimer: function () {
      var input = document.getElementById('timerName');

      if (input.value !== "") {
        this.timerName = input.value;
        this.user_name = 'testUser';
        this.password = 'testPassword';
        this.isTimerCreated = true;
        fetch('http://localhost:3000/api/v1/timers', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          // TODO: Ruf die ID vom angemeldeten User ab und übergib sie dem body
          body: JSON.stringify({"timerName": this.timerName, "user_name": this.user_name, "password": this.password})
          }).then(res => res.json())
            .then(res => this.id = (res.id))
            .then(res => console.log(res));

        this.initStickyAlert({
          content: "Timer <b>" + this.timerName + "</b> was created!",      
          title: "Timer Created",     
          alertType: "",             
          fillType: "",               
          hasDismissButton: true,     
          timeShown: 3000             
        })
      } 
      else {
        this.initStickyAlert({
          content: "Timer name can't be empty",      
          title: "Error",     
          alertType: "alert-danger",             
          fillType: "",               
          hasDismissButton: true,     
          timeShown: 3000             
        })
      }
    },
    // This method makes a GET request to the '/timers' endpoint and lists all of them out of the database
    showTimersAll: function () {
      fetch('http://localhost:3000/api/v1/timers', {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        }).then(res => res.json())
          .then(res => console.log(res))
    },
    startTimer: function () {
      this.isCounterActive = true;
      //TODO: Welches Format/Codierung eignet sich hier am besten?
      this.startTime = Date();
      this.interval = setInterval(() => {
        this.counter++;
      }, 1000)

      // TODO: Hole die aktuelle timer ID und häng sie der URL an, damit auch der richtige Timer gestartet wird
      fetch('http://localhost:3000/api/v1/timers/111', {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // TODO: Ruf die ID vom angemeldeten User ab und übergib sie dem body
        body: JSON.stringify({"startTime": this.startTime})
        }).then(res => res.json())
          .then(res => console.log(res));

      this.initStickyAlert({
        content: "Timer <b>" + this.timerName + "</b> was started!",      
        title: "Timer Started",     
        alertType: "",             
        fillType: "",               
        hasDismissButton: true,     
        timeShown: 3000             
      })
    },

    pauseTimer: function () {
      this.isCounterActive = false;
      clearInterval(this.interval);
      this.stopTime = Date();
      fetch('http://localhost:3000/api/v1/timers/111', {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"stopTime": this.stopTime})
        }).then(res => res.json())
          .then(res => console.log(res))

      this.initStickyAlert({
        content: "Timer <b>" + this.timerName + "</b> was paused!",      
        title: "Timer Paused",     
        alertType: "",             
        fillType: "",               
        hasDismissButton: true,     
        timeShown: 3000             
      })
    },
    resetTimer: function () {
      this.counter = 0;
      // POST localhost:3000/<user>/simpleTimer/reset/<currentTime>
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

#timer {
  padding-top: 5%;
  padding-bottom: 5%;
  border: 1px solid var(--lm-border-color);
  border-radius: 25px;
}

body.dark-mode #timer {
  border: 1px solid var(--dm-border-color);
}

.timer-text {
  font-size: 400%;
  font-family: 'Major Mono Display', monospace;
}

@media (min-width: 700px) {
  .timer-text {
    font-size: 600%;
    font-family: 'Major Mono Display', monospace;
  }
}

</style>
