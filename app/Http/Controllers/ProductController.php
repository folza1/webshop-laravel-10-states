<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();

        return response()->json($products);
    }

    public function home()
    {

        return view('Content');
    }

    public function search(Request $request)
    {
        $searchTerm = $request->input('searchTerm');
        $results = Product::whereRaw("LOWER(title) LIKE '%" . strtolower($searchTerm) . "%'")->get();

        return response()->json($results);
    }
}
