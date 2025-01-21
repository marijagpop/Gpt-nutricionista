<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    use HasFactory;
    protected $fillable = [
        'diet_plan_id',
        'name',
        'description',
        'time_of_day',
        'calories',
        'proteins',
        'carbs',
        'fats',
    ];

    public function dietPlan()
    {
        return $this->belongsTo(DietPlan::class, 'diet_plan_id');
    }

    public function foodItems()
    {
        return $this->hasMany(FoodItem::class);
    }
}
