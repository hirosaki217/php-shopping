@extends('layouts.app')

@section('content')
    <h1 class="text-lg font-bold text-red-500 ml-11">Quản lý user</h1>
    <div class="flex flex-col items-center justify-center">
        <div class="flex justify-center w-full p-12">
            <form class="w-8/12 px-12" action="#" id="formSearchUser">
                <div class="flex justify-between mb-4">
                    <label class="block">
                        <span class=" after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Tên
                        </span>
                        <input type="name" name="name"
                            class="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                            placeholder="Nhập họ tên" />
                    </label>

                    <label class="block">
                        <span class=" after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Email
                        </span>
                        <input type="email" name="email"
                            class="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                            placeholder="Nhập email" />
                    </label>
                    <label class="block">
                        <span class=" after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Nhóm
                        </span>

                        <select
                            class="block w-full px-4 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                            name="group_role" id="group_role">
                            <option value="">Chọn nhóm&hellip;</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="CUSTOMER">CUSTOMER</option>
                        </select>
                    </label>
                    <label class="block">
                        <span class=" after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Trạng thái
                        </span>
                        <select
                            class="block w-full px-4 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                            name="is_active" id="is_active">
                            <option value="">Chọn trạng thái&hellip;</option>
                            <option value="0">Tạm Ngưng</option>
                            <option value="1">Đang hoạt động</option>
                        </select>
                    </label>
                </div>
                <div class="flex justify-between">
                    <button onclick="handleActionAddUser()" type="button"
                        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Thêm
                        mới</button>
                    <div>
                        <button type="button" onclick="handleSearchUser()"
                            class="px-4 py-2 text-white bg-green-500 rounded">Tìm kiếm</button>
                        <button type="button" onclick="handleResetFormSearchUser()"
                            class="px-4 py-2 text-white bg-red-500 rounded">Xóa tìm</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="w-11/12 p-6 bg-white rounded-lg">
            <div class="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
                <div class="flex justify-center py-4 " id="infoTableUser">

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
                                Họ tên
                            </th>
                            <th
                                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                                Email
                            </th>
                            <th
                                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                                Nhóm
                            </th>

                            <th
                                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                                Trạng thái
                            </th>
                            <th class="px-5 py-3 bg-gray-100 border-b-2 border-gray-200"></th>
                        </tr>
                    </thead>
                    <tbody id="user-data">
                        {{-- <tr>
                            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <div class="flex">
                                    <div class="flex-shrink-0 w-10 h-10">
                                        1
                                    </div>
                                    {{-- <div class="ml-3">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                            Molly Sanders
                                        </p>
                                        <p class="text-gray-600 whitespace-no-wrap">000004</p>
                                    </div> 
                                </div>
                            </td>
                            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                Nguyễn Văn A
                            </td>
                            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                abc@gmail.com
                            </td>
                            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                ADMIN
                            </td>
                            <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <span class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span aria-hidden class="absolute inset-0 bg-green-200 rounded-full opacity-50"></span>
                                    <span class="relative">Đang hoạt động</span>
                                </span>
                            </td>
                            <td class="px-5 py-5 text-sm text-right bg-white border-b border-gray-200">
                                <button type="button" class="inline-block mx-1 text-gray-500 hover:text-gray-700">
                                    <img width="15px" class="user-icon-edit " height="15px"
                                        src="{{ asset('images/pen-solid.svg') }}" alt="edit" />
                                </button>
                                <button type="button" class="inline-block mx-1 text-gray-500 hover:text-gray-700">

                                    <img width="15px" class="user-icon-delete" height="15px"
                                        src="{{ asset('images/trash-can-solid.svg') }}" alt="delete" />
                                </button>
                                <button type="button" class="inline-block mx-1 text-gray-500 hover:text-gray-700">

                                    <img width="15px" class="user-icon-resume" height="15px"
                                        src="{{ asset('images/user-xmark-solid.svg') }}" alt="pause/resume" />
                                </button>

                            </td>
                        </tr>
                        @if ($users->count())
                            @for ($i = 0; $i < $users->count(); $i++)
                                <tr>
                                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <div class="flex">
                                            <div class="flex-shrink-0 w-10 h-10">
                                                {{ $i + 1 }}
                                            </div>

                                        </div>
                                    </td>
                                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        {{ $users[$i]->name }}
                                    </td>
                                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        {{ $users[$i]->email }}
                                    </td>
                                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        {{ $users[$i]->group_role }}
                                    </td>
                                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <span
                                            class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                            @if ($users[$i]->is_active)
                                                <span aria-hidden
                                                    class="absolute inset-0 bg-green-200 rounded-full opacity-50"></span>
                                                <span class="relative">
                                                    Đang hoạt động

                                                </span>
                                            @else
                                                <span aria-hidden
                                                    class="absolute inset-0 bg-green-200 rounded-full opacity-50"></span>
                                                <span class="relative">
                                                    Tạm ngưng

                                                </span>
                                            @endif
                                        </span>
                                    </td>
                                    <td class="px-5 py-5 text-sm text-right bg-white border-b border-gray-200">
                                        <button type="button"
                                            class="inline-block mx-1 text-gray-500 hover:text-gray-700">
                                            <img width="15px" class="user-icon-edit " height="15px"
                                                src="{{ asset('images/pen-solid.svg') }}" alt="edit" />
                                        </button>
                                        <button type="button"
                                            class="inline-block mx-1 text-gray-500 hover:text-gray-700">

                                            <img width="15px" class="user-icon-delete" height="15px"
                                                src="{{ asset('images/trash-can-solid.svg') }}" alt="delete" />
                                        </button>
                                        <button type="button"
                                            class="inline-block mx-1 text-gray-500 hover:text-gray-700">

                                            <img width="15px" class="user-icon-resume" height="15px"
                                                src="{{ asset('images/user-xmark-solid.svg') }}" alt="pause/resume" />
                                        </button>

                                    </td>
                                </tr>
                            @endfor
                        @else
                        @endif --}}

                    </tbody>
                </table>
                <div class="flex items-center justify-center w-full py-5">
                    <nav aria-label="Page navigation example">
                        <ul class="inline-flex items-center -space-x-px" id="user-pagination">

                        </ul>
                    </nav>

                </div>
            </div>
        </div>
    </div>
    <!-- Main modal -->

    <div class="fixed top-0 left-0 z-10 hidden w-full overflow-y-auto" id="insert-user-modal">
        <div class="flex items-center justify-center px-4 pt-4 pb-20 text-center min-height-100vh sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div class="inline-block px-3 py-2 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl align-center sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add/Edit User</h3>
                <form class="space-y-6" action="#" id="insertForm">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tên</label>
                        <input type="name" name="name" id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Nhập tên">
                        <small class="ml-1 text-red-500" id="errorName"></small>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email</label>
                        <input type="email" name="email" id="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Nhập email">
                        <small class="ml-1 text-red-500" id="errorEmail"></small>

                    </div>
                    <div id="passwordUserFormEdit">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Mật khẩu</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                        <small class="ml-1 text-red-500" id="errorPassword"></small>

                    </div>
                    <div id="passwordConfirmationFormEdit">
                        <label for="password_confirmation"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Xác nhận</label>
                        <input type="password" name="password_confirmation" id="password_confirmation"
                            placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                        <small class="ml-1 text-red-500" id="errorRePassword"></small>

                    </div>
                    <div>
                        <label for="group_role"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhóm</label>
                        <select name="group_role" id="groupRoleFormEdit"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" selected>Chọn nhóm</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="CUSTOMER">CUSTOMER</option>

                        </select>
                        <small class="ml-1 text-red-500" id="errorGroup"></small>

                    </div>
                    <div class="flex justify-between">
                        <div class="flex items-start">
                            <label for="is_active" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Trạng
                                thái: </label>
                            <div class="flex items-center h-5 mx-2">
                                <input id="isActiveFormEdit" name="is_active" class="form-save-isactive" type="checkbox"
                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800">

                            </div>
                            <div class="flex items-center modalActiveCheck" id="activeCheck">

                                <label for="is_active" class="text-red-500">Tạm ngưng</label>

                            </div>

                        </div>

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
    </div>
    <script src="{{ asset('js/jquery-3.6.3.min.js') }}"></script>
    <script src="{{ asset('js/user.js') }}"></script>
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
