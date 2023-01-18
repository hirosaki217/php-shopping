<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    public function index()
    {
        return view('products.index');
    }

    public function showFormAdd()
    {
        return view('products.update', ['is_update' => false, 'id' => null]);
    }
    public function showFormUpdate($id)
    {
        return view('products.update', ['is_update' => true, 'id' => $id]);
    }
}
