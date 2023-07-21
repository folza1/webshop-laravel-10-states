<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Basket extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'item_index',
        'product_id',
        'title',
        'description',
        'price',
        'discount_percentage',
        'rating',
        'stock',
        'brand',
        'category',
        'thumbnail',
        'images',
        'akcios',
        'ujdonsag',
        'kiarusitas',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
