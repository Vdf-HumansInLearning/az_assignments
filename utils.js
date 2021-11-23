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
};
