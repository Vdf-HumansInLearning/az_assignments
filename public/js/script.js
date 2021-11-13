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

function displayProducts(filterFunction) {
  let html = "<ol>";
  let products = myJson.products;

  if (filterFunction && filterFunction instanceof Function) {
    products = products.filter(filterFunction);
  }
  products.forEach((product) => {
    html += `
                <li class="phone">
                <h2><a href="details.html?phone=${product.name}" target="_blank">${product.brand} ${product.name}</a>
                </h2>`;
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
    html += `</li>`;
  });

  html += "</ol>";
  document.getElementById("container").innerHTML = html;
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
let availabilityRadio = document.querySelector(
  "#availabilityFilters input[type='radio']:checked"
);
console.log(availabilityRadio);

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
    if (selectedAvailability === "until_today") {
      conditions.push(filterByDate());
    }
  }

  console.log(conditions);

  if (searchArr.length < 1 || minPrice || maxPrice) {
    displayProducts((item) =>
      conditions.every((conditionFunction) => conditionFunction(item))
    );
  }
});
btnReset.addEventListener("click", function () {
  displayProducts();
});
btnAll.addEventListener("click", function () {
  searchInput.value = "";
  displayProducts();
});

//-------------------------------------------------------------------

let btnAsc = document.querySelector("#btnAsc");
let btnDesc = document.querySelector("#btnDesc");
let selectPropertyContainer = document.querySelector("#sortProperties");

const properties = ["rating", "price"];
function generateSelectOptions() {
  properties.forEach((property) => {
    let option = document.createElement("option");
    option.value = property;
    option.innerHTML = property;
    selectPropertyContainer.appendChild(option);
  });
}
generateSelectOptions();

btnAsc.addEventListener("click", function () {
  let selectedProperty =
    selectPropertyContainer.options[selectPropertyContainer.selectedIndex].text;
  let products = sortAsc(myJson.products, selectedProperty);
  displayProducts(products);
});
btnDesc.addEventListener("click", function () {
  let selectedProperty =
    selectPropertyContainer.options[selectPropertyContainer.selectedIndex].text;
  let products = sortDesc(myJson.products, selectedProperty);
  displayProducts(products);
});

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
