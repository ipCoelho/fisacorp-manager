<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $existingUsersCount = DB::table('users')->count();
        $existingTasksCount = DB::table('tasks')->count();

        if ($existingUsersCount === 0) {
            DB::table('users')->insert([
                [
                    'username' => 'admin',
                    'email' => 'admin@admin.com',
                    'password' => bcrypt('admin'),
                    'created_at' => now(),
                    'updated_at' => now(),   
                ],
                [
                    'username' => 'fulano',
                    'email' => 'fulano@fisacorp.com',
                    'password' => bcrypt('12345678'),
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }

        if ($existingTasksCount === 0) {
            $users = DB::table('users')->take(2)->get();

            $tasksToInsert = [];
            foreach ($users as $i => $user) {
                $tasksToInsert[] = [
                    'user_id' => $user->id,
                    'title' => 'Tarefa nº' . $i . ' de ' . $user->username,
                    'fulfilled' => false,
                    'description' => 'Descrição da tarefa de nº '  . $i . ' de ' . $user->username,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            DB::table('tasks')->insert($tasksToInsert);
        }
    }
}
