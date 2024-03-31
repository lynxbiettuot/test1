//Front end logic
//button-status
const listButtonStatus = document.querySelectorAll("[button-status]");
if(listButtonStatus.length > 0) {
    let url = new URL(window.location.href);// ham tao duong link tu URL cu

    listButtonStatus.forEach((button) => {
        // Lấy ra thuộc tính
        button.addEventListener("click", ()=> {
            const status = (button.getAttribute("button-status"));
            if(status) {
                url.searchParams.set("status", status);// Tao mot duong link moi cho url
            }else {
                url.searchParams.delete("status");
            }
            console.log(url);
            window.location.href = url.href;//cap nhat url cua web
        });

        //Đẩy thuộc tính lên URL
    });
}

//end button status