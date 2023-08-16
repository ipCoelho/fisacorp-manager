<?php

namespace App\Http\Services;

use App\Models\User;

class UserService {

    public function findByName($name) {
        return User::where('username', $name)->first();
    }

    public function create($data) {
        return User::create($data);
    }
}
