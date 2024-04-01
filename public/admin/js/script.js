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
const formSearch = document.querySelector("#form-search");
if(formSearch) {
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit", (event) => {
        //Ham nay ngan chan hanh vi mac dinh cua formSearch do
        event.preventDefault();

        const keyword = event.target.elements.keyword.value;
        console.log(keyword);

        if(keyword) {
            url.searchParams.set("keyword", keyword);
        }else {
            url.searchParams.delete("keyword");
        }
        console.log(url);
        window.location.href = url.href;
    });
}

//Button pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if(listButtonPagination.length > 0) {
    let url = new URL(window.location.href);
    listButtonPagination.forEach((button) => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            console.log(page);
            url.searchParams.set("page", page);
            window.location.href = url.href;
        });
    });
}
//End button pagination

