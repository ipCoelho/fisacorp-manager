<?php

namespace App\Http\Services;

use App\Models\Task;

class TaskService {
    public function findById($id) {
        return Task::where('id', $id)->first();
        
    }

    public function create($data) {
        return Task::create($data);
    }
    
    public function delete($id) {
      $task = Task::where('id', $id)->first();

      if($task) {
          $task->delete();
          return true;
      }
  
      return false;
    }
}
