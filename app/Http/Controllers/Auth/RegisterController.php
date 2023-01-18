<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Testing\Fluent\Concerns\Has;

class RegisterController extends Controller
{
    public function __construct()
    {
        $this->middleware(['guest']);
    }
    //
    public function index(){
        return view('auth.register');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required|confirmed',
            ]
        );
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' =>Hash::make( $request->password),
          
          
        ]);

        auth()->attempt($request->only('email', 'password'));
        // auth()->attempt([
        //     'email'=>$request->email,
        //     'password'=>$request->password
        // ]);
        return redirect()->route('home');
    }
}
