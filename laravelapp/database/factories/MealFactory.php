<?php

namespace Database\Factories;

use App\Models\DietPlan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Meal>
 */
class MealFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'diet_plan_id' => DietPlan::factory(),
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'time_of_day' => $this->faker->randomElement(['doručak', 'ručak', 'večera', 'užina']),
            'calories' => $this->faker->numberBetween(200, 800),
            'proteins' => $this->faker->numberBetween(5, 30),
            'carbs' => $this->faker->numberBetween(20, 100),
            'fats' => $this->faker->numberBetween(5, 30),
        ];
    }
}
