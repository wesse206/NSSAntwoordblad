// Loads the DOM to variables on initialization.
{
  var settingsDialog = document.getElementById('settings')
  var centrenumber = document.getElementById('centrenumber')
}



// Event Listeners
{
  console.log(centrenumber, 'hello!')
  centrenumber.addEventListener('keyup', function () {
    if (centrenumber.value !== '') {
      let value = centrenumber.value
      for (let i = 1; i <= value.length; i++) {
        document.getElementById('c' + i).innerHTML = value[i - 1]        
      }
    }
  })


}

// Misc code for starup
function settings() {
  settingsDialog.showModal()
}

function closeSettings() {
  settingsDialog.close()
}