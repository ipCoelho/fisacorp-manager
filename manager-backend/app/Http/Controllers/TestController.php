<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    public function testDatabase()
    {
        try {
            $result = DB::select('SELECT 1');
            return response()->json(['message' => 'Database connection successful']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database connection error: ' . $e->getMessage()], 500);
        }
    }
}
