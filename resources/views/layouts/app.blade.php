<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    {{-- @vite('resources/css/app.css')
    @vite('resources/js/app.js') --}}
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css" type="text/css" />
</head>

<body class="bg-gray-200">

    <nav class="flex justify-between p-6 mb-6 bg-white">
        <div class="flex items-center">
            <img id="home-page" src="{{ asset('images/logo.png') }}" class="mr-3" alt="logo">
            <ul class="flex items-center ">
                <li>
                    <a href="{{ route('users') }}" class="p-3">Users</a>
                </li>
                <li>
                    <a href="{{ route('customers') }}" class="p-3">Customer</a>
                </li>
                <li>
                    <a href="{{ route('products') }}" class="p-3">Product</a>
                </li>
            </ul>
        </div>


        <ul class="flex items-center">
            @auth
                <li>
                    <a href="" class="p-3 text-base font-medium text-green-500">{{ Auth::user()->name }}</a>
                </li>
                <li>
                    <form action="{{ route('logout') }}" method="GET">
                        {{-- @csrf --}}
                        <button class="p-3 text-base font-medium text-red-500">Logout</button>
                    </form>
                </li>
            @endauth
            @guest
                <li>
                    <a href="{{ route('login') }}" class="p-3">Login</a>
                </li>
                <li>
                    <a href="{{ route('register') }}" class="p-3">Register</a>
                </li>
            @endguest
        </ul>
    </nav>

    @yield('content')
    @yield('js');
    <script src="{{ asset('js/app.js') }}"></script>

    <script>
        var home = document.getElementById('home-page');

        home.addEventListener('click', function(e) {
            window.location.href = '/'
        })
    </script>
    <script src="https://unpkg.com/flowbite@1.6.0/dist/flowbite.min.js"></script>
</body>

</html>
