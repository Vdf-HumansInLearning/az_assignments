let baseUrl = "http://localhost:8080/api/users/";

// function editUser(userId) {
//   fetch(baseUrl + "userId", {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       response.json();
//     })
//     .then((data) => {
//       location.reload();
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

function deleteUser(userId) {
  let id = Number(userId);
  fetch(baseUrl + userId, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
