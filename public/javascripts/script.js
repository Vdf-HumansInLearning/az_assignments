let url = "http://localhost:3000";

let registerForm = document.getElementById("registerForm");
console.log(registerForm);
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  event.stopPropagation();
  let username = document.getElementById("inputUsername").value;
  let email = document.getElementById("inputEmail").value;
  let password = document.getElementById("inputPassword").value;
  let confirmPassword = document.getElementById("inputPasswordConfirm").value;
  let regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let regexUsername = /^[a-z_]+$/;
  //validate input

  if (password !== confirmPassword) {
    console.log("fff");
    let errorContainer = document.querySelector(".confirm-password");
    errorContainer.style.display = "inherit";
    errorContainer.innerText = "Passwords don't match.";
  }
  if (!regexEmail.test(email)) {
    let errorContainer = document.querySelector(".email");
    errorContainer.style.display = "inherit";
    errorContainer.innerText = "Email not correct.";
  }
  console.log(regexUsername.test(username));
  if (!regexUsername.test(username)) {
    let errorContainer = document.querySelector(".username");
    errorContainer.style.display = "inherit";
    errorContainer.innerText =
      "Username can contain only lowercase letters or underscore character.";
  }

  let user = {
    email: email,
    password: password,
    username: username,
  };

  let postUrl = url + "/auth/register";
  fetch(postUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  //fetch
});

function addProductToCart(product) {
  console.log(product);
}
