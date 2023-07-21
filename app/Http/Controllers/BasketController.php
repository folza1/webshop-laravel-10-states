<?php

namespace App\Http\Controllers;

use App\Models\Basket;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class BasketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $userId = $request->user_id;
            if ($userId === 'guest') {
                $userId = session()->getId();
            }

            $itemIndex = Str::random(20);

            // Ellenőrizzük, hogy az item_index már létezik-e
            while (Basket::where('item_index', $itemIndex)->exists()) {
                $itemIndex = Str::random(20); // Ha már létezik, generálunk egy új értéket
            }

            $basket = [
                'user_id' => $userId,
                'item_index' => $itemIndex,
                'product_id' => $request->product_id,
                'title' => $request->title,
                'description' => $request->description,
                'price' => $request->price,
                'discount_percentage' => $request->discount_percentage,
                'rating' => $request->rating,
                'stock' => $request->stock,
                'brand' => $request->brand,
                'category' => $request->category,
                'thumbnail' => $request->thumbnail,
                'images' => $request->images,
                'akcios' => $request->akcios,
                'ujdonsag' => $request->ujdonsag,
                'kiarusitas' => $request->kiarusitas,
            ];

            Basket::create($basket);

            $basketItem = Basket::where('item_index', $itemIndex)->first();

            if ($basketItem) {
                $productId = $basketItem->product_id;
                $product = Product::find($productId); // Termék keresése a product_id alapján

                if ($product) {
                    $product->stock -= 1; // Stock érték csökkentése 1-gyel
                    $product->save(); // Menti a módosítást az adatbázisban
                }
            }

        } catch (\Exception $e) {
            // Hiba kezelése
            dd($e->getMessage());
        }

        return response($basket);
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    public function removeItem(Request $request)
    {
        $index = $request->input('itemIndex'); // Az itemIndex értékének megszerzése

        $basketItem = Basket::where('item_index', $index)->first(); // Az elem megtalálása az itemIndex alapján

        if ($basketItem) {
            $productId = $basketItem->product_id;
            $product = Product::find($productId); // Termék keresése a product_id alapján

            if ($product) {
                $product->stock += 1; // Stock érték növelése 1-gyel
                $product->save(); // Menti a módosítást az adatbázisban
            }

            $basketItem->delete(); // Elem törlése
            return response()->json(['message' => 'Elem sikeresen törölve']);
        } else {
            return response()->json(['message' => 'Elem nem található'], 404);
        }
    }



    public function clearCart(Request $request)
    {
        $userId = $request->input('userId');

        if ($userId === 'guest2') {
            $userId = session()->getId();
        }

        // Termékek számolása a kosárban
        $productCounts = Basket::where('user_id', $userId)
            ->select('product_id', DB::raw('count(*) as count'))
            ->groupBy('product_id')
            ->get();

        // Termékek keresése a Products táblában és stock értékük frissítése
        foreach ($productCounts as $productCount) {
            $product = Product::find($productCount->product_id);

            if ($product) {
                $product->stock += $productCount->count;
                $product->save();
            }
        }

        // Az összes rekord törlése az adott user_id-vel
        Basket::where('user_id', $userId)->delete();

        return response()->json(['message' => 'Kosár sikeresen kiürítve']);
    }

}
