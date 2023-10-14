// import { productsConatinerPreview } from "./back-office.js";

// authentication
const HEADERS = {
   Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJhNTFjMzE1YThlYjAwMTg3ZTRjN2UiLCJpYXQiOjE2OTcyNzcxOTcsImV4cCI6MTY5ODQ4Njc5N30.gPXWNc_83G4Fbg0U9r9G5IzLpYGBqDbUw7ibrIM3A4Q",
   "Content-Type": "application/json",
};

// render each product
const porductContainer = document.getElementById("product-container");
const renderEachProduct = function (product, parentDiv) {
   // console.log(product);
   const col = document.createElement("div");
   col.classList.add("col");
   col.innerHTML = `
    <div class="col">
      <div class="card h-100">
         <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
        </div>
        <div class="btn-container d-flex justify-content-center p-2 mx-2">
        <a href="./details.html?productID=${product._id}" class="btn btn-secondary col-4 mx-1">More Details</a>
          <a href="./back-office.html?IdProduct=${product._id}" class="btn btn-primary col-4 mx-1 btn-hide d-none" type="button">Edit</a>
          <button data-id="${product._id}" class="btn btn-danger col-4 mx-1 btn-hide d-none" type="button">Delete</button>       
        </div>
        <div class="card-footer">
          <small class="text-body-secondary">Created ${product.createdAt}</small><br>
          <small class="text-body-secondary">Last updated ${product.updatedAt}</small>
        </div>
      </div>
    </div>
  `;

   // console.log(parentDiv, "works fine?");
   const btnDelete = col.querySelector(".btn-danger");
   btnDelete.addEventListener("click", (event) => {
      const id = event.target.dataset.id;
      deleteProduct(id);
   });
   parentDiv.appendChild(col);
};

const deleteProduct = function (id) {
   fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
      headers: HEADERS,
      method: "DELETE",
      // body: JSON.stringify(product),
   })
      .then((response) => {
         if (response.ok) {
            return response.json();
         } else {
            throw new Error("Fetch Receiving Error!");
         }
      })
      .then((data) => {
         alert("Are you sure that you want to delete the Item?");
         console.log("Fetch went fine!");
         window.location = "./index.html";
      })
      .catch((err) => {
         // alert("Your input data is not valid. Please check again!");
         console.log("Error Occured!", err);
      });
};

// get all the listed products
const getProducts = function (parentDiv) {
   fetch("https://striveschool-api.herokuapp.com/api/product/", {
      headers: HEADERS,
   })
      .then((response) => {
         if (response.ok) {
            return response.json();
         } else {
            throw new Error("Fetch Receiving Error!");
         }
      })
      .then((data) => {
         console.log("Fetch went fine!");
         data.forEach((product) => {
            renderEachProduct(product, parentDiv);
         });
      })
      .catch((err) => {
         console.log("Error Occured!", err);
      });
};

// render all the products in the index page
getProducts(porductContainer);

// modify btn at nav
const btnModify = document.getElementById("modify");
btnModify.addEventListener("click", () => {
   const btnHide = document.querySelectorAll(".btn-hide");
   btnHide.forEach((btn) => {
      btn.classList.remove("d-none");
   });
});

// export { getProducts, renderEachProduct };
