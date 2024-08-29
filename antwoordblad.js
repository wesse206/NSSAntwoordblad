// Loads the entire DOM to variables on initialization. This hopefully betters performance.
{
  // Opskrif Elements
  var vakText = document.getElementById('vakText')
  var leerdernaamText = document.getElementById('leerdernaamText')
  var seksieText = document.getElementById('seksieText')
  var onderwyserkodeText = document.getElementById('onderwyserkodeText')
  var datumText = document.getElementById('datumText')

  // Settings Elements
  var settingsDialog = document.getElementById('settings')
  var vak = document.getElementById('vak')
  var leerdernaam = document.getElementById('leerdernaam')
  var seksie = document.getElementById('seksie')
  var onderwyserkode = document.getElementById('onderwyserkode')
  var datum = document.getElementById('datum')
}

// Event Listeners
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


// Misc code for starup
{
  let today = new Date()
  datumText.innerHTML = today.toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })
}

function settings() {
  settingsDialog.showModal()
}

function closeSettings() {
  settingsDialog.close()
}