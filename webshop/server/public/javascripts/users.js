const baseUrl = "http://localhost:8080/api/users/";
let userIdDelete = null;

function editUser(user) {
  fetch(baseUrl + user.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function deleteUser(user) {
  userIdDelete = user.id;
  let deleteModal = document.getElementById("confirmDelete");
  let modalText = deleteModal.querySelector(".modal-body p");
  let text = document.createTextNode(
    `Email: ${user.email} Username: ${user.username}`
  );
  modalText.appendChild(text);
}

function confirmDelete() {
  console.log(userIdDelete);
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
