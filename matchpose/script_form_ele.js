
function myFunction() {
var name = document.getElementById("name").value;
var email = document.getElementById("email").value;
var message= document.getElementById("message").value;

// Returns successful data submission message when the entered information is stored in database.
var dataString = 'name1=' + name + '&email1=' + email + '&message1=' + message;
if (name == '' || email == '' || message == '') {
alert("Please Fill All Fields");
} else {
// AJAX code to submit form.
$.ajax({
type: "POST",
url: "trialmail.php",
data: dataString,
cache: false,
success: function(html) {
alert(html);
}
});
}
return false;
}