const baseUrl = "http://localhost:8080/api/users/";
let userIdDelete = null;

function editUser(selectedItem) {
  //find which element has class edit
  console.log(selectedItem);

  // fetch(baseUrl + user.id, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(user),
  // })
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     location.reload();
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
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
