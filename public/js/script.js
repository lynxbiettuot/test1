//button-status
const listButtonStatus = document.querySelector("[button-status]");

//end button status

//show alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
    const time = showAlert.getAttribute("data-time");
    time = parseInt(time);
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    },time);
}
//end show alert

// Update cart
const tableCart = document.querySelector("[table-cart]");
if(tableCart) {
    const inputQuantity = tableCart.querySelectorAll("input[name='quantity']");
    inputQuantity.forEach(input => {
        input.addEventListener("change", () => {
            const quantity = input.value;
            const productId = input.getAttribute("item-id");

            window.location.href = `/cart/update/${productId}/${quantity}`
        });
    });
}
//End Update cart