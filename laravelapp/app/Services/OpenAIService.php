<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class OpenAIService
{
    protected $apiKey;
    protected $apiUrl = 'https://api.openai.com/v1/chat/completions';


    public function __construct()
    {
        $this->apiKey = env('OPENAI_API_KEY');
    }

    public function generateDietPlan($userInput)
    {
        $messages = [
            [
                'role' => 'user', 
                'content' => $this->createPrompt($userInput)
            ]
        ];
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json',
        ])->post($this->apiUrl, [
            'model' => 'gpt-3.5-turbo',  
            'messages' => $messages,
            'temperature' => 0.7,  
        ]);

        return $response->json();
    }

    protected function createPrompt($userInput)
    {
        // Kreiranje prompta na osnovu korisničkog unosa 
        $prompt = "Create a diet plan for the following user profile: \n";
        $prompt .= "User profile: " . json_encode($userInput) . "\n";
        $prompt .= "Diet plan should be for a period of " . $userInput['period'] . " days.\n";
        $prompt .= "Include meals that are " . $userInput['preferences'] . ".\n";
        $prompt .= "Each day should include breakfast, lunch, dinner, and two snacks.\n";
        $prompt .= "Calorie goal: " . $userInput['calories'] . " calories per day.\n";
        $prompt .= "End of diet plan."; 
        return $prompt;
    }
}
