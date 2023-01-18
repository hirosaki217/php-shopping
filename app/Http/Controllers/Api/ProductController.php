<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\isEmpty;

class ProductController extends Controller
{
    //

    public function index()
    {
        return DB::table('products')->orderBy('created_at', 'desc')->paginate(10);
    }

    public function store(Request $request)
    {
        try {
            $product = new Product();
            $product->product_name = $request->product_name;
            $product->product_price = $request->product_price;
            $product->is_sales = $request->is_sales;
            $product->description = $request->description;
            $product->product_id = $this->generateId($request->product_name);
            $product->save();
            $product_id = $product->product_id;
        } catch (\Exception $e) {
            return response()->json(['status' => 'exception', 'msg' => $e->getMessage()]);
        }
        return response()->json(['status' => "success", 'product_id' => $product_id]);
    }

    public function storeimage(Request $request)
    {
        // return $request;
        if ($request->file('file')) {

            $img = $request->file('file');

            //here we are geeting userid alogn with an image
            $product_id = $request->product_id;

            $imageName = strtotime(now()) . rand(11111, 99999) . '.' . $img->getClientOriginalExtension();

            $product_image = new Product();
            $original_name = $img->getClientOriginalName();
            $product_image->product_name = $imageName;

            if (!is_dir(public_path() . '/uploads/images/')) {
                mkdir(public_path() . '/uploads/images/', 0777, true);
            }

            $request->file('file')->move(public_path() . '/uploads/images/', $imageName);

            // we are updating our image column with the help of user id
            $product_image->where('product_id', $product_id)->update(['product_image' => $imageName]);

            return response()->json(['status' => "success", 'imgdata' => $original_name, 'product_id' => $product_id]);
        }
    }

    public function generateId($product_name)
    {
        $first_char = strtoupper(substr($product_name, 0, 1));
        $product_id = $first_char . '000000001';
        $total_digit = 9;
        $product_latest =  DB::table('products')->where([['product_id', 'like', $first_char . '%']])->orderBy('created_at', 'desc')->first();

        if (!$product_latest)
            return $product_id;
        $product_id_latest = $product_latest->product_id;
        $num_latest = intval(substr($product_id_latest, 1, strlen($product_id_latest) - 1));
        if (strlen(strval($num_latest)) < strlen(strval($num_latest + 1))) {
            $product_id = $first_char . $this->plusZeroString($total_digit - strlen(strval($num_latest + 1))) . $num_latest;
        } else {
            $product_id = $first_char . $this->plusZeroString($total_digit - strlen(strval($num_latest))) . $num_latest + 1;
        }
        return $product_id;
    }

    public function plusZeroString($size)
    {
        $str  = "";
        for ($i = 0; $i < $size; $i++) {
            $str = $str . strval('0');
        }
        return $str;
    }

    public function search(Request $request)
    {
        $product = DB::table('products')->orderByDesc('product_price')->first();
        $price_from = strlen($request->product_price_from) > 0 ? $request->product_price_from : 0;
        $price_to = strlen($request->product_price_to) > 0 ? $request->product_price_to : $product->product_price;





        return DB::table('products')->where([
            ['product_name', 'like', '%' . $request->product_name . '%'],
            ['is_sales', 'like', '%' . $request->is_sales . '%']

        ])->whereBetween('product_price', [$price_from, $price_to])->orderBy('created_at', 'desc')->paginate(10);
    }

    public function get($id)
    {
        return DB::table('products')->where([
            ['product_id', '=', $id]
        ])->first();
    }



    public function update(Request $request)
    {



        return DB::table('products')->where('product_id', $request->product_id)
            ->update([
                'product_name' => $request->product_name,
                'product_price' => $request->product_price,
                'description' => $request->description,
                'product_image' => $request->file_name == null ? nullValue() : $request->file_name
            ]);
    }

    public function delete(Request $request)
    {
        return DB::table('products')->where('product_id', $request->product_id)
            ->delete();
    }
}
