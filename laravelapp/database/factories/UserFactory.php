<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'age' => $this->faker->numberBetween(18, 65),
            'gender' => $this->faker->randomElement(['male', 'female', 'other']),
            'weight' => $this->faker->numberBetween(40, 150),
            'height' => $this->faker->numberBetween(140, 210),
            'activity_level' => $this->faker->randomElement(['sedentary', 'lightly_active', 'moderately_active', 'very_active']),
            'dietary_restrictions' => $this->faker->optional()->text(),
          
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
