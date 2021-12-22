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

  console.log("ddd");
  console.log(currentEditItem);

  //validate inputs
  if (updatedUser.email && updatedUser.username) {
    if (regexEmail.test(updatedUser.email)) {
      if (updatedUser.username.length >= 2) {
        isValid = true;
      } else {
        inputUsername.classList.add("is-invalid");
        let usernameInvalid = currentEditItem.querySelector(
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
      let emailInvalid = currentEditItem.querySelector(
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
      console.log(inputEmail);

      let emailInvalid = currentEditItem.querySelector(
        "#email-container .invalid-feedback"
      );
      while (emailInvalid.firstChild) {
        emailInvalid.removeChild(emailInvalid.lastChild);
      }

      emailText = document.createTextNode("Email field cannot be empty.");

      emailInvalid.appendChild(emailText);
      console.log(updatedUser);
      console.log(emailInvalid);
    }
    if (!updatedUser.username) {
      inputUsername.classList.add("is-invalid");
      let usernameInvalid = currentEditItem.querySelector(
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
        cancelEdit();
        let titleMessage = "User edited with success";
        let bodyMessage = data.message;
        showToast(titleMessage, bodyMessage, true);
        setTimeout(() => {
          location.reload();
        }, 5000);
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
      let titleMessage = "User deleted with success";
      let bodyMessage = data.message;
      showToast(titleMessage, bodyMessage, false);
      setTimeout(() => {
        location.reload();
      }, 5000);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function addUser() {
  console.log("add user");
}

function generateToastError(titleMessage, bodyMessage) {
  //create toast container
  let toastContainer = document.createElement("div");
  toastContainer.className =
    "toast-container position-absolute p-3 top-50 start-50 translate-middle";
  toastContainer.setAttribute(
    "data-original-class",
    "toast-container position-absolute p-3"
  );

  //create toast element and add attributes
  let liveToast = document.createElement("div");
  liveToast.id = "liveToast";
  liveToast.className = "toast fade bg-danger text-white border-0";
  liveToast.role = "alert";
  liveToast.ariaLive = "assertive";
  liveToast.ariaAtomic = true;
  liveToast.setAttribute("data-bs-autohide", false);

  //create toast header
  let toastHeader = document.createElement("div");
  toastHeader.className = "toast-header";
  let title = document.createElement("strong");
  title.className = "me-auto";
  let titleText = document.createTextNode(titleMessage);

  //create toast body
  let toastBody = document.createElement("div");
  toastBody.className = "toast-body";
  let bodyText = document.createTextNode(bodyMessage);

  let body = document.getElementById("body");
  //append header, body and the text to toast
  title.appendChild(titleText);
  toastHeader.appendChild(title);
  toastBody.appendChild(bodyText);
  liveToast.appendChild(toastHeader);
  liveToast.appendChild(toastBody);
  toastContainer.appendChild(liveToast);
  body.prepend(toastContainer);

  return toastContainer;
}

function showToast(titleMessage, bodyMessage, isSucces) {
  let liveToast = document.getElementById("liveToast");
  if (isSucces) {
    liveToast.classList.remove("bg-danger");
    liveToast.classList.add("bg-success");
  } else {
    liveToast.classList.remove("bg-success");
    liveToast.classList.add("bg-danger");
  }

  let toastHeader = liveToast.querySelector(".toast-header .me-auto");
  toastHeaderText = document.createTextNode(titleMessage);
  toastHeader.appendChild(toastHeaderText);
  let toastBody = liveToast.querySelector(".toast-body");
  let toastBodyText = document.createTextNode(bodyMessage);
  toastBody.appendChild(toastBodyText);
  let toast = new bootstrap.Toast(liveToast);
  toast.show();
}
