<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateTaskRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->check();
    }

    public function rules() {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'fulfilled' => 'boolean',
        ];
    }
    
    public function messages()
    {
        return [
            'title.required' => 'A title is required.',
            'description.required' => 'A description is required.',
            'user_id.required' => 'A user ID is required.',
            'user_id.exists' => 'The provided user ID does not exist.',
            'fulfilled.boolean' => 'Fulfilled must be a boolean value.',
        ];
    }
}
