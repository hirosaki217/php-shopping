<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function __construct()
    {
        $this->middleware(['guest']);
    }
    public function index()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ], [
            'email.required' =>  'email không được để trống',
            'email.email' =>  'email không đúng định dạng',
            'password.required' => 'mật khẩu không được để trống'
        ]);
        if (!auth()->attempt($request->only('email', 'password'), $request->remember)) {
            return back()->with('status', 'tài khoản hoặc mặc khẩu không chính xác');
        }
        $user =  User::where('email', auth()->user()->email)->first();
        $user->last_login_ip = $request->ip();
        $user->last_login_at = now();
        $user->save();
        return redirect()->route('home');
    }

    // Function to get the client IP address

}
