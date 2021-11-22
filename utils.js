module.exports = {
  validatePriceInputs: function (wordArr1, wordArr2) {
    return isValid;
  },
  validateNewUser: function (user) {
    //username, email adress, password
    let isValid = false;
    let message = "";
    let regexEmail =
      /^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
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
    //username, email adress, password
    let isValid = false;
    let message = "";
    let regexEmail =
      /^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
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
