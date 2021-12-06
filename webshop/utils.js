module.exports = {
  validatePriceInputs: function () {
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
  //name, brand, operating_system, price, discount, quantity,
  //availability_date, rating
  //multiple functions that verify one thing and larger functions
  //that call them
  validateString: function (item) {},
  //name between 1-30 characters
  //
  validateProduct: function (product) {
    let regexLetters = /^[a-zA-Z]+$/;
    let isValid = false;
    if (
      product.name.match(regexLetters) &&
      product.name.length >= 1 &&
      product.name.length <= 30 &&
      product.brand.match(regexLetters) &&
      product.brand.length >= 1 &&
      product.brand.length <= 30 &&
      product.operating_system.match(regexLetters) &&
      product.price > 0 &&
      product.discount >= 0 &&
      product.discount <= 100 &&
      product.quantity > 0 &&
      product.rating >= 0 &&
      product.rating <= 5
    )
      isValid = true;
    else isValid = false;
    return isValid;
  },
};
