<?php

namespace App\Http\Controllers;

use App\Models\FoodItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\FoodItemResource;

class FoodItemController extends Controller
{
    public function index()
    {
        $foodItems = FoodItem::all();
        return FoodItemResource::collection($foodItems);
    }

    public function show($id)
    {
        $foodItem = FoodItem::findOrFail($id);
        return new FoodItemResource($foodItem);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'meal_id' => 'required|integer',
            'name' => 'required|string',
            'quantity' => 'required|numeric',
            'unit' => 'required|string',
            'calories_per_unit' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $foodItem = FoodItem::create($request->all());

        return new FoodItemResource($foodItem);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'meal_id' => 'required|integer',
            'name' => 'required|string',
            'quantity' => 'required|numeric',
            'unit' => 'required|string',
            'calories_per_unit' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $foodItem = FoodItem::findOrFail($id);
        $foodItem->update($request->all());

        return new FoodItemResource($foodItem);
    }

    public function destroy($id)
    {
        $foodItem = FoodItem::findOrFail($id);
        $foodItem->delete();

        return response()->json(['message' => 'Food item deleted'], 200);
    }

    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'meal_id' => 'nullable|integer',
            'name' => 'nullable|string',
            'quantity' => 'nullable|numeric',
            'unit' => 'nullable|string',
            'calories_per_unit' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $foodItems = FoodItem::query();

        if ($request->has('meal_id')) {
            $foodItems->where('meal_id', $request->meal_id);
        }

        if ($request->has('name')) {
            $foodItems->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->has('quantity')) {
            $foodItems->where('quantity', $request->quantity);
        }

        if ($request->has('unit')) {
            $foodItems->where('unit', 'like', '%' . $request->unit . '%');
        }

        if ($request->has('calories_per_unit')) {
            $foodItems->where('calories_per_unit', $request->calories_per_unit);
        }

        $foodItems = $foodItems->get();

        return FoodItemResource::collection($foodItems);
    }
}
