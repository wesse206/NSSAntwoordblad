// Loads the entire DOM to variables on initialization. This hopefully betters performance.
{
  // Main Blocks
  var timerBlock = document.getElementById('timerBlock')
  var opskrifBlock = document.getElementById('opskrifBlock')
  var riglyneBlock = document.getElementById('riglyneBlock')
  var settingsDialog = document.getElementById('settings')

  // Timer Elements
  var hoursInput = document.getElementById('hours')
  var minsInput = document.getElementById('mins')
  var startTimerButton = document.getElementById('startTimer')
  var stopTimerButton = document.getElementById('stopTimer')
  var timeInput = document.getElementById('time')
  var timeOutput = document.getElementById('timer')
  var progress = document.getElementById('progress')
  var leestydText = document.getElementById('leestydText')

  // Heading Elements
  var vakText = document.getElementById('vakText')
  var leerdernaamText = document.getElementById('leerdernaamText')
  var seksieText = document.getElementById('seksieText')
  var onderwyserkodeText = document.getElementById('onderwyserkodeText')
  var datumText = document.getElementById('datumText')

  // Settings Elements
  var leestydCheckbox = document.getElementById('leestyd')  
  var vak = document.getElementById('vak')
  var leerdernaam = document.getElementById('leerdernaam')
  var seksie = document.getElementById('seksie')
  var onderwyserkode = document.getElementById('onderwyserkode')
  var datum = document.getElementById('datum')
}

// Event Listeners
{
  hoursInput.addEventListener('keypress', function (event) { 
    if (event.key === 'Enter') { 
      startTimer() 
    } 
  })

  minsInput.addEventListener('keypress', function (event) { 
    if (event.key === 'Enter') { 
      startTimer() 
    } 
  })

  hoursInput.addEventListener('click', function () { 
    hoursInput.select() 
  })

  leestydCheckbox.addEventListener('click', function () {
    let leestyd10MinText = document.getElementById('leestyd10MinText')
    if (leestydCheckbox.checked) {
      leestyd10MinText.style.display = 'inline'
    }
    else {
      leestyd10MinText.style.display = 'none'
    }
  })

  minsInput.addEventListener('click', function () { 
    minsInput.select() 
  })

  vak.addEventListener('keyup', function () {
    if (vak.value !== '') {
      vakText.innerHTML = vak.value
    }
    else {
      vakText.innerHTML = 'Vak'
    }
  })

  leerdernaam.addEventListener('keyup', function () {
    if (leerdernaam.value !== '') {
      leerdernaamText.innerHTML = leerdernaam.value
    }
    else {
      leerdernaamText.innerHTML = 'Naam en Van'
    }
  })

  seksie.addEventListener('keyup', function () {
    if (seksie.value !== '') {
      seksieText.innerHTML = seksie.value
    }
    else {
      seksieText.innerHTML = 'Klas'
    }
  })

  onderwyserkode.addEventListener('keyup', function () {
    if (onderwyserkode.value !== '') {
      onderwyserkodeText.innerHTML = onderwyserkode.value
    }
    else {
      onderwyserkodeText.innerHTML = 'Onderwyser Kode'
    }
  })

  datum.addEventListener('keyup', function () {
    if (datum.value !== '') {
      datumText.innerHTML = datum.value
    }
    else {
      var today = new Date()
      datumText.innerHTML = today.toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })
    }
  })
}

// Misc code for starup
{
  hoursInput.select()

  let today = new Date()
  datumText.innerHTML = today.toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })

  if (document.cookie != '') {
    let cookie = document.cookie.split(';')
    if (cookie[0].split('=')[1] >= Date.now()) {
      startTimer(cookie)
    }
  }
}

function displayTimer() {
  timerBlock.style.display = 'block'
  opskrifBlock.style.display = 'none'
  riglyneBlock.style.display = 'none'
}

function startTimer(cookie='') {
  leestydCheckbox.disabled = true

  startTimerButton.style.display = 'none'
  stopTimerButton.style.display = 'inline'

  timeInput.style.display = 'none'
  timeOutput.style.display = 'flex'

  // Validation just incase no values are in the inputs.
  {
    if (hoursInput.value === '') {
      hoursInput.value = '00'
    }
    if (minsInput.value === '') {
      minsInput.value = '00'
    }
  }

  let leestyd = 0
  if (leestydCheckbox.checked) {
    leestyd = 10
  }

  if (cookie != '')  {
    countDownDate = cookie[0].split('=')[1]
    initialDistance = cookie[1].split('=')[1]
  }
  else {    
    var countDownDate = Date.now() + (parseInt(hoursInput.value) * 60 * 60 + (parseInt(minsInput.value) + leestyd) * 60) * 1000
    initialDistance = countDownDate - Date.now()
    document.cookie = 'time=' + countDownDate
    document.cookie = 'distance=' + initialDistance
  }


  timer = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime()


    // Find the distance between now and the count down date
    var distance = countDownDate - now

    if ((leestydCheckbox.checked) && (distance > initialDistance - (leestyd * 60 * 1000))) {
      progress.style.width = (((initialDistance - distance) / (leestyd * 60 * 1000)) * 100) + '%'
      leestydText.style.display = 'inline'
    }
    else {
      progress.style.width = (100 - distance / (initialDistance - leestyd * 60 * 1000) * 100) + '%'
      leestydText.style.display = 'none'
    }

    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    function pad(num) {
      num = num.toString()
      while (num.length < 2) num = "0" + num
      return num
    }

    hours = pad(hours)
    minutes = pad(minutes)
    seconds = pad(seconds)

    if ((hours <= 0) && (minutes <= 0) && (seconds <= 0) && !(hours == 'Nan')) {
      timeOutput.innerHTML = "00:00:00";
      progress.style.width = '100%'
      progress.classList.add('flash')
      document.cookie = "time=;expires=Thu, 01 Jan 1970 00:00:01 GMT"
      document.cookie = "distance=;expires=Thu, 01 Jan 1970 00:00:01 GMT"
      clearInterval(timer)
    }
    else if (hours == 'NaN'){
      
      timeOutput.innerHTML = "00:00:00";
      progress.style.width = '100%'
      progress.classList.add('flash')
      document.cookie = "time=;expires=Thu, 01 Jan 1970 00:00:01 GMT"
      document.cookie = "distance=;expires=Thu, 01 Jan 1970 00:00:01 GMT"
      clearInterval(timer)
    }
    else {
      // Display the result in the element with id="timer"
      timeOutput.innerHTML = hours + ":"
        + minutes + ":" + seconds
    }
  }, 100);
}

function stopTimer() {
  document.cookie = "time=;expires=Thu, 01 Jan 1970 00:00:01 GMT"
  document.cookie = "distance=;expires=Thu, 01 Jan 1970 00:00:01 GMT"
  clearInterval(timer)
  leestydText.style.display = 'none'
  progress.style.width = '0%'
  progress.classList.remove('flash')
  progress.style.width = '0%'

  leestydCheckbox.disabled = false
  timeOutput.innerHTML = "00:00:00"  

  startTimerButton.style.display = 'inline'
  stopTimerButton.style.display = 'none'

  timeInput.style.display = 'flex'
  timeOutput.style.display = 'none'
}

function displayOpskrif() {
  timerBlock.style.display = 'none'
  opskrifBlock.style.display = 'block'
  riglyneBlock.style.display = 'none'
}

function displayRiglyne() {
  timerBlock.style.display = 'none'
  opskrifBlock.style.display = 'none'
  riglyneBlock.style.display = 'block'
}

function settings() {
  settingsDialog.showModal()
}

function closeSettings() {
  settingsDialog.close()
}