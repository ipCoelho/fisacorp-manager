<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    public function testDatabase()
    {
        try {
            // Test the database connection by querying a table
            $result = DB::select('SELECT 1');
            return response()->json(['message' => 'Database connection successful']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database connection error: ' . $e->getMessage()], 500);
        }
    }
}
