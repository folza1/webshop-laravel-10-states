<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Product;
use App\Http\Controllers\BasketController;
use App\Models\Basket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', function () {
    return Inertia::render('Products', [
        'products' => Product::all(),
    ]);
})->name('products');

Route::get('/products/smartphones', function () {
    return Inertia::render('Smartphones', [
        'smartphones' => Product::where('category', 'smartphones')->get()
    ]);
})->name('smartphones');

Route::get('/products/laptops', function () {
    return Inertia::render('Laptops', [
        'laptops' => Product::where('category', 'laptops')->get()
    ]);
})->name('laptops');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//Route::get('/product/id={productId}', function ($productId) {
//    $product = Product::find($productId);
//    return Inertia::render('Product', ['product' => $product]);
//})->name('product');

Route::get('/products/{product:id}', function (Product $product) {
    return Inertia::render('Product', ['product' => $product]);
})->name('product');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/basket', [BasketController::class, 'store']);

Route::get('/basket/length', function () {
    $userId = request()->query('user_id'); // Az user_id a query paraméterből érkezik

    if ($userId == 'guest') {
        $userId = Session::getId(); // Az $userId értékét beállítjuk a session id-re
    }

    // Ezt a részt cseréld le a saját logikádra, ami visszaadja a kosár hosszát az user_id alapján
    $basketLength = Basket::where('user_id', $userId)->count();

    return response()->json(['length' => $basketLength]);
});

Route::get('/basket/items', function () {
    $userId = request()->query('user_id'); // Az user_id a query paraméterből érkezik

    if ($userId == 'guest') {
        $userId = Session::getId(); // Az $userId értékét beállítjuk a session id-re
    }

    // Ezt a részt cseréld le a saját logikádra, ami visszaadja a kosár termékeit az user_id alapján
    $basket = Basket::where('user_id', $userId)->get();


    return response()->json(['basket' => $basket]);
});

Route::post('/basket/remove', [BasketController::class, 'removeItem']);

Route::post('/clear-cart', [BasketController::class, 'clearCart']);

Route::get('/session-id', function (Request $request) {
    $sessionId = session()->getId();
    return response()->json(['sessionId' => $sessionId]);
});

//Route::get('/states', function () {
//    return Inertia::render('States', [
//        'products2' => Product::all(),
//    ]);
//});
//
//Route::get('/states2', function () {
//    return Inertia::render('States2', [
//        'products3' => Product::all(),
//    ]);
//});

//Route::get('/states3', function () {
//    return Inertia::render('States3');
//});

Route::get('/states4', function () {
    return Inertia::render('ProductsMy', [
        'products3' => Product::all(),
    ]);
});


require __DIR__ . '/auth.php';
