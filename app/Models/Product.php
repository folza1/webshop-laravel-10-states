<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // A tábla neve, amelyhez a modell kapcsolódik
    protected $table = 'products';

    // A tábla elsődleges kulcsa
    protected $primaryKey = 'id';

    // A modell táblájában nem lesz időbélyegzés
    public $timestamps = false;

    // A töltendő tömeges adatok mezői
    protected $fillable = [
        'title',
        'description',
        'price',
        'discountPercentage',
        'rating',
        'stock',
        'brand',
        'category',
        'thumbnail',
        'images',
        'akcios',
        'ujdonsag',
        'kiarusitas',
        'raktaron_db',
    ];
}
