var inputs = document.getElementsByTagName('input')
var feedbackContainer = document.getElementsByClassName('form_feedback')
var form = document.getElementById('contact')
var phone = document.getElementById('phone')
var security = document.getElementById('altMessage')
var textarea = document.getElementsByTagName('textarea')
// var URL = 'http://159.203.239.117:3025'
var URL = 'http://localhost:3025'

function testPhone () {
  return /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g.test(phone.value)
}

function clearFeedback () {
  while (feedbackContainer[0].firstChild) { // remove other feedback
    feedbackContainer[0].removeChild(feedbackContainer[0].firstChild)
  }
}

function giveFeedback (className, message) {
  var feedback = document.createElement('p')

  clearFeedback()

  feedback.className = className
  feedback.innerHTML = message
  feedbackContainer[0].appendChild(feedback)
}

function clearForm () {
  for (var i = 0; i < inputs.length; i++) { // empty the form on success
    inputs[i].value = ''
  }

  textarea[0].value = ''
}

function sendReport () {
  var AJAX = new XMLHttpRequest()
  var payload = new FormData(form)
  var message = ''

  if (security.value) { // if the security input has a value, it's been filled
    message = 'Sorry for the inconvenience, but you somehow triggered our anti-spam protection. Please use the contact information at the bottom of the page to reach us.'
    giveFeedback('feedback_error', message)
  } else {
    if (navigator.onLine) { // online
      if (testPhone()) {
        message = 'Sending your message. Please wait for a moment.'
        giveFeedback('feedback_warning', message)

        AJAX.addEventListener('load', function (e) {
          if (e.target.status === 200) { // if the message was sent
            message = 'Your message was sent!'

            giveFeedback('feedback_success', message)
            clearForm()
          } else { // something nonspecific has gone wrong
            message = 'Sorry for the inconvenience, but your message may have not sent. You can try sending it again or use the contact information at the bottom of the page to reach us.'

            giveFeedback('feedback_warning', message)
          }
        })

        AJAX.open('POST', URL, true)
        AJAX.send(payload)
      } else {
        message = 'Sorry for the inconvenience, but your phone number does not appear to be correct, so we can\'t send your message. Please double check your phone number or use the contact information at the bottom of the page to reach us.'
        giveFeedback('feedback_error', message)
      }
    } else { // offline
      message = 'Sorry for the inconvenience, but you cannot send messages while offline. You can try sending the message again when you have a reliable internet connection or use the contact information at the bottom of the page to reach us.'
      giveFeedback('feedback_error', message)
    }
  }
}

if (inputs.length) {
  document.addEventListener('submit', function (e) {
    e.preventDefault()
    return sendReport()
  })
}
