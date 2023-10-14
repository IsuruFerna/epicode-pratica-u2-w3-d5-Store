// import { getProducts } from "./index.js";

// authentication
const HEADERS = {
   Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJhNTFjMzE1YThlYjAwMTg3ZTRjN2UiLCJpYXQiOjE2OTcyNzcxOTcsImV4cCI6MTY5ODQ4Njc5N30.gPXWNc_83G4Fbg0U9r9G5IzLpYGBqDbUw7ibrIM3A4Q",
   "Content-Type": "application/json",
};

const addressbarContent = new URLSearchParams(location.search);
const productId = addressbarContent.get("IdProduct");

// fetch post product
const postProduct = function (product) {
   fetch("https://striveschool-api.herokuapp.com/api/product/", {
      headers: HEADERS,
      method: "POST",
      body: JSON.stringify(product),
   })
      .then((response) => {
         if (response.ok) {
            return response.json();
         } else {
            throw new Error("Fetch Receiving Error!");
         }
      })
      .then((data) => {
         alert("Product saved successfully!", data);
         console.log("Fetch went fine!");
         window.location = "./index.html";
      })
      .catch((err) => {
         alert("Your input data is not valid. Please check again!");
         console.log("Error Occured!", err);
      });
};

// fetch put
const putPorduct = function (id, product) {
   console.log("product inside", product);
   fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
      headers: HEADERS,
      method: "PUT",
      body: JSON.stringify(product),
   })
      .then((response) => {
         if (response.ok) {
            return response.json();
         } else {
            throw new Error("Fetch Receiving Error!");
         }
      })
      .then((data) => {
         alert("Product modified successfully!");
         console.log("Fetch went fine: ", data);
         window.location = "./index.html";
      })
      .catch((err) => {
         alert("Your input data is not valid. Please check again!");
         console.log("Error Occured!", err);
      });
};

// get form data and save into server
const productName = document.getElementById("product-name");
const productDescription = document.getElementById("product-description");
const productBrand = document.getElementById("product-brand");
const productImg = document.getElementById("product-img");
const productPrice = document.getElementById("product-price");

// modify data after loaded the latest data
const updateData = function () {
   const form = document.getElementById("form-post");

   // reset the form input
   const btnReset = document.getElementById("btn-reset");
   btnReset.addEventListener("click", () => {
      form.reset();
   });

   // submit form
   form.addEventListener("submit", function (e) {
      e.preventDefault();

      const product = {
         name: productName.value,
         description: productDescription.value,
         brand: productBrand.value,
         imageUrl: productImg.value,
         price: parseFloat(productPrice.value),
      };

      if (productId) {
         putPorduct(productId, product);
      } else {
         postProduct(product);
      }
   });
   // });
};

if (productId) {
   // get product details and fill the inputs with it's values

   fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
      headers: HEADERS,
   })
      .then((response) => {
         if (response.ok) {
            return response.json();
         } else {
            throw new Error("Fetch Receiving Error!");
         }
      })
      .then((product) => {
         console.log("Fetch went fine: ", product);

         // set input values
         productName.value = product.name;
         productDescription.value = product.description;
         productBrand.value = product.brand;
         productImg.value = product.imageUrl;
         productPrice.value = product.price;

         updateData();
      })
      .catch((err) => {
         console.log("Error Occured!", err);
      });
} else {
   updateData();
}

// // nav bar
// // containers
// const previewHome = document.getElementById(
//    "preview-home-container-back-office"
// );
// const addProduct = document.getElementById("add-product");
// const productsConatinerPreview = document.getElementById(
//    "product-container-back-office"
// );
// console.log("am I null?", productsConatinerPreview);

// // btns
// const btnHome = document.getElementById("preview-home");
// const btnAddProduct = document.getElementById("list-product");

// // default view
// previewHome.style.display = "block";
// addProduct.style.display = "none";

// // I can do the same thing via a loop but this case not necessary
// btnAddProduct.addEventListener("click", () => {
//    previewHome.style.display = "none";
//    addProduct.style.display = "block";
// });
// btnHome.addEventListener("click", () => {
//    previewHome.style.display = "block";
//    addProduct.style.display = "none";
// });

// // render all the product into preveiw Home page
// getProducts(productsConatinerPreview, HEADERS);

// // adding edit button to each product
// const products = document.querySelectorAll(".card");
// products.forEach((product) => {
//    const btnEdit = document.createElement("div");
//    btnEdit.classList.add("col-4");
//    btnEdit.innerHTML = `
//       <button class="btn btn-primary" type="submit">Post</button>
//    `;
//    product.appendChild(btnEdit);
//    console.log("card ,", product);
// });

// export { productsConatinerPreview };
