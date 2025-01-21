<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\MealResource;
use Illuminate\Support\Facades\DB;

class MealController extends Controller
{
    public function index()
    {
        $meals = Meal::all();
        return MealResource::collection($meals);
    }

    public function show($id)
    {
        $meal = Meal::findOrFail($id);
        return new MealResource($meal);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'diet_plan_id' => 'required|exists:diet_plans,id',
            'name' => 'required|string|max:255',
            'description' => 'string|nullable',
            'time_of_day' => 'required|string',
            'calories' => 'required|numeric',
            'proteins' => 'required|numeric',
            'carbs' => 'required|numeric',
            'fats' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $meal = Meal::create($validator->validated());

        return new MealResource($meal);
    }

    public function update(Request $request, $id)
    {
        $meal = Meal::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'diet_plan_id' => 'exists:diet_plans,id',
            'name' => 'string|max:255',
            'description' => 'string|nullable',
            'time_of_day' => 'string',
            'calories' => 'numeric',
            'proteins' => 'numeric',
            'carbs' => 'numeric',
            'fats' => 'numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $meal->update($validator->validated());

        return new MealResource($meal);
    }

    public function destroy($id) //metoda prepravljena za potrebe seminarskog rada, dodate transakcije, kao i: prilikom brisanja jednog obroka brisu se i svi njegovi "sastojci"
    {
        DB::beginTransaction();
    
        try {
            $meal = Meal::findOrFail($id);
            $meal->foodItems()->delete(); // Brišemo sve stavke hrane povezane sa obrokom
            $meal->delete(); // Brišemo obrok
    
            DB::commit();
            
            return response()->json(['message' => 'Meal and related food items successfully deleted'], 200);
        } catch (\Exception $e) {
            DB::rollback();
    
            return response()->json(['error' => 'Error deleting meal and related food items: ' . $e->getMessage()], 500);
        }
    }
}
