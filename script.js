const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const finalMessage = document.getElementById("final-message");
const popup = document.getElementById("alert-box");
//For User Authentication
function addIntoJSON() {
  fetch("user.json")
    .then((res) => res.json())
    .then((data) => {
      let add1 = {
        username: "Abhi",
        mail_id: "abhijeet@gmail.com",
        password: "123456",
      };
      data.push(add1);
      console.log(data);
    });
}
addIntoJSON();
function userAuthentication() {
  fetch("user.json")
    .then((res) => res.json())
    .then((data) => {
      var errors = "Authentication Problem\n";
      let noErrors = true;
      //console.log(data);
      //console.log(data[0].username);
      if (username.value.length >= 3 && data[0].username !== username.value) {
        noErrors = false;
        errors += "->username is incorrect\n";
        showError(username, "username is incorrect");
      }
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(email.value.trim()) && email.value !== data[0].mail_id) {
        noErrors = false;
        errors += "->Email is incorrect\n";
        showError(email, "Email is incorrect");
      }
      if (
        password.value.length >= 5 &&
        password.value.length <= 25 &&
        password.value !== data[0].password
      ) {
        noErrors = false;
        errors += "->Password is incorrect\n";
        showError(password, "Password is incorrect");
        showError(password2, "Password is incorrect");
      }
      if (!noErrors) {
        //alert(errors);
        //console.log(errors);
        finalMessage.innerText = errors;
        popup.style.display = "flex";
        setTimeout(() => {
          popup.style.display = "none";
        }, 2000);
      }
    });

  //
}

//show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}
//Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}
//check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
//check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be atleast ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be atmost ${max} characters`);
  } else showSuccess(input);
}

// Check Password Match
function checkPasswordMatch(input1, input2) {
  if (input1.value != input2.value) {
    showError(input2, "Both Password does not match");
  }
}
// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//event Listeners;
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 5, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
  userAuthentication();
});
