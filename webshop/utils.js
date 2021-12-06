module.exports = {
  validatePriceInputs: function (wordArr1, wordArr2) {
    return isValid;
  },
  validateNewUser: function (user) {
    //username, email adress, password
    let isValid = false;
    let message = "";
    let regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (user.email && user.password && user.username) {
      if (regexEmail.test(user.email)) {
        if (user.password.length >= 4) {
          if (user.username.length >= 2) {
            isValid = true;
          } else {
            message = "Username must be at least two characters long.";
          }
        } else {
          message = "Password must be at least four characters long.";
        }
      } else {
        message = "Email address incorrect";
      }
    } else {
      message = "Please complete all fields";
    }

    return {
      isValid: isValid,
      message: message,
    };
  },
  validateExistingUser: function (user) {
    //email adress, password
    let isValid = false;
    let message = "";
    let regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (user.email && user.password) {
      if (regexEmail.test(user.email)) {
        isValid = true;
      } else {
        message = "Email address incorrect";
      }
    } else {
      message = "Please complete all fields";
    }

    return {
      isValid: isValid,
      message: message,
    };
  },
  validateProduct: function (product) {},
};
