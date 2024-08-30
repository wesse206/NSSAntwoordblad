// Loads the DOM to variables on initialization.
{
  var settingsDialog = document.getElementById('settings')
  var centrenumber = document.getElementById('centrenumber')
  var examinationnumber = document.getElementById('examinationnumber')
  var date = document.getElementById('date')
  var booknumber = document.getElementById('booknumber')
  var books = document.getElementById('books')
  var subjectcode = document.getElementById('subjectcode')  
  var papernumber = document.getElementById('papernumber')
  var subjectname = document.getElementById('subjectname')
}

// Event Listeners
{
  centrenumber.addEventListener('keyup', function () {
    let value = centrenumber.value
    for (let i = 1; i <= value.length; i++) {
      document.getElementById('c' + i).innerHTML = value[i - 1]        
    }
    if (value.length < 7) {
      document.getElementById('c' + (value.length + 1)).innerHTML = ''
    }
  })

  examinationnumber.addEventListener('keyup', function () {
    let value = examinationnumber.value
    for (let i = 1; i <= value.length; i++) {
      document.getElementById('e' + i).innerHTML = value[i - 1]        
    }
    if (value.length < 13) {
      document.getElementById('e' + (value.length + 1)).innerHTML = ''
    }
  })

  date.addEventListener('keyup', function () {
    document.getElementById('dateblock').innerHTML = date.value        
  })

  booknumber.addEventListener('keyup', function () {
    document.getElementById('booknumberblock').innerHTML = booknumber.value        
  })

  books.addEventListener('keyup', function () {
    document.getElementById('booksblock').innerHTML = books.value        
  })

  subjectcode.addEventListener('keyup', function () {
    let value = subjectcode.value
    for (let i = 1; i <= value.length; i++) {
      document.getElementById('s' + i).innerHTML = value[i - 1]        
    }
    if (value.length < 5) {
      document.getElementById('s' + (value.length + 1)).innerHTML = ''
    }
  })

  papernumber.addEventListener('keyup', function () {
      document.getElementById('papernumberblock').innerHTML = papernumber.value    
    }
  )

  subjectname.addEventListener('keyup', function () {
    document.getElementById('subjectnameblock').innerHTML = subjectname.value    
  }
)


}

// Show and hide settings dialog.
function settings() {
  settingsDialog.showModal()
}

function closeSettings() {
  settingsDialog.close()
}