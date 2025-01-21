<?php

namespace App\Http\Controllers;

use App\Models\FoodItem;
use App\Models\Meal;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function admin()
    {
        // Broj korisnika
        $totalUsers = User::count();

        // Broj obroka
        $totalMeals = Meal::count();

        // Broj sastojaka
        $totalFoodItems = FoodItem::count();

        // Broj kreiranih obroka po mesecima
        $mealsCreatedPerMonth = Meal::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

            /*DATE_FORMAT(created_at, "%Y-%m"): Ova funkcija SQL-a formatira datum kreiranja obroka tako da bude u formatu "YYYY-MM", gde YYYY predstavlja godinu, a MM mesec.
                COUNT(*) as total: Računa ukupan broj obroka za svaki mesec.
                groupBy('month'): Grupiše rezultate prema formatiranom datumu, tako da se obroci sa istim mesecom kreiranja nalaze u istoj grupi.
                orderBy('month'): Sortira rezultate po datumu, tj. po mesecima.
                get(): Izvršava upit i vraća rezultate. */



        // Broj novih korisnika po mesecima
        $newUsersPerMonth = User::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get();


            /* Koristi se isti princip kao i kod broja kreiranih obroka po mesecima, samo što se umesto tabele Meal koristi tabela User.
Ovaj upit računa ukupan broj novih korisnika za svaki mesec, na osnovu njihovog datuma kreiranja.
Rezultati se grupišu, sortiraju i dobijaju na isti način kao i kod broja kreiranih obroka po mesecima.*/
        return response()->json([
            'total_users' => $totalUsers,
            'total_meals' => $totalMeals,
            'total_food_items' => $totalFoodItems,
            'meals_created_per_month' => $mealsCreatedPerMonth,
            'new_users_per_month' => $newUsersPerMonth,
        ]);
    }
}
