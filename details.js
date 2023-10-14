const addressbarContent = new URLSearchParams(location.search);
const productId = addressbarContent.get("productID");

// authentication
const HEADERS = {
   Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJhNTFjMzE1YThlYjAwMTg3ZTRjN2UiLCJpYXQiOjE2OTcyNzcxOTcsImV4cCI6MTY5ODQ4Njc5N30.gPXWNc_83G4Fbg0U9r9G5IzLpYGBqDbUw7ibrIM3A4Q",
   "Content-Type": "application/json",
};

const renderDetails = function (product) {
   console.log("product :", product);
   const viewDetails = document.getElementById("view-details");
   viewDetails.innerHTML = `
  <div class="card mb-3">
    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" />
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">
      ${product.description}
      </p>
      <p class="card-text">
          <small class="text-body-secondary"
            >${product.updatedAt}</small
          ><br>
          <small class="text-body-secondary"
            >${product.createdAt}</small
          >
      </p>
    </div>
  </div>
  `;
};

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
      renderDetails(product);
   })
   .catch((err) => {
      console.log("Error Occured!", err);
   });
