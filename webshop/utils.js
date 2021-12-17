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
  validateProduct: function (product) {
    let regexLetters = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
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
      product.rating >= -1 &&
      product.rating <= 5
    )
      isValid = true;
    else isValid = false;
    return isValid;
  },
  validateExistingProduct: function (product) {
    let regexLetters = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    let validationObj = {
      isValidName: false,
      isValidBrand: false,
      isValidOs: false,
      isValidPrice: false,
      isValidQuantity: false,
      isValidDiscount: false,
      isValidRating: false,
    };
    switch (product) {
      case product.name:
        if (
          product.name.match(regexLetters) &&
          product.name.length >= 1 &&
          product.name.length <= 30
        ) {
          validationObj.isValidName = true;
        }
        break;
      case product.brand:
        if (
          product.brand.match(regexLetters) &&
          product.brand.length >= 1 &&
          product.brand.length <= 30
        ) {
          validationObj.isValidBrand = true;
        }
        break;
      case product.operating_system:
        if (product.operating_system.match(regexLetters)) {
          validationObj.isValidOs = true;
        }
        break;
      case product.price:
        if (product.price > 0) {
          validationObj.isValidPrice = true;
        }
        break;
      case product.quantity:
        if (product.quantity > 0) {
          validationObj.isValidQuantity = true;
        }
        break;
      case product.discount:
        if (product.discount >= 0 && product.discount <= 100) {
          validationObj.isValidDiscount = true;
        }
        break;
      case product.rating:
        if (product.rating >= -1 && product.rating <= 5) {
          validationObj.isValidRating = true;
        }
        break;
    }

    const validationArr = Object.values(validationObj);
    let isValid = validationArr.every((item) => item === true);

    return isValid;
  },
};
