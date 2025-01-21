<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DietPlanController;
use App\Http\Controllers\FoodItemController;
use App\Http\Controllers\MealController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Ruta za registraciju korisnika
Route::post('/register', [AuthController::class, 'register']);

// Ruta za prijavu korisnika
Route::post('/login', [AuthController::class, 'login']);


Route::middleware(['auth:sanctum'])->group(function () {
    // Ruta za odjavu korisnika
    Route::post('/logout', [AuthController::class, 'logout']);


    Route::post('/dietPlans/kreirajPlanGPT', [DietPlanController::class, 'kreirajPlanGPT']);

    Route::get('/foodItems/search', [FoodItemController::class, 'search']);
    Route::resource('foodItems', FoodItemController::class);
    Route::resource('dietPlans', DietPlanController::class);
    
    
    Route::resource('meals', MealController::class)->except([
        'create', 'edit'
    ]);
     
    Route::get('/admin', [AdminController::class, 'admin']);

});
