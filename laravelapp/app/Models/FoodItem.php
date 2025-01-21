<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FoodItem extends Model
{
    use HasFactory;
    protected $fillable = [
        'meal_id',
        'name',
        'quantity',
        'unit',
        'calories_per_unit',
    ];

    public function meal()
    {
        return $this->belongsTo(Meal::class, 'meal_id');
    }
}
