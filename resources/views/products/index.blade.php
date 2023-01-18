@extends('layouts.app')

@section('content')
    <h1 class="text-lg font-bold text-red-500 ml-11">Quản lý sản phẩm</h1>
    <div class="flex flex-col items-center justify-center">
        <div class="flex justify-center w-full p-12">
            <form class="w-8/12 px-12" action="#" id="formSearchProduct">
                <div class="flex justify-between mb-4">
                    <label class="block">
                        <span class=" after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Tên sản phẩm
                        </span>
                        <input type="name" name="product_name"
                            class="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                            placeholder="Nhập tên sản phẩm" />
                    </label>



                    <label class="block">
                        <span class=" after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Trạng thái
                        </span>
                        <select
                            class="block w-full px-4 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                            name="is_sales" id="is_sales">
                            <option value="">Chọn trạng thái&hellip;</option>
                            <option value="1">Đang bán</option>
                            <option value="0">Tạm ngưng</option>
                        </select>
                    </label>
                    <div class="flex">
                        <label class="block">
                            <span class=" after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                Giá bán từ
                            </span>
                            <input type="text" name="product_price_from"
                                class="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                                placeholder="từ" />
                        </label>
                        <label class="flex items-center">
                            <span class="pt-5 font-bold text-lg  after:ml-0.5 after:text-red-500 block  text-slate-700">
                                ~
                            </span>

                        </label>
                        <label class="block">
                            <span class=" after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                Giá bán đến
                            </span>
                            <input type="text" name="product_price_to"
                                class="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                                placeholder="đến" />
                        </label>
                    </div>
                </div>
                <div class="flex justify-between ">
                    <a href="{{ route('products.add') }}" type="button"
                        class="block  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Thêm
                        mới</a>
                    <div>
                        <button type="button" onclick="handleSearchProduct()"
                            class="px-4 py-2 text-white bg-green-500 rounded">Tìm kiếm</button>
                        <button type="button" onclick="handleResetFormSearchProduct()"
                            class="px-4 py-2 text-white bg-red-500 rounded">Xóa tìm</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="w-11/12 p-6 bg-white rounded-lg">
            <div class="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
                <div class="flex justify-center py-4 " id="infoTableProduct">

                </div>
                <table class="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                                #
                            </th>
                            <th
                                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                                Mã sản phẩm
                            </th>
                            <th
                                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                                Tên sản phẩm
                            </th>
                            <th
                                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                                Mỏ tả
                            </th>

                            <th
                                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                                Giá
                            </th>
                            <th
                                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                                Tình trạng
                            </th>
                            <th class="px-5 py-3 bg-gray-100 border-b-2 border-gray-200"></th>
                        </tr>
                    </thead>
                    <tbody id="product-data">
                        <!-- code js -->
                    </tbody>
                </table>
                <div class="flex items-center justify-center w-full py-5">
                    <nav aria-label="Page navigation example">
                        <ul class="inline-flex items-center -space-x-px" id="product-pagination">

                        </ul>
                    </nav>

                </div>
            </div>
        </div>
    </div>
    <!-- Main modal -->

    {{-- <div class="fixed top-0 left-0 z-10 hidden w-full overflow-y-auto" id="insert-product-modal">
        <div class="flex items-center justify-center px-4 pt-4 pb-20 text-center min-height-100vh sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div class="inline-block px-3 py-2 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl align-center sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add/Edit Product</h3>
                <form class="space-y-6" action="#" id="insertForm">
                    <div>
                        <label for="product_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tên</label>
                        <input type="text" name="product_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Nhập tên">
                        <small class="ml-1 text-red-500" id="errorName"></small>
                    </div>
                    <div>
                        <label for="product_price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Giá</label>
                        <input type="text" name="product_price"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Nhập giá sản phẩm">
                        <small class="ml-1 text-red-500" id="errorPrice"></small>

                    </div>
                    <div>
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Mô tả</label>

                        <textarea name="description"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Nhập mô tả" cols="30" rows="10">

                        </textarea>
                    </div>
                    <div>
                        <label for="is_sales"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhóm</label>
                        <select name="is_sales" id="groupRoleFormEdit"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" selected>Chọn trạng thái</option>
                            <option value="0">Tạm ngưng</option>
                            <option value="1">Đang bán</option>

                        </select>
                        <small class="ml-1 text-red-500" id="errorSales"></small>

                    </div>

                    <div class="px-4 py-3 text-right">
                        <button type="button" class="px-4 py-2 mr-2 text-white bg-gray-500 rounded hover:bg-gray-700"
                            onclick="toggleModal()"><i class="fas fa-times"></i> Thoát</button>
                        <button type="button" onclick=" saveOrUpdate()"
                            class="px-6 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-700">Lưu</button>
                    </div>


                </form>
            </div>
        </div>
    </div> --}}
@section('js')
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
@endsection
@endsection
