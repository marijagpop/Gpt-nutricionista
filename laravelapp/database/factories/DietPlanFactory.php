<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DietPlan>
 */
class DietPlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date(),
            'total_calories' => $this->faker->numberBetween(1200, 3000),
            'goal' => $this->faker->randomElement(['gubitak težine', 'održavanje', 'dobijanje mišićne mase']),
        ];
    }
}
