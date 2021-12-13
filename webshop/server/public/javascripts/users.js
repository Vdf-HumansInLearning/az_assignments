const baseUrl = "http://localhost:8080/api/users/";
const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const regexUsername = /^[a-z_]+$/;
let userIdDelete = null;
let classEdit = "";
let currentEditItem = null;
const btnEditList = document.querySelectorAll("#editUserBtn");
let updatedUser = {
  email: "",
  username: "",
  id: -1,
};

function editUser(data) {
  //find which element has class edit

  btnEditList.forEach((btn) => btn.setAttribute("disabled", "true"));

  let currentItemId = data.id.id;
  let editUser = data.user;
  console.log(currentItemId);
  classEdit = "edit-user--visible";

  let selectedElement = document.getElementById(`${currentItemId}`);
  currentEditItem = selectedElement.querySelector("#editUser");
  console.log(selectedElement);
  console.log(currentEditItem);

  currentEditItem.classList.add(classEdit);

  let inputEmail = currentEditItem.querySelector("#email");
  let inputUsername = currentEditItem.querySelector("#username");
  console.log(currentItemId);

  inputEmail.value = editUser.email;
  inputUsername.value = editUser.username;

  updatedUser.id = editUser.id;
}

function updateUser() {
  let inputEmail = currentEditItem.querySelector("#email");
  let inputUsername = currentEditItem.querySelector("#username");

  updatedUser.email = inputEmail.value;
  updatedUser.username = inputUsername.value;

  inputEmail.classList.remove("is-invalid");
  inputUsername.classList.remove("is-invalid");

  let emailText = null;
  let usernameText = null;

  let isValid = false;

  //validate inputs
  if (updatedUser.email && updatedUser.username) {
    if (regexEmail.test(updatedUser.email)) {
      if (updatedUser.username.length >= 2) {
        isValid = true;
      } else {
        inputUsername.classList.add("is-invalid");
        let usernameInvalid = document.querySelector(
          "#username-container .invalid-feedback"
        );

        while (usernameInvalid.firstChild) {
          usernameInvalid.removeChild(usernameInvalid.lastChild);
        }

        usernameText = document.createTextNode(
          "Username must be at least two characters long."
        );

        usernameInvalid.appendChild(usernameText);
      }
    } else {
      inputEmail.classList.add("is-invalid");
      let emailInvalid = document.querySelector(
        "#email-container .invalid-feedback"
      );
      while (emailInvalid.firstChild) {
        emailInvalid.removeChild(emailInvalid.lastChild);
      }

      emailText = document.createTextNode("Email address incorrect.");

      emailInvalid.appendChild(emailText);
    }
  } else {
    if (!updatedUser.email) {
      inputEmail.classList.add("is-invalid");
      let emailInvalid = document.querySelector(
        "#email-container .invalid-feedback"
      );
      while (emailInvalid.firstChild) {
        emailInvalid.removeChild(emailInvalid.lastChild);
      }

      emailText = document.createTextNode("Email field cannot be empty.");

      emailInvalid.appendChild(emailText);
    }
    if (!updatedUser.username) {
      inputUsername.classList.add("is-invalid");
      let usernameInvalid = document.querySelector(
        "#username-container .invalid-feedback"
      );

      while (usernameInvalid.firstChild) {
        usernameInvalid.removeChild(usernameInvalid.lastChild);
      }

      usernameText = document.createTextNode("Username field cannot be empty.");

      usernameInvalid.appendChild(usernameText);
    }
  }

  const { email, username } = updatedUser;
  const sendObj = { email, username };

  if (isValid) {
    fetch(baseUrl + updatedUser.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendObj),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        cancelEdit();
        let liveToast = document.getElementById("liveToast");
        let toastBody = document.querySelector("#liveToast .toast-body");
        let text = document.createTextNode(data.message);
        toastBody.appendChild(text);
        let toast = new bootstrap.Toast(liveToast);
        toast.show();
        setTimeout(() => {
          location.reload();
        }, 5000);
        //location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function cancelEdit() {
  console.log("cccc");
  let inputEmail = currentEditItem.querySelector("#email");
  let inputUsername = currentEditItem.querySelector("#username");
  inputEmail.value = "";
  inputUsername.value = "";

  currentEditItem.classList.remove(classEdit);
  currentEditItem = null;

  btnEditList.forEach((btn) => btn.removeAttribute("disabled"));
}

function deleteUser(user) {
  console.log(user);
  userIdDelete = user.id;
  let deleteModal = document.getElementById("confirmDelete");
  let modalBody = deleteModal.querySelector(".modal-body");

  let paragraph = modalBody.querySelector("p");
  console.log(paragraph);
  console.log("before delete");

  if (paragraph) paragraph.remove();

  let modalText = document.createElement("p");
  let text = document.createTextNode(
    `Email: ${user.email} Username: ${user.username}`
  );
  console.log("new child");

  modalText.appendChild(text);
  modalBody.appendChild(modalText);
}

function confirmDelete() {
  fetch(baseUrl + userIdDelete, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      location.reload();

      let liveToast = document.getElementById("liveToast");
      let toastBody = document.querySelector("#liveToast .toast-body");
      let text = document.createTextNode(data.message);
      toastBody.appendChild(text);
      let toast = new bootstrap.Toast(liveToast);
      toast.show();
      console.log(liveToast);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function addUser() {
  console.log("add user");
}
