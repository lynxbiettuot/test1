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

//Button change-status
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if(listButtonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("[form-change-status]");

    listButtonChangeStatus.forEach(button => {
        button.addEventListener("click",() => {
            const id = button.getAttribute("data-id");
            const status = button.getAttribute("data-status");
            const path = formChangeStatus.getAttribute("data-path");

            const action =  `${path}/${status}/${id}?_method=PATCH`;

            formChangeStatus.action = action;
            formChangeStatus.submit();
        });
    });
}

//End button-change-status

//check-box-multi
const checkBoxMulti =  document.querySelector("[checkbox-multi]");
if(checkBoxMulti) {
    const inputCheckAll = checkBoxMulti.querySelector("input[name='checkall']");
    const listInputId = checkBoxMulti.querySelectorAll("input[name='id']");
    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked) {
            listInputId.forEach((input) => {
                input.checked = true;
            });
        }else {
            listInputId.forEach((input) => {
                input.checked = false;
            });
        }
    });

    listInputId.forEach(inputId => {
        inputId.addEventListener("click", ()=> {
            const countInputIdChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked").length;
            const lengthInputId = listInputId.length;
            if(countInputIdChecked == lengthInputId) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        });
    });
}
//End-checkbox-multi

//form-change-multi
    const formChangeMulti = document.querySelector("[form-change-multi]");
    if(formChangeMulti) {
        formChangeMulti.addEventListener ("submit", (event) => {
            event.preventDefault();

            const type = formChangeMulti.querySelector("select[name='type']").value;
            
            const listInputChecked = document.querySelectorAll("input[name='id']:checked");
            if(listInputChecked.length > 0) {
                const ids = [];

                listInputChecked.forEach((input) => {
                    const id = input.value;

                    if(type == "change-position") {
                        //Di ra the ngoai no
                        const position = input.closest("tr").querySelector("input[name='position']").value;
                        console.log(position);

                        ids.push(`${id}-${position}`);
                    }else {
                        ids.push(id);
                    }
                });


                const stringIds = ids.join(", ");

                const input = formChangeMulti.querySelector("input[name='ids']");
                input.value = stringIds;
                if(type == "delete-all") {
                    const isConfirm = confirm("Bạn có chắc muốn xóa?");
                    if(!isConfirm) {
                        return;
                    }
                }

                formChangeMulti.submit();
            }else { 
                alert("Vui lòng chọn ít nhất một bản nghi");
            }
        });
    }
//end form change multi

//Button-delete
const listButtonDelete = document.querySelectorAll("[button-delete]");
if(listButtonDelete.length > 0) {
    const formDeleteItem = document.querySelector("[form-delete-item]");

    listButtonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isCondirm = confirm(" Bạn có chắc muốn xóa ?");

            if(isCondirm) {
                const id = button.getAttribute("data-id");
                const path = formDeleteItem.getAttribute("data-path");

                const action =  `${path}/${id}?_method=DELETE`;

                formDeleteItem.action = action;

                formDeleteItem.submit();
            }
        });
    });
}
//End Button-delete

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

//upload-image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", () => {
        const file = uploadImageInput.files[0];//lay file dau tien
        //const [file] = uploadImageInput.files cung duoc(destructoring)
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file); 
        }
    });
}
//end-upload-image