module.exports = (req) => {
    const filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Không hoạt động",
            status: "inactive",
            class: ""
        }
    ];
    
    if(req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        //update class
        filterStatus[index].class = "active";
    }else {
        const index = filterStatus.findIndex(item => item.status == "");
        //update class
        filterStatus[index].class = "active";
    }

    return filterStatus;
}