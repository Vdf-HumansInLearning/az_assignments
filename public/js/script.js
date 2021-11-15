myJson = {
  products: [
    {
      name: "Galaxy A12",
      brand: "Samsung",
      operating_system: "Android",
      price: 899,
      discount: 0,
      quantity: 2000,
      availability_date: "2020-11-24",
      rating: 4,
    },
    {
      name: "Galaxy a52s 5G",
      brand: "Samsung",
      operating_system: "Android",
      price: 1849,
      discount: 0,
      quantity: 2500,
      availability_date: "2021-08-17",
      rating: 5,
    },
    {
      name: "Galaxy s21",
      brand: "Samsung",
      operating_system: "Android",
      price: 3899,
      discount: 50,
      quantity: 800,
      availability_date: "2021-01-29",
      rating: 4,
    },
    {
      name: "Moto G30",
      brand: "Motorola",
      operating_system: "Android",
      price: 799,
      discount: 100,
      quantity: 1000,
      availability_date: "2021-03-17",
      rating: 4.5,
    },
    {
      name: "iPhone 13",
      brand: "Apple",
      operating_system: "iOS",
      price: 4449,
      discount: 0,
      quantity: 3500,
      availability_date: "2021-09-14",
      rating: 5,
    },
    {
      name: "iPhone 13 Pro",
      brand: "Apple",
      operating_system: "iOS",
      price: 5699,
      discount: 0,
      quantity: 3000,
      availability_date: "2021-09-14",
      rating: 5,
    },
    {
      name: "Mi 11 Lite 5G",
      brand: "Xiaomi",
      operating_system: "Android",
      price: 1449,
      discount: 0,
      quantity: 1500,
      availability_date: "2021-03-29",
      rating: -1,
    },
    {
      name: "Pixel 6",
      brand: "Google",
      operating_system: "Android",
      price: 649,
      discount: 0,
      quantity: 0,
      availability_date: "2999-10-25",
      rating: -1,
    },
  ],
  standard_delivery_fee: 35,
  free_delivery_min_price: 500,
};

const brands = [...new Set(myJson.products.map((product) => product.brand))];
const os = [
  ...new Set(
    myJson.products.map((product) =>
      product.operating_system ? product.operating_system : "N/A"
    )
  ),
];

//-----------CUSTOMER ACTIONS-----------

// filter by brand
function filterByBrand(phoneBrand) {
  if (phoneBrand in brands)
    return myJson.products.filter((product) => product.brand === phoneBrand);
  else return "Brand not available";
}

// filter by OS
function filterByOS(phoneOS) {
  if (phoneOS in os)
    return myJson.products.filter(
      (product) => product.operating_system === phoneOS
    );
  else return "No phone with such OS available";
}

// filter by price range
function filterByPriceRange(minPrice, maxPrice) {
  let maxPhonePrice = Math.max(
    ...myJson.products.map((product) => product.price)
  );
  if (minPrice >= 0 && maxPrice <= maxPhonePrice)
    return myJson.products.filter(
      (product) => product.price >= minPrice && product.price <= maxPhonePrice
    );
  else return "Minimum price under 0 not allowed";
}

// filter by rating
function filterByRating(filterAsc, productArr) {
  if (filterAsc) return productArr.sort((a, b) => a.rating - b.rating);
  else return productArr.sort((a, b) => b.rating - a.rating);
}

// filter by available stock (change stock to zero to see effects)
// if you want the phones to be shown asc/desc, call sortAsc()/sortDesc()
// in script.js on the result of the function
function filterByStock() {
  let products = myJson.products.filter((product) => product.quantity > 0);
  if (products.length < 1) return "No products in stoc available.";
  else return products;
}

// filter by avialable date (change availability_date to see effects)
//returns a condition
function filterByDate(item) {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  return (item) => new Date(item.availability_date) <= new Date(today);
}

//-----------ADMIN ACTIONS-----------
// show all phones with less than N items available in stock
function filterByStockN(n) {
  if (n > 0) return myJson.products.filter((product) => product.quantity < n);
}
// show average rating by brand
//object
function getAverageRating(brand) {
  let myObj = {};
  myJson.products
    .filter((item) => item.rating >= 0)
    .forEach((item) => {
      if (item.brand in myObj) myObj[item.brand].push(item.rating);
      else myObj[item.brand] = [item.rating];
    });
  for (key in myObj) {
    let sum = 0;
    myObj[key].forEach((item) => (sum += item));
    myObj[key] = parseFloat((sum / myObj[key].length).toFixed(2));
  }
  if (brand) return myObj[brand];
  return myObj;
}
// show average discount by brand
//array
//[{brand: "", averageDiscount: ""}, {brand: "", averageDiscount: ""}]
function getAverageDiscount() {
  let myArr = [];
  let brands = [...new Set(myJson.products.map((item) => item.brand))];
  brands.forEach((brand, index) => {
    let sum = 0;
    let noProducts = 1;
    myArr.push({
      brand: brand,
      totalDiscount: sum,
      noProducts: noProducts,
    });
    myJson.products.forEach((product) => {
      if (product.brand === brand) {
        myArr[index].totalDiscount += product.discount;
        myArr[index].noProducts++;
      }
    });
  });
  myArr = myArr.map((item) => ({
    brand: item.brand,
    avgDiscount: parseFloat((item.totalDiscount / item.noProducts).toFixed(2)),
  }));
  return myArr;
}

// show max discount by brand
function getMaxDiscount(phoneBrand) {
  return myJson.products.reduce((maxDisc, product) => {
    return product.brand === phoneBrand
      ? maxDisc.discount > product.discount
        ? maxDisc
        : product
      : maxDisc;
  }, {});
}
// add any other actions you find fit
function sortAsc(arr, property) {
  return arr.sort((a, b) => a[property] - b[property]);
}
function sortAscRating(item) {
  return (item) => item.sort((a, b) => a.rating - b.rating);
}
function sortAscPrice(item) {
  return (item) => item.sort((a, b) => a.price - b.price);
}
function sortDescRating(item) {
  return (item) => item.sort((a, b) => b.rating - a.rating);
}
function sortDescPrice(item) {
  return (item) => item.sort((a, b) => b.price - a.price);
}
function sortDesc(arr, property) {
  return arr.sort((a, b) => b[property] - a[property]);
}
//not available for date property
function filterByProperty(value, property) {
  let filteredArr = myJson.products.filter(
    (product) => product[property] === value
  );
  if (filteredArr.length < 1) console.log("No such property or invalid value");
  else return filteredArr;
}

let selectPropertyContainer = document.querySelector("#sortProperties");

const properties = [
  { id: "d", text: "Choose option" },
  { id: "a_r", text: "Sort ascending by rating" },
  { id: "a_p", text: "Sort ascending by price" },
  { id: "d_r", text: "Sort descending by rating" },
  { id: "d_p", text: "Sort descending by price" },
];
function generateSelectOptions() {
  properties.forEach((property) => {
    let option = document.createElement("option");
    option.value = property.id;
    option.innerHTML = property.text;
    selectPropertyContainer.appendChild(option);
  });
}
generateSelectOptions();

function displayProducts(filterFunction) {
  let html = "<ol class='list-group list-group-numbered'>";
  let products = myJson.products;
  //select will return a value in any case
  let selectedProperty =
    selectPropertyContainer.options[selectPropertyContainer.selectedIndex]
      .value;
  console.log(filterFunction);
  if (filterFunction && filterFunction instanceof Function) {
    console.log(filterFunction);
    products = products.filter(filterFunction);
  }
  console.log(products);
  switch (selectedProperty) {
    case "d":
      products = products;
      break;
    case "a_r":
      sortAsc(products, "rating");
      break;
    case "a_p":
      sortAsc(products, "price");
      break;
    case "d_r":
      sortDesc(products, "rating");
      break;
    case "d_p":
      sortDesc(products, "price");
      break;
    default:
      products = products;
  }
  products.forEach((product, index) => {
    html += `
                <li class="list-group-item
                d-flex
                justify-content-between
                align-items-start">
				<div class="ms-2 me-auto ">
              <div class="fw-bold d-flex justify-content-between">${product.name}
              <button type="button" onclick="addProductToCart(${index})" class="btn btn-outline-primary btn-add-cart">
              Add to cart
              </button>
              </div>
              <a href="details.html?phone=${product.name}" target="_blank">${product.brand}</a>`;

    if (product.discount > 0) {
      let finalPrice = product.price - product.discount;
      html += `<p> 
                <span class="discounted"> ${product.price}</span>&nbsp; ${finalPrice} 
                lei</p>`;
    } else {
      html += `<p>${product.price}</p>`;
    }
    if (product.rating > 0) {
      html += `<p> ${product.rating} ${getAverageRating(product.brand)}</p>`;
    } else {
      html += `<p>-</p>`;
    }
    html += `</div></li>`;
  });

  html += "</ol>";

  document.getElementById("productList").innerHTML = html;
}
displayProducts();

let searchInput = document.querySelector("#inputQuickSearch");
let btnAll = document.querySelector("#btnAll");

searchInput.addEventListener("input", function () {
  let searchValue = searchInput.value;
  console.log(searchValue);
  if (searchValue.length > 0) btnAll.classList.remove("search-button--hidden");
  else btnAll.classList.add("search-button--hidden");
  displayProducts(
    (item) =>
      item.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.name.toLowerCase().includes(searchValue.toLowerCase())
  );
});

btnAll.addEventListener("click", function () {
  searchInput.value = "";
  btnAll.classList.add("search-button--hidden");
  displayProducts();
});

let brandFilters = document.querySelector("#brandFilters");

function generateCheckboxesBrands() {
  brands.forEach((item) => {
    brandFilters.innerHTML += `<label for="${item.toLowerCase()}">
          <input type="checkbox" name="${item.toLowerCase()}" onclick="getCheckedBrands()">
          ${item}
          </label>`;
  });
}
generateCheckboxesBrands();

function getCheckedBrands() {
  let selectedBrands = [];
  brandFilters
    .querySelectorAll('#brandFilters input[type="checkbox"]:checked')
    .forEach((item) => {
      selectedBrands.push(item.name.toLowerCase());
    });
  return selectedBrands;
}

let availabilityFilters = document.querySelector("#availabilityFilters");

let minPriceInput = document.querySelector("#minPrice");
let maxPriceInput = document.querySelector("#maxPrice");
minPriceInput.min = 0;
maxPriceInput.min = 0;
maxPriceAvailable = Math.max(
  ...myJson.products.map((product) => product.price)
);
//not neccesary
// maxPriceInput.max = maxPriceAvailable;

const availability = ["all", "until_today"];
function generateRadiosAvailability() {
  availability.forEach((item) => {
    let label = item.replace("_", " ");
    availabilityFilters.innerHTML += `<label for="${item.toLowerCase()}">
          <input type="radio" name="availability" value="${item.toLowerCase()}" >
          ${label}</label>`;
  });
}
generateRadiosAvailability();

let btnSearch = document.querySelector("#btnSearch");
let btnReset = document.querySelector("#btnReset");
let btnCancelSort = document.querySelector("#btnCancelSort");
let availabilityRadio = document.querySelector(
  "#availabilityFilters input[type='radio']:checked"
);
console.log(availabilityRadio);

let isSortAsc = false;
let isSortDesc = false;
btnSearch.addEventListener("click", function () {
  //gather all inputs from the filters and initialize conditions array
  let availabilityRadio = document.querySelector(
    "#availabilityFilters input[type='radio']:checked"
  );
  let selectedAvailability = null;
  if (availabilityRadio) selectedAvailability = availabilityRadio;
  console.log(availabilityRadio);
  let searchArr = getCheckedBrands();
  let minPrice = minPriceInput.value ? parseFloat(minPriceInput.value) : 0;
  let maxPrice = maxPriceInput.value
    ? parseFloat(maxPriceInput.value)
    : maxPriceAvailable;

  let conditions = [];

  if (searchArr.length > 0) {
    conditions.push((item) => searchArr.includes(item.brand.toLowerCase()));
  }

  //check validity for minPrice
  if (minPrice) {
    console.log("minPrice exists");
    if (minPrice < 0) {
      console.log("Minimum price must be above 0.");
    } else if (isNaN(minPrice)) {
      console.log("Minimum price must be a number.");
    } else {
      conditions.push((item) => item.price >= minPrice);
    }
  }

  // check validity for maxPrice
  if (maxPriceInput.value) {
    console.log("maxPrice exists");
    if (maxPrice < minPrice) {
      console.log("Minimum price must be lower than maximum price.");
    } else if (isNaN(maxPrice)) {
      console.log("Maximum price must be a number.");
    } else {
      conditions.push((item) => item.price <= maxPrice);
    }
  }

  if (selectedAvailability) {
    if (selectedAvailability.value === "until_today") {
      conditions.push(filterByDate());
    } else {
      conditions.pop();
    }
  }

  console.log(conditions);

  if (searchArr.length < 1 || minPrice || maxPrice) {
    displayProducts((item) =>
      conditions.every((conditionFunction) => conditionFunction(item))
    );
  }
});
btnCancelSort.addEventListener("click", function () {
  isSortAsc = false;
  isSortDesc = false;
  displayProducts();
});
btnReset.addEventListener("click", function () {
  isSortAsc = false;
  isSortDesc = false;
  displayProducts();
});

let btnAddProductCart = document.querySelector("#btnAddCart");
let shoppingCart = [];

// function addClickEvent() {
//   let btnArr = document.querySelectorAll(".btn-add-cart");
//   console.log(btnArr);
//   btnArr.forEach((btn) =>
//     btn.addEventListener("click", addProductToCart(this))
//   );
// }

// addClickEvent();
let body = document.getElementsByTagName("body")[0];
function addProductToCart(index) {
  let product = myJson.products[index];
  let id = product.name + product.brand;
  shoppingCart.push({ id: id, ...product });
  let element = document.getElementById("myToast");
  let myToast = new bootstrap.Toast(element);
  myToast.show();
  console.log(shoppingCart);
}
function showCart() {
  let html = "<ol class='list-group list-group-numbered'>";
  let products = shoppingCart;

  products.forEach((product, index) => {
    html += `
                <li class="list-group-item
                d-flex
                justify-content-between
                align-items-start">
				<div class="ms-2 me-auto ">
              <div class="fw-bold d-flex justify-content-between">${product.name}
              <button type="button" onclick="addProductToCart(${index})" class="btn btn-outline-primary btn-add-cart">
              Add to cart
              </button>
              </div>
              <a href="details.html?phone=${product.name}" target="_blank">${product.brand}</a>`;

    if (product.discount > 0) {
      let finalPrice = product.price - product.discount;
      html += `<p> 
                <span class="discounted"> ${product.price}</span>&nbsp; ${finalPrice} 
                lei</p>`;
    } else {
      html += `<p>${product.price}</p>`;
    }
    if (product.rating > 0) {
      html += `<p> ${product.rating} ${getAverageRating(product.brand)}</p>`;
    } else {
      html += `<p>-</p>`;
    }
    html += `</div></li>`;
  });

  html += "</ol>";

  document.getElementById("cartList").innerHTML = html;
}

//-------------------------------------------------------------------

function getProductList() {
  console.log("function was caled");
  axios
    .get("http://localhost:3000/shop/api/products")
    .then((response) => {
      let productList = response.data;
      const brands = [...new Set(productList.map((product) => product.brand))];
      const os = [
        ...new Set(
          productList.map((product) =>
            product.operating_system ? product.operating_system : "N/A"
          )
        ),
      ];
    })
    .catch((err) => console.log(err));
}

getProductList();
