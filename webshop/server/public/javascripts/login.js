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

  if (!regexEmail.test(email)) {
    let errorContainer = document.querySelector(".email");
    errorContainer.style.display = "inherit";
    errorContainer.innerText = "Email not correct.";
  } else {
    let user = {
      email: email,
      password: password,
    };

    let postUrl = "http://localhost:8080/api/login";
    fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        let user = data;
        localStorage.setItem("isLoggedIn", true);
        window.location.replace("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
