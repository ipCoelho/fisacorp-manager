<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules() {
        return [
            'username' => 'required|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ];
    }
    
    public function messages()
    {
        return [
            'username.required' => 'A username is required.',
            'username.unique' => 'This username is already taken.',

            'email.required' => 'An email address is required.',
            'email.email' => 'The provided email address is not valid.',
            'email.unique' => 'This email address is already in use.',

            'password.required' => 'A password is required.',
            'password.min' => 'The password must be at least 8 characters long.',
        ];
    }
}
