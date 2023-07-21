<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session2 extends Model
{
    use HasFactory;

    protected $table = 'sessions';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function sessionExists($sessionId)
    {
        return static::where('id', $sessionId)->exists();
    }
}
