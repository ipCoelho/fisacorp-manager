<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; // Import the DB facade

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Check if records already exist in the 'users' table
        $existingUsersCount = DB::table('users')->count();

        if ($existingUsersCount === 0) {
            // Insert two records into the 'users' table
            DB::table('users')->insert([
                [
                    'username' => 'admin',
                    'email' => 'admin@admin.com',
                    'password' => bcrypt('root'), // Use bcrypt() to hash the password
                ],
                [
                    'username' => 'israel',
                    'email' => 'israel@fisacorp.com',
                    'password' => bcrypt('12345678'),
                ],
            ]);
        }
    }
}
