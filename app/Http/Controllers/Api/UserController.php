<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    public function index()
    {
        return User::where('is_delete', 0)->orderBy('created_at', 'desc')->paginate(10);
    }

    public function search(Request $request)
    {
        return DB::table('users')->where([
            ['is_delete', '=', 0],
            ['name', 'like', '%' . $request->name . '%'],
            ['email', 'like', '%' . $request->email . '%'],
            ['group_role', 'like', '%' . $request->group_role . '%'],
            ['is_active', 'like', '%' . $request->is_active . '%'],
        ])->orderBy('created_at', 'desc')->paginate(10);
        // return $request;
    }

    public function get(Request $request, $email)
    {
        return DB::table('users')->where('email', $email)->first(['email', 'name', 'group_role', 'is_active']);
    }

    public function store(Request $request)
    {

        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'group_role' => $request->group_role,
            'is_active' => $request->is_active,
            'password' => Hash::make($request->password)
        ]);
    }

    public function update(Request $request)
    {


        return DB::table('users')->where('email', $request->email)
            ->update([
                'name' => $request->name,
                'is_active' => $request->is_active,
                'group_role' => $request->group_role
            ]);
    }

    public function delete(Request $request)
    {


        return DB::table('users')->where('email', $request->email)
            ->update([
                'is_delete' => 1,
            ]);
    }

    public function toogle_lock(Request $request)
    {

        return DB::table('users')->where('email', $request->email)
            ->update([
                'is_active' => $request->is_active,
            ]);
    }
}
