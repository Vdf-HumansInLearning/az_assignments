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
