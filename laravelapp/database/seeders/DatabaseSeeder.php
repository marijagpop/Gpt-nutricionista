<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\DietPlan;
use App\Models\FoodItem;
use App\Models\Meal;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Kreiranje jednog admin korisnika
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),  
            'admin' => true,  
        ]);
        // Poziv factory za User modele
        User::factory(5)->create();

        // Poziv factory za DietPlan modele
        DietPlan::factory(5)->create();

        // Poziv factory za Meal modele
        Meal::factory(10)->create();

        // Poziv factory za FoodItem modele
        FoodItem::factory(20)->create();
    }
}
