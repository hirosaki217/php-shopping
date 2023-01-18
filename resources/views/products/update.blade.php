@extends('layouts.app')

@section('content')
    <style>
        .dropzoneDragArea {
            /* background-color: #fbfdff;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            border: 1px dashed #c0ccda;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            border-radius: 6px;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            padding: 60px;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            text-align: center;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            margin-bottom: 15px; */
            cursor: pointer;
        }

        .dropzone {
            box-shadow: 0px 2px 20px 0px #f2f2f2;
            border-radius: 10px;
        }

        .right-form {
            min-width: 300px;
        }
    </style>
    <h3 class="mb-4 text-xl font-medium text-gray-900 pl-9 dark:text-white">Add/Edit Product</h3>
    <nav class="flex pl-10" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
                <a href="{{ route('home') }}"
                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z">
                        </path>
                    </svg>
                    Home
                </a>
            </li>
            <li>
                <div class="flex items-center">
                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <a href="{{ route('products') }}"
                        class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Products</a>
                </div>
            </li>
            <li aria-current="page">
                <div class="flex items-center">
                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Add/Edit Product</span>
                </div>
            </li>
        </ol>
    </nav>
    <div class="flex justify-center w-full">
        <form class="p-8 space-y-6 bg-white rounded" name="insertForm" action="#" id="insertForm"
            enctype="multipart/form-data">
            @csrf
            <div class="flex justify-around">
                <div class=" left-form">
                    <input type="text" hidden name="product_id" id="product_id">
                    <div>
                        <label for="product_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tên</label>
                        <input type="text" name="product_name" id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Nhập tên">
                        <small class="ml-1 text-red-500" id="errorName"></small>
                    </div>
                    <div>
                        <label for="product_price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Giá</label>
                        <input type="text" name="product_price" id="price"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Nhập giá sản phẩm">
                        <small class="ml-1 text-red-500" id="errorPrice"></small>

                    </div>
                    <div>
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Mô tả</label>

                        <textarea name="description" id="description"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Nhập mô tả" cols="30" rows="10"></textarea>
                    </div>
                    <div>
                        <label for="is_sales"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhóm</label>
                        <select name="is_sales" id="isSales"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" selected>Chọn trạng thái</option>
                            <option value="0">Tạm ngưng</option>
                            <option value="1">Đang bán</option>

                        </select>
                        <small class="ml-1 text-red-500" id="errorSales"></small>

                    </div>
                </div>
                <div class="pl-8 p-y right-form">
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình
                            ảnh</label>

                        <div id="preview-container">
                            <div id="preview-template" class="justify-center dz-preview dz-file-preview">
                                <div class="dz-details">
                                    <div hidden class="dz-size" data-dz-size></div>
                                    <img width="100px" class="product-image" id="productImage" data-dz-thumbnail />
                                    <button hidden id="remove-image" data-dz-remove>x</button>
                                    <div class="py-3 dz-filename"><span data-dz-name></span></div>
                                </div>
                                <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                                <div hidden class="dz-success-mark"><span>✔</span></div>
                                <div hidden class="dz-error-mark"><span>✘</span></div>
                                <div class="dz-error-message"><span data-dz-errormessage></span></div>


                            </div>

                        </div>

                        <div>
                            <button id="dropzoneDragArea" type="button"
                                class="p-1 text-white bg-blue-500 rounded-sm dz-default dz-message dropzoneDragArea hover:bg-blue-800">
                                Upload
                            </button>
                            <button id="remove-image2" type="button"
                                class="p-1 text-white bg-blue-500 rounded-sm dz-default dz-message hover:bg-blue-800">
                                Xóa
                            </button>
                        </div>


                    </div>
                    {{-- <div>
                        <button id="dropzoneDragArea" type="button"
                            class="p-1 text-white bg-blue-500 rounded-sm dz-default dz-message dropzoneDragArea hover:bg-blue-800">
                            Upload
                        </button>
                        <button id="openfile"
                            class="p-1 text-white bg-blue-500 rounded-sm hover:bg-blue-800">Upload</button>
                        <input id="fileProductUpload" type="file" hidden name="product_image">
                        <button id="removefile" class="p-1 text-white bg-red-500 rounded-sm hover:bg-red-800">Xóa
                            file</button>
                      
                        <input id="textFileName" readonly class="py-1 rounded-sm" type="text"
                            placeholder="tên file upload">

                    </div> --}}
                </div>
            </div>

            <div class="px-4 py-3 text-right">
                <a href="{{ route('products') }}" type="button"
                    class="px-4 py-2 mr-2 text-white bg-gray-500 rounded hover:bg-gray-700"><i class="fas fa-times"></i>
                    Thoát</a>
                {{-- <button class="px-6 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-700">Lưu</button> --}}
                <button type="submit"
                    class="px-6 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-700">Lưu</button>
                {{-- <button type="button" onclick=" saveOrUpdate()"
                    class="px-6 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-700">Lưu</button> --}}
            </div>
        </form>

        {{-- <form method="post" action="{{ route('products') }}" id="dropzone" enctype="multipart/form-data"
            class="dropzone">

        </form> --}}
    </div>

    <script src="{{ asset('js/jquery-3.6.3.min.js') }}"></script>
    <script src="{{ asset('js/product.js') }}"></script>
    <script>
        $('.form-save-isactive').change(function(event) {
            var checkbox = event.target;
            if (checkbox.checked) {
                $('#activeCheck').html('<span class="text-green-500">Đang hoạt động</span>');
            } else {
                $('#activeCheck').html('<span class="text-red-500">Tạm ngưng</span>');

            }
        })
    </script>
    <script type="text/javascript">
        $('#remove-image2').click(function() {
            $('.dz-details.dz-image-preview #remove-image').click();
            $('.product-image').attr('src', '');
            fileName = null;
        })
        Dropzone.autoDiscover = false;
        // Dropzone.options.insertForm = false;	
        let token = $('meta[name="csrf-token"]').attr('content');
        $(function() {
            var myDropzone = new Dropzone("#dropzoneDragArea", {
                paramName: "file",
                url: "/api/products/storeimage",
                previewsContainer: '#preview-container',
                previewTemplate: document.getElementById('preview-template').innerHTML,
                addRemoveLinks: false,
                autoProcessQueue: false,
                uploadMultiple: false,
                parallelUploads: 1,
                acceptedMimeTypes: 'image/*',
                maxFiles: 1,
                maxFilesize: 2,
                maxThumbnailFilesize: 2,
                params: {
                    _token: token
                },
                // The setting up of the dropzone
                init: function() {
                    this.on("error", function(file, message) {
                        alert(message);
                        this.removeFile(file);
                    });
                    this.on('addedfile', function(file) {
                        $('.product-image').attr('src', '');
                        if (this.files.length > 1) {
                            this.removeFile(this.files[0]);

                        }
                        fileName = file.name;
                    });
                    // this.on("maxfilesexceeded", function(file) {

                    //     this.removeAllFiles();
                    //     this.addFile(file);
                    // });
                    this.hiddenFileInput.removeAttribute('multiple');
                    var myDropzone = this;
                    //form submission code goes here
                    $("form[name='insertForm']").submit(function(event) {
                        //Make sure that the form isn't actully being sent.
                        event.preventDefault();
                        URL = '/api/products/'
                        formData = $('#insertForm').serialize();

                        if (!saveOrUpdate())
                            return
                        if (!isUpdate) {

                            $.ajax({
                                type: 'POST',
                                url: URL,
                                data: formData,
                                success: function(result) {
                                    if (result.status == "success") {
                                        // fetch the useid 
                                        var product_id = result.product_id;
                                        $("#product_id").val(
                                            product_id
                                        ); // inseting userid into hidden input field
                                        //process the queue
                                        myDropzone.processQueue();
                                        console.log(product_id);
                                    } else {
                                        console.log("error ", result);
                                    }
                                }
                            });
                        } else if (isUpdate) {
                            formData += '&is_update=true&file_name=' + fileName;
                            console.log(formData);

                            $.ajax({
                                type: "POST",
                                url: "/api/products/update",
                                data: formData,
                                success: function(data) {
                                    console.log('UPDATED Success');
                                    myDropzone.processQueue();
                                },
                            });
                        }
                    });
                    //Gets triggered when we submit the image.
                    this.on('sending', function(file, xhr, formData) {
                        //fetch the user id from hidden input field and send that userid with our image
                        let product_id = document.getElementById('product_id').value;
                        formData.append('product_id', product_id);


                    });

                    this.on("success", function(file, response) {
                        //reset the form
                        $('#insertForm')[0].reset();
                        //reset dropzone
                        $('#preview-container').empty();
                        window.location.href = "/products"
                    });
                    this.on("queuecomplete", function() {

                    });

                    // Listen to the sendingmultiple event. In this case, it's the sendingmultiple event instead
                    // of the sending event because uploadMultiple is set to true.
                    this.on("sendingmultiple", function() {
                        // Gets triggered when the form is actually being sent.
                        // Hide the success button or the complete form.
                    });

                    this.on("successmultiple", function(files, response) {
                        // Gets triggered when the files have successfully been sent.
                        // Redirect user or notify of success.
                    });

                    this.on("errormultiple", function(files, response) {
                        // Gets triggered when there was an error sending the files.
                        // Maybe show form again, and notify user of error
                    });
                }
            });
        });

        try {

            setUpdate('{{ $is_update }}', "{{ strval($id) }}");
        } catch (e) {}
    </script>
@endsection
