<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MealResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'diet_plan' => new DietPlanResource($this->dietPlan),  
            'name' => $this->name,
            'description' => $this->description,
            'time_of_day' => $this->time_of_day,
            'calories' => $this->calories,
            'proteins' => $this->proteins,
            'carbs' => $this->carbs,
            'fats' => $this->fats,
            'food_items' => FoodItemResource::collection($this->foodItems),  
        ];
    }
}
