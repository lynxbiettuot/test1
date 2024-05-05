//button-status
const listButtonStatus = document.querySelector("[button-status]");
console.log(listButtonStatus);

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