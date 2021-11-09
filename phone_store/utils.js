let myJson = {
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
      availability_date: "2021-10-25",
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
  else console.log("Brand not available");
}

// filter by OS
function filterByOS(phoneOS) {
  if (phoneOS in os)
    return myJson.products.filter(
      (product) => product.operating_system === phoneOS
    );
  else console.log("No phone with such OS available");
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
  else console.log("Minimum price under 0 not allowed");
}

// filter by rating
function filterByRating(filterAsc, productArr) {
  if (filterAsc) return productArr.sort((a, b) => a.rating - b.rating);
  else return productArr.sort((a, b) => b.rating - a.rating);
}

// filter by available stock (change stock to zero to see effects)
//if you want the phones to be shown asc/desc, call sortAsc()/sortDesc() at the end
function filterByStock() {
  let products = myJson.products.filter((product) => product.quantity > 0);
  if (products.length < 1) console.log("No products in stoc available.");
  else sortDesc(products, quantity);
}

// filter by avialable date (change availability_date to see effects)
//today
//var1
function filterByDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  console.log(typeof today);
  return myJson.products
    .filter((item) => new Date(item.availability_date) <= new Date(today))
    .sort(
      (a, b) => new Date(b.availability_date) - new Date(a.availability_date)
    );
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
  let html = "<ul>";
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

  html += "</ul>";
  document.getElementById("container").innerHTML = html;
}
displayProducts();

let searchButton = document.querySelector("#btnQuickSearch");
let searchInput = document.querySelector("#inputQuickSearch");

searchButton.addEventListener("click", function () {
  let searchValue = searchInput.value;

  displayProducts(
    (item) =>
      item.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.name.toLowerCase().includes(searchValue.toLowerCase())
  );
});

let brandFilters = document.querySelector("#brandFilters");

function generateCheckboxesBrands() {
  brands.forEach((item, index) => {
    brandFilters.innerHTML += `<label for="${item.toLowerCase()}">
      <input type="checkbox" id="${index}" name="${item.toLowerCase()}" onclick="filterBtBrandsCheckbox(${index})">
      ${item}
      </label>`;
  });
}
generateCheckboxesBrands();

function filterBtBrandsCheckbox() {
  let selectedBrands = [];
  brandFilters
    .querySelectorAll('#brandFilters input[type="checkbox"]:checked')
    .forEach((item) => {
      selectedBrands.push(item.name);
    });
  return selectedBrands;
}

let btnBrand = document.querySelector("#btnBrand");
btnBrand.addEventListener("click", function () {
  let searchArr = filterBtBrandsCheckbox();
  if (searchArr.length < 1)
    searchArr = brands.map((item) => item.toLowerCase());
  console.log(searchArr);
  displayProducts((item) => searchArr.includes(item.brand.toLowerCase()));
});

let minPriceInput = document.querySelector("#minPrice");
let maxPriceInput = document.querySelector("#maxPrice");
minPriceInput.min = 0;
maxPriceAvailable = Math.max(
  ...myJson.products.map((product) => product.price)
);
maxPriceInput.max = maxPriceAvailable;
let btnPrice = document.querySelector("#btnPrice");
btnPrice.addEventListener("click", function () {
  let minPrice = new Number(minPriceInput.value);
  let maxPrice = maxPriceInput.value ? maxPriceInput.value : maxPriceAvailable;
  console.log("---------");
  console.log(parseFloat(minPriceInput.value));
  if (minPrice > 0)
    displayProducts((item) => item.price >= minPrice && item.price <= maxPrice);
  else console.log("Minimum price must be above 0.");
});

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
