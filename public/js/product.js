let querySearchProduct = {};
let mapData = {};
let isUpdate = false;
let isSearch = false;
let currentPage = 1;
let fileName;
function getProducts(page = 1) {
    $.ajax({
        type: "GET",
        url: "/api/products?page=" + page,
        success: function (data) {
            loadProductData(data);
            loadProductPaginate(data);
            currentPage = data.current_page;
            console.log(data);
        },
    });
}

function getSearchProducts(page = 1) {
    $.ajax({
        type: "GET",
        url: "/api/products/search?page=" + page,
        data: querySearchProduct,
        success: function (data) {
            loadSearchProductData(data);
            loadSearchProductPaginate(data);
            currentPage = data.current_page;
            console.log(data);
        },
    });
}

getProducts();

function loadProductData(data) {
    let products = data.data;
    var infotable =
        data.total > 0
            ? `
        <h1 class="text-lg">Hiển thị từ ${data.from} ~ ${data.to} trong tổng số ${data.total} products</h1>
    `
            : "";
    $("#infoTableProduct").html(infotable);
    var str = "";
    for (let i = 0; i < products.length; i++) {
        str += `
        
        <tr>
            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex">
                    <div class="flex-shrink-0 w-10 h-10">
                        ${(data.current_page - 1) * 10 + i + 1}
                    </div>

                </div>
            </td>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200 hover-product-id">
                ${products[i].product_id}
                <div class="wrap-image">
                    <img width="100px" class="image-show" src="/uploads/images/${
                        products[i].product_image
                    }"/>
                </div>
            </td>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                ${products[i].product_name}
            </td>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                ${products[i].description}
            </td>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
               $${products[i].product_price}
            </td>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                <span
                    class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900" >
                    ${
                        products[i].is_sales === 1
                            ? `<span aria-hidden class="absolute inset-0 bg-green-200 rounded-full opacity-50"></span>
                        <span class="relative">
                            Đang bán
                    
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
                <button onclick="handleEditProduct('${
                    products[i].product_id
                }')" type="button" class="inline-block mx-1 text-gray-500 hover:text-gray-700">
                    <img width="15px" class="user-icon-edit " height="15px"
                        src="images/pen-solid.svg" alt="edit" />
                </button>
                <button onclick="handleDeleteProduct('${
                    products[i].product_id
                }')" type="button" class="inline-block mx-1 text-gray-500 hover:text-gray-700">

                    <img width="15px" class="user-icon-delete" height="15px"
                        src="images/trash-can-solid.svg" alt="delete" />
                </button>
               
            </td>
        </tr>
        `;
    }
    $("#product-data").html(str);
}

function loadSearchProductData(data) {
    let products = data.data;

    var infotable =
        data.total > 0
            ? `
    <h1 class="text-lg">Hiển thị từ ${data.from} ~ ${data.to} trong tổng số ${data.total} products</h1>
`
            : "";
    $("#infoTableProduct").html(infotable);

    var str = "";
    for (let i = 0; i < products.length; i++) {
        str += `
        
        <tr>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                <div class="flex">
                    <div class="flex-shrink-0 w-10 h-10">
                        ${(data.current_page - 1) * 10 + i + 1}
                    </div>

                </div>
            </td>
            <td  class="px-5 py-5 text-lg bg-white border-b border-gray-200 hover-product-id">
                ${products[i].product_id}
                <div class="wrap-image">
                    <img width="100px" class="image-show" src="/uploads/images/${
                        products[i].product_image
                    }"/>
                </div>
            </td>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                ${products[i].product_name}
            </td>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                ${products[i].description}
            </td>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                $${products[i].product_price}
            </td>
            <td class="px-5 py-5 text-lg bg-white border-b border-gray-200">
                <span
                    class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                    ${
                        products[i].is_sales === 1
                            ? `<span aria-hidden class="absolute inset-0 bg-green-200 rounded-full opacity-50"></span>
                        <span class="relative">
                            Đang bán
                    
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
                <button onclick="handleEditProduct('${
                    products[i].product_id
                }')" type="button" class="inline-block mx-1 text-gray-500 hover:text-gray-700">
                    <img width="15px" class="user-icon-edit " height="15px"
                        src="images/pen-solid.svg" alt="edit" />
                </button>
                <button onclick="handleDeleteProduct('${
                    products[i].product_id
                }')" type="button" class="inline-block mx-1 text-gray-500 hover:text-gray-700">

                    <img width="15px" class="user-icon-delete" height="15px"
                        src="images/trash-can-solid.svg" alt="delete" />
                </button>
                
        </tr>
        `;
    }
    $("#product-data").html(str);
}

function loadSearchProductPaginate(data) {
    let str = "";
    if (data.total <= 10) {
        $("#product-pagination").html("");
        return;
    }
    let prevPage = data.current_page > 1 ? data.current_page - 1 : 1;
    let nextPage =
        data.current_page < data.last_page
            ? data.current_page + 1
            : data.last_page;
    str += `
        <li>
            <a href="#" onclick="getSearchProducts(${1});"
                class=" px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Previous</span>
                <<
            </a>
        </li>`;

    str += `
        <li>
            <a href="#" onclick="getSearchProducts(${prevPage} );"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Previous</span>
                <
            </a>
        </li>`;
    for (let i = 1; i <= data.last_page; i++) {
        if (i == data.current_page) {
            str += `
            <li>
                <a href="#" onclick="getSearchProducts(${i});" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 ">${i}</a>
            </li>
            `;
        } else {
            str += `
            
            <li>
                <a href="#" onclick="getSearchProducts(${i});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">${i}</a>
            </li>
            `;
        }
    }

    str += `
        <li>
            <a href="#" onclick="getSearchProducts(${nextPage});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Next</span>
                >
            </a>
        </li>
    `;
    str += `
        <li>
            <a href="#" onclick="getSearchProducts(${data.last_page});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Next</span>
                >>
            </a>
        </li>
    `;

    $("#product-pagination").html(str);
}

function loadProductPaginate(data) {
    let str = "";
    if (data.total <= 10) {
        $("#product-pagination").html("");
        return;
    }
    let prevPage = data.current_page > 1 ? data.current_page - 1 : 1;
    let nextPage =
        data.current_page < data.last_page
            ? data.current_page + 1
            : data.last_page;
    str += `
        <li>
            <a href="#" onclick="getProducts(${1});"
                class=" px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Previous</span>
                <<
            </a>
        </li>`;

    str += `
        <li>
            <a href="#" onclick="getProducts(${prevPage});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Previous</span>
                <
            </a>
        </li>`;
    for (let i = 1; i <= data.last_page; i++) {
        if (i == data.current_page) {
            str += `
            <li>
                <a href="#" onclick="getProducts(${i});" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 ">${i}</a>
            </li>
            `;
        } else {
            str += `
            
            <li>
                <a href="#" onclick="getProducts(${i});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">${i}</a>
            </li>
            `;
        }
    }

    str += `
        <li>
            <a href="#" onclick="getProducts(${nextPage});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Next</span>
                >
            </a>
        </li>
    `;
    str += `
        <li>
            <a href="#" onclick="getProducts(${data.last_page});"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Next</span>
                >>
            </a>
        </li>
    `;

    $("#product-pagination").html(str);
}

function handleSearchProduct() {
    let formData = new FormData(document.getElementById("formSearchProduct"));
    querySearchProduct = {};
    for (var data of formData) {
        querySearchProduct[data[0]] = data[1];
    }
    currentPage = 1;
    isSearch = true;
    getSearchProducts(1, querySearchProduct);
}

function handleResetFormSearchProduct() {
    isSearch = false;
    currentPage = 1;
    $("#formSearchProduct").trigger("reset");
    getProducts();
}

function changeNotify(element, data) {
    element.html(data);
}

async function checkFormProduct(mapData, isUpdate = false) {
    var isValid = true;
    var errorName = $("#errorName");
    var errorPrice = $("#errorPrice");
    var errorSales = $("#errorSales");

    changeNotify(errorName, "");
    changeNotify(errorPrice, "");
    changeNotify(errorSales, "");

    mapData.is_active = mapData.is_active ? true : false;
    let product;
    if (!isUpdate) {
        product = await getProductById(mapData.product_id);
    }
    if (mapData.product_name.length == 0) {
        changeNotify(errorName, "Vui lòng nhập tên sản phẩm");
        isValid = false;
    } else if (mapData.product_name.length < 6) {
        changeNotify(errorName, "Tên phải lớn hơn 5 ký tự");
        isValid = false;
    }

    if (mapData.product_price.length == 0) {
        changeNotify(errorPrice, "Giá không được để trống");
        isValid = false;
    } else if (isNaN(mapData.product_price)) {
        changeNotify(errorPrice, "Giá phải là số");
        isValid = false;
    }

    if (mapData.is_sales.length == 0) {
        changeNotify(errorSales, "Trạng thái không được để trống");
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
    //         url: "insertproduct.do",
    //         data: query,
    //         success: function (data) {
    //             getProducts();
    //             pageNumberIndex = 0;
    //         },
    //     });
    // }
}
function handleActionAddProduct() {
    $("#passwordProductFormEdit").show();
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
    document.getElementById("insert-product-modal").classList.toggle("hidden");
}
async function saveOrUpdate() {
    var form = document.getElementById("insertForm");
    var formData = new FormData(form);
    var mapData = {};
    for (var data of formData) {
        mapData[data[0]] = data[1];
    }
    console.log(mapData);
    let check = await checkFormProduct(mapData, isUpdate);
    return check;
    // if (!isUpdate && (await checkFormProduct(mapData, isUpdate))) {
    // mapData.is_active = mapData.is_active ? 1 : 0;
    // $.ajax({
    //     type: "POST",
    //     url: "/api/products",
    //     data: mapData,
    //     success: function (data) {
    //         // getProducts(1);
    //         // if (!isSearch) {
    //         getProducts(currentPage);
    //         // } else {
    //         //     getSearchProducts(currentPage);
    //         // }
    //         if (data) {
    //             toggleModal();
    //             resetErrorMessage();
    //             handleResetFormSearchProduct();
    //         }
    //     },
    // });
    // }
    // else if (isUpdate && (await checkFormProduct(mapData, isUpdate))) {
    //     mapData.is_active = mapData.is_active ? 1 : 0;

    //     $.ajax({
    //         type: "POST",
    //         url: "api/products/update",
    //         data: mapData,
    //         success: function (data) {
    //             if (!isSearch) {
    //                 getProducts(currentPage);
    //             } else {
    //                 getSearchProducts(currentPage);
    //             }
    //             if (data) {
    //                 toggleModal();
    //             }
    //         },
    //     });
    // }
}

async function getProductById(id) {
    return $.ajax({
        type: "GET",
        url: "/api/products/" + id,

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

// edit product

async function handleEditProduct(id) {
    $("#passwordProductFormEdit").hide();
    $("#passwordConfirmationFormEdit").hide();
    $("#insertForm").trigger("reset");
    resetErrorMessage();
    isUpdate = true;
    window.location.href = "/products/update/" + id;
    // let product = await getProductById(id);
    // fillToFormEdit(product);
    // toggleModal();
}

async function setUpdate(update = false, id) {
    isUpdate = update == 1 ? true : false;
    if (isUpdate) {
        let product = await getProductById(id);
        fillToFormEdit(product);
    }
}

function fillToFormEdit(product) {
    console.log(product);
    $("#product_id").val(product.product_id);

    $("#name").val(product.product_name);
    $("#price").val(product.product_price);
    if (product.product_image && product.product_image !== "null") {
        fileName = product.product_image;
        $("#productImage").attr(
            "src",
            "/uploads/images/" + product.product_image
        );
    }
    $("#description").val(product.description);

    $("#isSales").val(product.is_sales).change();
}

// handle delete
function handleDeleteProduct(id) {
    let data = {
        product_id: id,
    };
    var text = "Bạn có muốn xoá sản phẩm có id: " + id + " không?";
    if (confirm(text) != true) return;
    $.ajax({
        type: "POST",
        url: "api/products/delete",
        data: data,
        success: function (data) {
            if (!isSearch) {
                getProducts(currentPage);
            } else {
                getSearchProducts(currentPage);
            }
            if (data) {
            }
        },
    });
}

// show file

// $("#openfile").on("click", function (e) {
//     e.preventDefault();
//     $("#fileProductUpload").click();
// });

// $("#removefile").on("click", function (e) {
//     e.preventDefault();
//     var productImageEle = document.getElementById("productImageEle");
//     productImageEle.src = "/images/image.png";
//     $("#textFileName").val("");
//     $("#fileProductUpload").val("");
// });

$("#fileProductUpload").change(function () {
    var file = $("#fileProductUpload")[0].files[0];
    const reader = new FileReader();
    var productImageEle = document.getElementById("productImageEle");

    reader.addEventListener(
        "load",
        () => {
            // convert image file to base64 string
            productImageEle.src = reader.result;
        },
        false
    );
    if (file) {
        var fileName = file.name;

        reader.readAsDataURL(file);

        $("#textFileName").val(fileName);
    } else {
        productImageEle.src = "/images/image.png";

        $("#textFileName").val("");
        $("#fileProductUpload").val("");
    }
});
