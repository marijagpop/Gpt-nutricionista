<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FoodItem>
 */
class FoodItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'meal_id' => $this->faker->numberBetween(1, 3),
            'name' => $this->faker->word,
            'quantity' => $this->faker->numberBetween(50, 500),
            'unit' => $this->faker->randomElement(['g', 'ml', 'komad']),
            'calories_per_unit' => $this->faker->numberBetween(10, 100),
        ];
    }
}
