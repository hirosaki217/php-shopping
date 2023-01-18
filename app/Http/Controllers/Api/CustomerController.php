<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    public function index()
    {
        // return Customer::get()->orderBy('created_at', 'desc')->paginate(10);
        return DB::table('customers')->orderBy('created_at', 'desc')->paginate(10);
    }
    public function search(Request $request)
    {
        return DB::table('customers')->where([
            ['customer_name', 'like', '%' . $request->customer_name . '%'],
            ['email', 'like', '%' . $request->email . '%'],
            ['address', 'like', '%' . $request->address . '%'],
            ['is_active', 'like', '%' . $request->is_active . '%'],
        ])->orderBy('created_at', 'desc')->paginate(10);
        // return $request;
    }

    public function get(Request $request, $email)
    {
        return DB::table('customers')->where('email', $email)->first(['email', 'customer_name', 'address', 'is_active']);
    }

    public function store(Request $request)
    {
        return Customer::create([
            'customer_name' => $request->customer_name,
            'tel_num' => strval($request->tel_num),
            'email' => $request->email,
            'address' => $request->address,
            'is_active' => $request->is_active,
        ]);
    }

    public function update(Request $request)
    {


        return DB::table('customers')->where('email', $request->email)
            ->update([
                'customer_name' => $request->customer_name,
                'address' => $request->address,
                'tel_num' => $request->tel_num,
            ]);
    }

    public function delete(Request $request)
    {

        return DB::table('customers')->where('email', $request->email)->delete();
    }
}
