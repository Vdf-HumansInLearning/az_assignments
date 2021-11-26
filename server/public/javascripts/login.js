let url = "http://localhost:3000";

let loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  event.stopPropagation();
  let email = document.getElementById("inputEmail").value;
  let password = document.getElementById("inputPassword").value;
  let regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  //validate input

  if (!email) {
    let errorContainer = document.querySelector(".email");
    errorContainer.style.display = "inherit";
    errorContainer.innerText = "This field is empty.";
  } else if (!password) {
    let errorContainer = document.querySelector(".password");
    errorContainer.style.display = "inherit";
    errorContainer.innerText = "This field is empty.";
  } else if (!regexEmail.test(email)) {
    let errorContainer = document.querySelector(".email");
    errorContainer.style.display = "inherit";
    errorContainer.innerText = "Email not correct.";
  } else {
    let user = {
      email: email,
      password: password,
    };

    let postUrl = url + "/auth/login";
    fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        console.log(response);
        response.json();
      })
      .then((data) => {
        console.log(data);
        let user = data;
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("isAdmin", user.isAdmin);
        window.location.replace("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
