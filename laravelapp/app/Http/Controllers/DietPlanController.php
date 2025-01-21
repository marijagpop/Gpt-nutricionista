<?php

namespace App\Http\Controllers;

use App\Models\DietPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\DietPlanResource;
use App\Services\OpenAIService;
class DietPlanController extends Controller
{
    protected $openAIService;
    public function __construct(OpenAIService $openAIService)
    {
        $this->openAIService = $openAIService;
    }

    public function kreirajPlanGPT(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
           
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
 
        $userInput = [
            'user_id' => $request->input('user_id'),
            'period' => $request->input('period'),  
            'preferences' => $request->input('preferences'),  
            'calories' => $request->input('total_calories'),  
        ];
 
        $generatedPlan = $this->openAIService->generateDietPlan($userInput); 
        return response()->json($generatedPlan, 200);
    }





    public function index()
    {
        $dietPlans = DietPlan::all();
        return DietPlanResource::collection($dietPlans);
    }

    public function show($id)
    {
        $dietPlan = DietPlan::findOrFail($id);
        return new DietPlanResource($dietPlan);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'total_calories' => 'required|numeric',
            'goal' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $dietPlan = DietPlan::create($request->all());

        return new DietPlanResource($dietPlan);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'total_calories' => 'required|numeric',
            'goal' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $dietPlan = DietPlan::findOrFail($id);
        $dietPlan->update($request->all());

        return new DietPlanResource($dietPlan);
    }

    public function destroy($id)
    {
        $dietPlan = DietPlan::findOrFail($id);
        $dietPlan->delete();

        return response()->json(['message' => 'Diet plan deleted'], 200);
    }





}
