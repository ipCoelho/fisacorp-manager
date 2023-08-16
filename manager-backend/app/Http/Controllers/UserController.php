<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Services\UserService;

class UserController extends Controller {

    protected $userService;

    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }

    public function show($name) {
        $user = $this->userService->findByName($name);

        if(!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    public function store(CreateUserRequest $request) {
        $user = $this->userService->create($request->all());

        return response()->json(['message' => 'User created', 'data' => $user], 200);
    }
}
