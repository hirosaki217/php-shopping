let querySearchCustomer = {};
let mapData = {};
let isUpdate = false;
let isSearch = false;
let currentPage = 1;

let editRow = (function () {
    let isEditing = false;
    let email = null;
    let index = 0;
    return {
        data: function () {
            return {
                isEditing,
                email,
                index,
            };
        },
        setData: function (isEdit, e, i) {
            isEditing = isEdit;
            email = e;
            index = i;
        },
    };
})();

function getCustomers(page = 1) {
    if (checkIsEditing()) return;

    $.ajax({
        type: "GET",
        url: "/api/customers?page=" + page,
        success: function (data) {
            loadCustomerData(data);
            loadCustomerPaginate(data);
            currentPage = data.current_page;
            console.log(data);
        },
    });
}

function getSearchCustomers(page = 1) {
    if (checkIsEditing()) return;

    $.ajax({
        type: "GET",
        url: "/api/customers/search?page=" + page,
        data: querySearchCustomer,
        success: function (data) {
            loadSearchCustomerData(data);
            loadSearchCustomerPaginate(data);
            currentPage = data.current_page;
            console.log(data);
        },
    });
}

getCustomers();

function loadCustomerData(data) {
    let customers = data.data;
    var infotable =
        data.total > 0
            ? `
        <h1 class="text-lg">Hiển thị từ ${data.from} ~ ${data.to} trong tổng số ${data.total} customers</h1>
    `
            : "";
    $("#infoTableCustomer").html(infotable);
    var str = "";
    for (let i = 0; i < customers.length; i++) {
        str += `
        <tr>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                <div class="flex">
                    <div class="flex-shrink-0 w-10 h-10">
                        ${(data.current_page - 1) * 10 + i + 1}
                    </div>
                </div>
            </td>
            
            
                <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                <input id="customer_name_${i}" name="customer_name" value="${
            customers[i].customer_name
        }" readonly type="text"  class="input-table input-select-${i} disable-text">
                <small class="textError" id="error_name_${i}"></small>
                </td>
                <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                    <input id="email_${i}" name="email" value="${
            customers[i].email
        }" readonly type="text"  class="input-table input-select-${i} disable-text">
                    <small class="textError" id="error_email_${i}"></small>

                </td>
                <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                    <input id="address_${i}" name="address" value="${
            customers[i].address
        }" readonly type="text"  class="input-table input-select-${i} disable-text">
                    <small class="textError" id="error_address_${i}"></small>

                </td>
                <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                    <input id="tel_num_${i}" name="tel_num" value="${
            customers[i].tel_num
        }" readonly type="text"  class="input-table input-select-${i} disable-text">
                    <small class="textError" id="error_tel_num_${i}"></small>

                </td>
            


            <td class="px-5 py-5 text-lg text-right bg-white border-b border-gray-200">
                <button id="btn-edit-${i}" onclick="handleEditCustomer('${
            customers[i].email
        }', ${i})" type="button" class="inline-block mx-1 text-gray-500 hover:text-gray-700">
                
                    <img width="15px" class="user-icon-edit " height="15px"
                        src="images/pen-solid.svg" alt="edit" />
                        
                </button>
                <button onclick="handleDeleteCustomer('${
                    customers[i].email
                }')" type="button" class="inline-block mx-1 text-gray-500 hover:text-gray-700">

                    <img width="15px" class="user-icon-delete" height="15px"
                        src="images/trash-can-solid.svg" alt="delete" />
                </button>
            </td>
        </tr>
        `;
    }
    $("#customer-data").html(str);
}

function loadSearchCustomerData(data) {
    let customers = data.data;

    var infotable =
        data.total > 0
            ? `
        <h1 class="text-lg">Hiển thị từ ${data.from} ~ ${data.to} trong tổng số ${data.total} customers</h1>
    `
            : "";
    $("#infoTableCustomer").html(infotable);

    var str = "";
    for (let i = 0; i < customers.length; i++) {
        str += `
        
        <tr>
        <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
            <div class="flex">
                <div class="flex-shrink-0 w-10 h-10">
                    ${(data.current_page - 1) * 10 + i + 1}
                </div>
            </div>
        </td>
        <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
            <input name="customer_name" value="${
                customers[i].customer_name
            }" readonly type="text"  class="input-table input-select-${i} disable-text">
        </td>
        <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
            <input  name="email" value="${
                customers[i].email
            }" readonly type="text"  class="input-table input-select-${i} disable-text">

        </td>
        <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
            <input name="address" value="${
                customers[i].address
            }" readonly type="text"  class="input-table input-select-${i} disable-text">
        </td>
        <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
            <input name="tel_num" value="${
                customers[i].tel_num
            }" readonly type="text"  class="input-table input-select-${i} disable-text">
        </td>


        <td class="px-5 py-5 text-lg text-right bg-white border-b border-gray-200">
            <button id="btn-edit-${i}" onclick="handleEditCustomer('${
            customers[i].email
        }', ${i})" type="button" class="inline-block mx-1 text-gray-500 hover:text-gray-700">
                <img width="15px" class="user-icon-edit " height="15px"
                    src="images/pen-solid.svg" alt="edit" />
            </button>
            <button onclick="handleDeleteCustomer('${
                customers[i].email
            }')" type="button" class="inline-block mx-1 text-gray-500 hover:text-gray-700">

                <img width="15px" class="user-icon-delete" height="15px"
                    src="images/trash-can-solid.svg" alt="delete" />
            </button>
        </td>
    </tr>
        `;
    }
    $("#customer-data").html(str);
}

function loadSearchCustomerPaginate(data) {
    let str = "";
    if (data.total <= 10) {
        $("#customer-pagination").html("");
        return;
    }
    let prevPage = data.current_page > 1 ? data.current_page - 1 : 1;
    let nextPage =
        data.current_page < data.last_page
            ? data.current_page + 1
            : data.last_page;
    str += `
        <li>
            <a href="#" onclick="getSearchCustomers(${1});"
                class=" px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Previous</span>
                <<
            </a>
        </li>`;

    str += `
        <li>
            <a href="#" onclick="getSearchCustomers(${prevPage} );"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Previous</span>
                <
            </a>
        </li>`;
    for (let i = 1; i <= data.last_page; i++) {
        if (i == data.current_page) {
            str += `
            <li>
                <a href="#" onclick="getSearchCustomers(${i});" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 ">${i}</a>
            </li>
            `;
        } else {
            str += `
            
            <li>
                <a href="#" onclick="getSearchCustomers(${i});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">${i}</a>
            </li>
            `;
        }
    }

    str += `
        <li>
            <a href="#" onclick="getSearchCustomers(${nextPage});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Next</span>
                >
            </a>
        </li>
    `;
    str += `
        <li>
            <a href="#" onclick="getSearchCustomers(${data.last_page});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Next</span>
                >>
            </a>
        </li>
    `;

    $("#customer-pagination").html(str);
}

function loadCustomerPaginate(data) {
    let str = "";
    if (data.total <= 10) {
        $("#customer-pagination").html("");
        return;
    }
    let prevPage = data.current_page > 1 ? data.current_page - 1 : 1;
    let nextPage =
        data.current_page < data.last_page
            ? data.current_page + 1
            : data.last_page;
    str += `
        <li>
            <a href="#" onclick="getCustomers(${1});"
                class=" px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Previous</span>
                <<
            </a>
        </li>`;

    str += `
        <li>
            <a href="#" onclick="getCustomers(${prevPage});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Previous</span>
                <
            </a>
        </li>`;
    for (let i = 1; i <= data.last_page; i++) {
        if (i == data.current_page) {
            str += `
            <li>
                <a href="#" onclick="getCustomers(${i});" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 ">${i}</a>
            </li>
            `;
        } else {
            str += `
            
            <li>
                <a href="#" onclick="getCustomers(${i});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">${i}</a>
            </li>
            `;
        }
    }

    str += `
        <li>
            <a href="#" onclick="getCustomers(${nextPage});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Next</span>
                >
            </a>
        </li>
    `;
    str += `
        <li>
            <a href="#" onclick="getCustomers(${data.last_page});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Next</span>
                >>
            </a>
        </li>
    `;

    $("#customer-pagination").html(str);
}

function handleSearchCustomer() {
    if (checkIsEditing()) return;
    let formData = new FormData(document.getElementById("formSearchCustomer"));
    querySearchCustomer = {};
    for (var data of formData) {
        querySearchCustomer[data[0]] = data[1];
    }
    currentPage = 1;
    isSearch = true;
    getSearchCustomers(1, querySearchCustomer);
}

function handleResetFormSearchCustomer() {
    if (checkIsEditing()) return;
    isSearch = false;
    currentPage = 1;
    $("#formSearchCustomer").trigger("reset");
    getCustomers();
}

function changeNotify(element, data) {
    element.html(data);
}

async function checkFormCustomer(
    mapData,
    isUpdate = false,
    errorEle = {
        errorName: "errorName",
        errorEmail: "errorEmail",
        errorPhone: "errorPhone",
        errorAddress: "errorAddress",
    }
) {
    var isValid = true;
    var errorName = $(`#${errorEle.errorName}`);
    var errorEmail = $(`#${errorEle.errorEmail}`);
    var errorPhone = $(`#${errorEle.errorPhone}`);
    var errorAddress = $(`#${errorEle.errorAddress}`);
    changeNotify(errorName, "");
    changeNotify(errorEmail, "");
    changeNotify(errorPhone, "");
    changeNotify(errorAddress, "");

    var regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var regexPhone =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    mapData.is_active = mapData.is_active ? 1 : 0;
    let customer;
    if (!isUpdate) {
        customer = await getCustomerByEmail(mapData.email);
    }
    if (mapData.customer_name.length == 0) {
        changeNotify(errorName, "Vui lòng nhập tên người sử dụng");
        isValid = false;
    } else if (mapData.customer_name.length < 6) {
        changeNotify(errorName, "Tên phải lớn hơn 5 ký tự");
        isValid = false;
    }

    if (mapData.email.length == 0) {
        changeNotify(errorEmail, "Email không được để trống");
        isValid = false;
    } else if (!regexMail.test(mapData.email)) {
        changeNotify(errorEmail, "Email không đúng định dạng");
        isValid = false;
    } else if (customer && !isUpdate) {
        if (customer.email === mapData.email) {
            changeNotify(errorEmail, "Email đã được đăng ký");
            isValid = false;
        }
    }
    if (mapData.tel_num.length == 0) {
        changeNotify(errorPhone, "Số điện thoại không được để trống");
        isValid = false;
    } else if (mapData.tel_num.length < 10) {
        changeNotify(errorPhone, "Số điện thoại không hợp lệ ");
        isValid = false;
    } else if (!regexPhone.test(mapData.tel_num)) {
        changeNotify(errorPhone, "Số điện thoại chưa đúng định dạng");
        isValid = false;
    }

    if (mapData.address.length == 0) {
        changeNotify(errorAddress, "Địa chỉ không được để trống");
        isValid = false;
    }
    return isValid;
    // if (!isValid) {
    //     return false;
    // }
    // if (!isUpdate) {
    //     var query =
    //         "name=" +
    //         mapData.name +
    //         "&email=" +
    //         mapData.email +
    //         "&groups=" +
    //         mapData.groups +
    //         "&password=" +
    //         mapData.password +
    //         "&active=" +
    //         mapData.active;
    //     console.log(query);
    //     $.ajax({
    //         type: "POST",
    //         url: "insertcustomer.do",
    //         data: query,
    //         success: function (data) {
    //             getCustomers();
    //             pageNumberIndex = 0;
    //         },
    //     });
    // }
}
function handleActionAddCustomer() {
    if (checkIsEditing()) return;
    $("#passwordCustomerFormEdit").show();
    $("#passwordConfirmationFormEdit").show();
    $("#email").attr("readonly", false);
    $("#email").addClass("bg-gray-50");

    $("#email").removeClass("bg-gray-200");
    isUpdate = false;
    $("#insertForm").trigger("reset");
    $(".modalActiveCheck").html(
        `
            <label for="is_active" class="text-red-500">Tạm ngưng</label>
    `
    );
    resetErrorMessage();
    toggleModal();
}

function toggleModal() {
    document.getElementById("insert-customer-modal").classList.toggle("hidden");
}
async function saveOrUpdate() {
    if (checkIsEditing()) return;
    var form = document.getElementById("insertForm");
    var formData = new FormData(form);
    var mapData = {};
    for (var data of formData) {
        mapData[data[0]] = data[1];
    }

    if (await checkFormCustomer(mapData, isUpdate)) {
        $.ajax({
            type: "POST",
            url: "/api/customers",
            data: mapData,
            success: function (data) {
                getCustomers(1);

                // if (!isSearch) {
                // getCustomers(currentPage);
                // } else {
                //     getSearchCustomers(currentPage);
                // }
                if (data) {
                    toggleModal();
                    resetErrorMessage();
                    handleResetFormSearchCustomer();
                }
            },
        });
    }
    // else if (isUpdate && (await checkFormCustomer(mapData, isUpdate))) {
    //     console.log(JSON.stringify(mapData));
    //     mapData.is_active = mapData.is_active ? 1 : 0;
    //     $.ajax({
    //         type: "POST",
    //         url: "api/customers/update",
    //         data: mapData,
    //         success: function (data) {
    //             if (!isSearch) {
    //                 getCustomers(currentPage);
    //             } else {
    //                 getSearchCustomers(currentPage);
    //             }
    //             if (data) {
    //                 toggleModal();
    //             }
    //         },
    //     });
    // }
}

function getCustomerByEmail(email) {
    return $.ajax({
        type: "GET",
        url: "/api/customers/" + email,
        data: querySearchCustomer,
        success: function (data) {
            console.log(data);
        },
    });
}

// reset error message

function resetErrorMessage() {
    $("#errorName").html("");
    $("#errorEmail").html("");
    $("#errorPhone").html("");
    $("#errorAddress").html("");
}

// edit customer

async function handleEditCustomer(email, i) {
    let row = editRow.data();
    console.log(row);
    if (row.isEditing && row.email != email && row.index != i) {
        alert(
            "vui lòng lưu thông tin đang sửa trước khi thực hiện hành động tiếp theo"
        );
        return;
    }

    // $("#passwordCustomerFormEdit").hide();
    // $("#passwordConfirmationFormEdit").hide();
    // $("#insertForm").trigger("reset");
    // resetErrorMessage();
    // isUpdate = true;

    // let customer = await getCustomerByEmail(email);
    // fillToFormEdit(customer);
    mapData = {};
    mapData["customer_name"] = $("#customer_name_" + i).val();
    mapData["email"] = $("#email_" + i).val();
    mapData["address"] = $("#address_" + i).val();
    mapData["tel_num"] = $("#tel_num_" + i).val();
    var errorEle = {
        errorName: "error_name_" + i,
        errorEmail: "error_email_" + i,
        errorAddress: "error_address_" + i,
        errorPhone: "error_tel_num_" + i,
    };
    if (editRow.data().isEditing) {
        if (!(await checkFormCustomer(mapData, true, errorEle))) {
            return;
        } else {
            $.ajax({
                type: "POST",
                url: "api/customers/update",
                data: mapData,
                success: function (data) {
                    // if (!isSearch) {
                    //     getCustomers(currentPage);
                    // } else {
                    //     getSearchCustomers(currentPage);
                    // }
                },
            });
        }
    }

    editRow.setData(!editRow.data().isEditing, email, i);
    if (editRow.data().isEditing) {
        $("#btn-edit-" + i)
            .html(`<img width="15px" class="user-icon-edit " height="15px"
                src="images/save.svg" alt="save" />`);
    } else if (!editRow.data().isEditing) {
        $("#btn-edit-" + i).html(`
            <img
            width="15px"
            class="user-icon-edit "
            height="15px"
            src="images/pen-solid.svg"
            alt="edit"
        />
            `);
    }

    var list = document.querySelectorAll(".input-select-" + i);
    for (var e of list) {
        if (e.name !== "email") {
            e.classList.toggle("disable-text");
            e.toggleAttribute("readonly");
        }
    }
}

function fillToFormEdit(customer) {
    $("#name").val(customer.name);
    $("#email").val(customer.email);
    $("#email").removeClass("bg-gray-50");

    $("#email").addClass("bg-gray-200");
    $("#email").attr("readonly", true);
    $("#isActiveFormEdit").prop(
        "checked",
        customer.is_active == 1 ? true : false
    );
    $(".modalActiveCheck").html(
        customer.is_active == 1
            ? `<label for="is_active" class="text-green-500">Đang hoạt động</label>`
            : `
            <label for="is_active" class="text-red-500">Tạm ngưng</label>
    `
    );
}

// handle delete
function handleDeleteCustomer(email) {
    if (checkIsEditing()) return;
    let data = {
        email: email,
    };
    var text = "Bạn có muốn xoá thành viên có email: " + email + " không?";
    if (confirm(text) != true) return;
    $.ajax({
        type: "POST",
        url: "api/customers/delete",
        data: data,
        success: function (data) {
            if (!isSearch) {
                getCustomers(currentPage);
            } else {
                getSearchCustomers(currentPage);
            }
            if (data) {
            }
        },
    });
}

// function handleLockCustomer(email, is_active) {
//     let data = {
//         email: email,
//         is_active: is_active,
//     };
//     var text = is_active
//         ? "Bạn có muốn tạm ngưng tài khoản thành viên có email: " +
//           email +
//           " không?"
//         : "Bạn có muốn mở khóa tài khoản thành viên có email: " +
//           email +
//           " không?";
//     if (confirm(text) != true) return;
//     $.ajax({
//         type: "POST",
//         url: "api/customers/lock",
//         data: data,
//         success: function (data) {
//             if (!isSearch) {
//                 getCustomers(currentPage);
//             } else {
//                 getSearchCustomers(currentPage);
//             }
//             if (data) {
//             }
//         },
//     });
// }

function checkIsEditing() {
    if (editRow.data().isEditing) {
        alert(
            "vui lòng lưu thông tin đang sửa trước khi thực hiện hành động tiếp theo"
        );
        return true;
    }
    return false;
}
