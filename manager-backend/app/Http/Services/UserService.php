<?php

namespace App\Http\Services;

use App\Models\User;

class UserService {

    public function findByName($name) {
        return User::where('username', $name)->first();
    }

    public function findById($id) {
        return User::where('id', $id)->first();
    }

    public function create($data) {
        return User::create($data);
    }

    public function findUserTasks($id) {
        $user = User::with('tasks')->find($id);
        return $user ? $user->tasks : null;
    }
}
