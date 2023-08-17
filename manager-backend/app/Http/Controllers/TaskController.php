<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTaskRequest;
use App\Http\Services\TaskService;

class TaskController extends Controller
{
    protected $taskService;

    public function __construct(TaskService $taskService) {
        $this->taskService = $taskService;
    }

    public function show($id) {
        $task = $this->taskService->findById($id);

        if(!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        return response()->json($task);
    }

    public function store(CreateTaskRequest $request) {
        $task = $this->taskService->create($request->all());
        return response()->json(['message' => 'Task created', 'data' => $task], 200);
    }

    public function destroy($id) {
        $isDeleted = $this->taskService->delete($id);
    
        if(!$isDeleted) {
            return response()->json(['message' => 'Task not found or unable to delete'], 404);
        }
    
        return response()->json(['message' => 'Task deleted'], 200);
    }
}

