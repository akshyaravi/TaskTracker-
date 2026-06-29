package com.example.TaskTracker_Backend.controller;

import com.example.TaskTracker_Backend.dto.TaskRequest;
import com.example.TaskTracker_Backend.dto.TaskResponse;
import com.example.TaskTracker_Backend.entity.Task.TaskPriority;
import com.example.TaskTracker_Backend.entity.Task.TaskStatus;
import com.example.TaskTracker_Backend.service.TaskService;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Tasks", description = "Operations related to Task management")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @Operation(summary = "Create a new task", description = "Creates a task under a specific project")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Task created successfully"),
            @ApiResponse(responseCode = "404", description = "Project not found"),
            @ApiResponse(responseCode = "422", description = "Validation error")
    })
    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody TaskRequest request) {
        TaskResponse response = taskService.createTask(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Get all tasks", description = "Retrieves a paginated list of tasks with optional filtering by status and priority")
    @GetMapping
    public ResponseEntity<Page<TaskResponse>> getAllTasks(
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(required = false) TaskPriority priority,
            Pageable pageable) {
        
        Page<TaskResponse> responses = taskService.getAllTasks(status, priority, pageable);
        return ResponseEntity.ok(responses);
    }

    @Operation(summary = "Get a task by ID", description = "Retrieves a specific task's details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Task found"),
            @ApiResponse(responseCode = "404", description = "Task not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTaskById(@PathVariable Long id) {
        TaskResponse response = taskService.getTaskById(id);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Update a task", description = "Updates an existing task's details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Task updated successfully"),
            @ApiResponse(responseCode = "404", description = "Task or Project not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable Long id, 
            @Valid @RequestBody TaskRequest request) {
        TaskResponse response = taskService.updateTask(id, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Delete a task", description = "Deletes a specific task by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Task deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Task not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Update task status", description = "Partially updates a task's status")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Status updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid status provided"),
            @ApiResponse(responseCode = "404", description = "Task not found")
    })
    @PatchMapping("/{id}/status")
    public ResponseEntity<TaskResponse> updateTaskStatus(
            @PathVariable Long id, 
            @RequestBody Map<String, String> statusUpdate) {
        
        String statusStr = statusUpdate.get("status");
        if (statusStr == null) {
            throw new IllegalArgumentException("Status field is required in the request body");
        }
        
        TaskStatus status = TaskStatus.valueOf(statusStr.toUpperCase());
        TaskResponse response = taskService.updateTaskStatus(id, status);
        
        return ResponseEntity.ok(response);
    }
}
