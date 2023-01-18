let querySearchUser = {};
let mapData = {};
let isUpdate = false;
let isSearch = false;
let currentPage = 1;
function getUsers(page = 1) {
    $.ajax({
        type: "GET",
        url: "/api/users?page=" + page,
        success: function (data) {
            loadUserData(data);
            loadUserPaginate(data);
            currentPage = data.current_page;
            console.log(data);
        },
    });
}
getUsers();

function getSearchUsers(page = 1) {
    $.ajax({
        type: "GET",
        url: "/api/users/search?page=" + page,
        data: querySearchUser,
        success: function (data) {
            loadSearchUserData(data);
            loadSearchUserPaginate(data);
            currentPage = data.current_page;
            console.log(data);
        },
    });
}

function loadUserData(data) {
    let users = data.data;
    var infotable =
        data.total > 0
            ? `
        <h1 class="text-lg">Hiển thị từ ${data.from} ~ ${data.to} trong tổng số ${data.total} users</h1>
    `
            : "";
    $("#infoTableUser").html(infotable);
    var str = "";
    for (let i = 0; i < users.length; i++) {
        str += `
        
        <tr>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex">
                    <div class="flex-shrink-0 w-10 h-10">
                        ${(data.current_page - 1) * 10 + i + 1}
                    </div>

                </div>
            </td>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                ${users[i].name}
            </td>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                ${users[i].email}
            </td>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
            ${users[i].group_role}
            </td>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                <span
                    class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900" >
                    ${
                        users[i].is_active === 1
                            ? `<span aria-hidden class="absolute inset-0 bg-green-200 rounded-full opacity-50"></span>
                        <span class="relative">
                            Đang hoạt động
                    
                        </span>`
                            : `
                            <span aria-hidden class="absolute inset-0 bg-green-200 rounded-full opacity-50"></span>
                            <span class="relative text-red-500">
                                Tạm ngưng
                        
                            </span>
                        `
                    }
                    
                </span>
            </td>
            <td class="px-5 py-5 text-lg text-right bg-white border-b border-gray-200">
                <button onclick="handleEditUser('${
                    users[i].email
                }')" type="button" class="inline-block mx-1 text-gray-500 hover:text-gray-700">
                    <img width="15px" class="user-icon-edit " height="15px"
                        src="images/pen-solid.svg" alt="edit" />
                </button>
                <button onclick="handleDeleteUser('${
                    users[i].email
                }')" type="button" class="inline-block mx-1 text-gray-500 hover:text-gray-700">

                    <img width="15px" class="user-icon-delete" height="15px"
                        src="images/trash-can-solid.svg" alt="delete" />
                </button>
                <button onclick="handleLockUser('${users[i].email}', ${
            users[i].is_active
        })" type="button"
                    class="inline-block mx-1 text-gray-500 hover:text-gray-700">

                    <img width="15px" class="user-icon-resume" height="15px"
                        src="images/user-xmark-solid.svg" alt="pause/resume" />
                </button>

            </td>
        </tr>
        `;
    }
    $("#user-data").html(str);
}

function loadSearchUserData(data) {
    let users = data.data;

    var infotable =
        data.total > 0
            ? `
    <h1 class="text-lg">Hiển thị từ ${data.from} ~ ${data.to} trong tổng số ${data.total} users</h1>
`
            : "";
    $("#infoTableUser").html(infotable);

    var str = "";
    for (let i = 0; i < users.length; i++) {
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
                ${users[i].name}
            </td>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                ${users[i].email}
            </td>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
            ${users[i].group_role}
            </td>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                <span
                    class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                    ${
                        users[i].is_active === 1
                            ? `<span aria-hidden class="absolute inset-0 bg-green-200 rounded-full opacity-50"></span>
                        <span class="relative">
                            Đang hoạt động
                    
                        </span>`
                            : `
                            <span aria-hidden class="absolute inset-0 bg-green-200 rounded-full opacity-50"></span>
                            <span class="relative text-red-500">
                                Tạm ngưng
                        
                            </span>
                        `
                    }
                    
                </span>
            </td>
            <td class="px-5 py-5 text-lg text-right bg-white border-b border-gray-200">
                <button onclick="handleEditUser('${
                    users[i].email
                }')" type="button" class="inline-block mx-1 text-gray-500 hover:text-gray-700">
                    <img width="15px" class="user-icon-edit " height="15px"
                        src="images/pen-solid.svg" alt="edit" />
                </button>
                <button onclick="handleDeleteUser('${
                    users[i].email
                }')" type="button" class="inline-block mx-1 text-gray-500 hover:text-gray-700">

                    <img width="15px" class="user-icon-delete" height="15px"
                        src="images/trash-can-solid.svg" alt="delete" />
                </button>
                <button onclick="handleLockUser('${users[i].email}', ${
            users[i].is_active
        })" type="button"
                    class="inline-block mx-1 text-gray-500 hover:text-gray-700">

                    <img width="15px" class="user-icon-resume" height="15px"
                        src="images/user-xmark-solid.svg" alt="pause/resume" />
                </button>

            </td>
        </tr>
        `;
    }
    $("#user-data").html(str);
}

function loadSearchUserPaginate(data) {
    let str = "";
    if (data.total <= 10) {
        $("#user-pagination").html("");
        return;
    }
    let prevPage = data.current_page > 1 ? data.current_page - 1 : 1;
    let nextPage =
        data.current_page < data.last_page
            ? data.current_page + 1
            : data.last_page;
    str += `
        <li>
            <a href="#" onclick="getSearchUsers(${1});"
                class=" px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Previous</span>
                <<
            </a>
        </li>`;

    str += `
        <li>
            <a href="#" onclick="getSearchUsers(${prevPage} );"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Previous</span>
                <
            </a>
        </li>`;
    for (let i = 1; i <= data.last_page; i++) {
        if (i == data.current_page) {
            str += `
            <li>
                <a href="#" onclick="getSearchUsers(${i});" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 ">${i}</a>
            </li>
            `;
        } else {
            str += `
            
            <li>
                <a href="#" onclick="getSearchUsers(${i});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">${i}</a>
            </li>
            `;
        }
    }

    str += `
        <li>
            <a href="#" onclick="getSearchUsers(${nextPage});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Next</span>
                >
            </a>
        </li>
    `;
    str += `
        <li>
            <a href="#" onclick="getSearchUsers(${data.last_page});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Next</span>
                >>
            </a>
        </li>
    `;

    $("#user-pagination").html(str);
}

function loadUserPaginate(data) {
    let str = "";
    if (data.total <= 10) {
        $("#user-pagination").html("");
        return;
    }
    let prevPage = data.current_page > 1 ? data.current_page - 1 : 1;
    let nextPage =
        data.current_page < data.last_page
            ? data.current_page + 1
            : data.last_page;
    str += `
        <li>
            <a href="#" onclick="getUsers(${1});"
                class=" px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Previous</span>
                <<
            </a>
        </li>`;

    str += `
        <li>
            <a href="#" onclick="getUsers(${prevPage});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Previous</span>
                <
            </a>
        </li>`;
    for (let i = 1; i <= data.last_page; i++) {
        if (i == data.current_page) {
            str += `
            <li>
                <a href="#" onclick="getUsers(${i});" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 ">${i}</a>
            </li>
            `;
        } else {
            str += `
            
            <li>
                <a href="#" onclick="getUsers(${i});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">${i}</a>
            </li>
            `;
        }
    }

    str += `
        <li>
            <a href="#" onclick="getUsers(${nextPage});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Next</span>
                >
            </a>
        </li>
    `;
    str += `
        <li>
            <a href="#" onclick="getUsers(${data.last_page});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Next</span>
                >>
            </a>
        </li>
    `;

    $("#user-pagination").html(str);
}

function handleSearchUser() {
    let formData = new FormData(document.getElementById("formSearchUser"));
    querySearchUser = {};
    for (var data of formData) {
        querySearchUser[data[0]] = data[1];
    }
    currentPage = 1;
    isSearch = true;
    getSearchUsers(1);
}

function handleResetFormSearchUser() {
    isSearch = false;
    currentPage = 1;
    $("#formSearchUser").trigger("reset");
    getUsers();
}

function changeNotify(element, data) {
    element.html(data);
}

async function checkFormUser(mapData, isUpdate = false) {
    var isValid = true;
    var errorName = $("#errorName");
    var errorEmail = $("#errorEmail");
    var errorPassword = $("#errorPassword");
    var errorRePassword = $("#errorRePassword");
    var errorGroup = $("#errorGroup");
    changeNotify(errorName, "");
    changeNotify(errorEmail, "");
    changeNotify(errorPassword, "");
    changeNotify(errorRePassword, "");
    changeNotify(errorGroup, "");

    var regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

    mapData.is_active = mapData.is_active ? true : false;
    let user;
    if (!isUpdate) {
        user = await getUserByEmail(mapData.email);
    }
    if (mapData.name.length == 0) {
        changeNotify(errorName, "Vui lòng nhập tên người sử dụng");
        isValid = false;
    } else if (mapData.name.length < 6) {
        changeNotify(errorName, "Tên phải lớn hơn 5 ký tự");
        isValid = false;
    }

    if (mapData.email.length == 0) {
        changeNotify(errorEmail, "Email không được để trống");
        isValid = false;
    } else if (!regexMail.test(mapData.email)) {
        changeNotify(errorEmail, "Email không đúng định dạng");
        isValid = false;
    } else if (user && !isUpdate) {
        if (user.email === mapData.email) {
            changeNotify(errorEmail, "Email đã được đăng ký");
            isValid = false;
        }
    }

    if (mapData.group_role.length == 0) {
        changeNotify(errorGroup, "Nhóm không được để trống");
        isValid = false;
    }

    if (!isUpdate) {
        if (mapData.password.length == 0) {
            changeNotify(errorPassword, "Mật khẩu không được để trống");
            isValid = false;
        } else if (mapData.password.length < 6) {
            changeNotify(errorPassword, "Mật khẩu phải hơn 5 ký tự");
            isValid = false;
        } else if (!regexPassword.test(mapData.password)) {
            changeNotify(errorPassword, "Mật khẩu không bảo mật");
            isValid = false;
        }
    }

    if (mapData.password_confirmation !== mapData.password) {
        changeNotify(
            errorRePassword,
            "Mật khẩu và xác nhận mật khẩu không chính xác"
        );
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
    //         url: "insertuser.do",
    //         data: query,
    //         success: function (data) {
    //             getUsers();
    //             pageNumberIndex = 0;
    //         },
    //     });
    // }
}
function handleActionAddUser() {
    $("#passwordUserFormEdit").show();
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
    document.getElementById("insert-user-modal").classList.toggle("hidden");
}
async function saveOrUpdate() {
    var form = document.getElementById("insertForm");
    var formData = new FormData(form);
    var mapData = {};
    for (var data of formData) {
        mapData[data[0]] = data[1];
    }
    if (!isUpdate && (await checkFormUser(mapData, isUpdate))) {
        mapData.is_active = mapData.is_active ? 1 : 0;

        $.ajax({
            type: "POST",
            url: "/api/users",
            data: mapData,
            success: function (data) {
                // getUsers(1);

                // if (!isSearch) {
                getUsers(currentPage);
                // } else {
                //     getSearchUsers(currentPage);
                // }
                if (data) {
                    toggleModal();
                    resetErrorMessage();
                    handleResetFormSearchUser();
                }
            },
        });
    } else if (isUpdate && (await checkFormUser(mapData, isUpdate))) {
        mapData.is_active = mapData.is_active ? 1 : 0;

        $.ajax({
            type: "POST",
            url: "api/users/update",
            data: mapData,
            success: function (data) {
                if (!isSearch) {
                    getUsers(currentPage);
                } else {
                    getSearchUsers(currentPage);
                }
                if (data) {
                    toggleModal();
                }
            },
        });
    }
}

function getUserByEmail(email) {
    return $.ajax({
        type: "GET",
        url: "/api/users/" + email,
        data: querySearchUser,
        success: function (data) {
            console.log(data);
        },
    });
}

// reset error message

function resetErrorMessage() {
    $("#errorName").html("");
    $("#errorEmail").html("");
    $("#errorPassword").html("");
    $("#errorRePassword").html("");
    $("#errorGroup").html("");
}

// edit user

async function handleEditUser(email) {
    $("#passwordUserFormEdit").hide();
    $("#passwordConfirmationFormEdit").hide();
    $("#insertForm").trigger("reset");
    resetErrorMessage();
    isUpdate = true;

    let user = await getUserByEmail(email);
    fillToFormEdit(user);
    toggleModal();
}

function fillToFormEdit(user) {
    $("#name").val(user.name);
    $("#email").val(user.email);
    $("#email").removeClass("bg-gray-50");

    $("#email").addClass("bg-gray-200");
    $("#email").attr("readonly", true);
    $("#groupRoleFormEdit").val(user.group_role).change();
    $("#isActiveFormEdit").prop("checked", user.is_active == 1 ? true : false);
    $(".modalActiveCheck").html(
        user.is_active == 1
            ? `<label for="is_active" class="text-green-500">Đang hoạt động</label>`
            : `
            <label for="is_active" class="text-red-500">Tạm ngưng</label>
    `
    );
}

// handle delete
function handleDeleteUser(email) {
    let data = {
        email: email,
    };
    var text = "Bạn có muốn xoá thành viên có email: " + email + " không?";
    if (confirm(text) != true) return;
    $.ajax({
        type: "POST",
        url: "api/users/delete",
        data: data,
        success: function (data) {
            if (!isSearch) {
                getUsers(currentPage);
            } else {
                getSearchUsers(currentPage);
            }
            if (data) {
            }
        },
    });
}

function handleLockUser(email, is_active) {
    let data = {
        email: email,
        is_active: is_active,
    };
    var text =
        is_active == 1
            ? "Bạn có muốn tạm ngưng tài khoản thành viên có email: " +
              email +
              " không?"
            : "Bạn có muốn mở khóa tài khoản thành viên có email: " +
              email +
              " không?";
    if (confirm(text) != true) return;
    data.is_active = is_active == 1 ? 0 : 1;
    $.ajax({
        type: "POST",
        url: "api/users/lock",
        data: data,
        success: function (data) {
            if (!isSearch) {
                getUsers(currentPage);
            } else {
                getSearchUsers(currentPage);
            }
            if (data) {
            }
        },
    });
}
