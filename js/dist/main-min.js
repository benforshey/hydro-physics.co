"use strict";var inputs=document.getElementsByTagName("input"),feedbackContainer=document.getElementsByClassName("form_feedback"),form=document.getElementById("contactForm"),security=document.getElementById("altMessage"),URL="https://message.integrisweb.com/sms/";function clearFeedback(){for(;feedbackContainer[0].firstChild;)feedbackContainer[0].removeChild(feedbackContainer[0].firstChild)}function giveFeedback(e,t){var n=document.createElement("p");clearFeedback(),n.className=e,n.innerHTML=t,feedbackContainer[0].appendChild(n)}function sendReport(){var e=new XMLHttpRequest,t=new FormData(form);security.value?giveFeedback("feedback_error","Sorry for the inconvenience, but you somehow triggered our anti-spam protection. Please use the contact information at the bottom of the page to reach us."):navigator.onLine?(giveFeedback("feedback_warning","Sending your message. Please wait for a moment."),e.addEventListener("load",function(e){200===e.target.status?(giveFeedback("feedback_success","Your message was sent!"),ga("send",{hitType:"event",eventCategory:"Form",eventAction:"send",eventLabel:"Contact Form"}),form.reset()):giveFeedback("feedback_warning","Sorry for the inconvenience, but your message may have not sent. You can try sending it again or use the contact information at the bottom of the page to reach us.")}),e.open("POST",URL,!0),e.send(t)):giveFeedback("feedback_error","Sorry for the inconvenience, but you cannot send messages while offline. You can try sending the message again when you have a reliable internet connection or use the contact information at the bottom of the page to reach us.")}inputs.length&&document.addEventListener("submit",function(e){return e.preventDefault(),sendReport()});
//# sourceMappingURL=main-min.js.map
