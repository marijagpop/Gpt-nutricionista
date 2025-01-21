<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{ 

    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|unique:users',
                'password' => 'required|string|min:6',
                'age' => 'required|integer',
                'gender' => 'required|string', 
                'weight' => 'required|numeric', 
                'height' => 'required|numeric',  
                'activity_level' => 'required|string',  
                'dietary_restrictions' => 'nullable|string', // Opciono
            ]);
    
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'age' => $request->age,
                'gender' => $request->gender,
                'weight' => $request->weight,
                'height' => $request->height,
                'activity_level' => $request->activity_level,
                'dietary_restrictions' => $request->dietary_restrictions,
            ]);
    
            $token = $user->createToken('authToken')->plainTextToken;
    
            return response()->json([
                'user' => new UserResource($user),
                'token' => $token,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 400);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
    
        if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials'],
            ]);
        }
    
        $user = $request->user();
        $token = $user->createToken('authToken')->plainTextToken;
    
        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ], 200);
    }

    public function logout(Request $request)
        {
            $request->user()->tokens()->delete();

            return response()->json(['message' => 'Successfully logged out']);
        }
}
