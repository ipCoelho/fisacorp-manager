<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Services\UserService;

class UserController extends Controller {

    protected $userService;

    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }

    public function show($id) {
        $user = $this->userService->findById($id);

        if(!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    public function store(CreateUserRequest $request) {
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);

        $user = $this->userService->create($input);

        return response()->json(['message' => 'User created', 'data' => $user], 200);
    }

    public function userTasks($id) {
        $tasks = $this->userService->findUserTasks($id);

        if (!$tasks) {
            return response()->json(['message' => 'Tasks not found or User not found'], 404);
        }

        return response()->json($tasks);
    }
}
