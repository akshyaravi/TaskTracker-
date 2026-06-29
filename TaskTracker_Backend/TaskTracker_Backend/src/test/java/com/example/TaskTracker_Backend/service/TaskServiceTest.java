package com.example.TaskTracker_Backend.service;

import com.example.TaskTracker_Backend.dto.TaskRequest;
import com.example.TaskTracker_Backend.dto.TaskResponse;
import com.example.TaskTracker_Backend.entity.Project;
import com.example.TaskTracker_Backend.entity.Task;
import com.example.TaskTracker_Backend.exception.ResourceNotFoundException;
import com.example.TaskTracker_Backend.repository.ProjectRepository;
import com.example.TaskTracker_Backend.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private TaskService taskService;

    private Project project;
    private Task task;
    private TaskRequest taskRequest;

    @BeforeEach
    void setUp() {
        project = new Project(
                1L,
                "Test Project",
                null,
                null,
                LocalDateTime.now(),
                LocalDateTime.now(),
                null
        );

        task = new Task(
                1L,
                "Test Task",
                "Description",
                LocalDate.now(),
                Task.TaskStatus.TODO,
                Task.TaskPriority.HIGH,
                LocalDateTime.now(),
                LocalDateTime.now(),
                project
        );

        taskRequest = new TaskRequest();
        taskRequest.setTitle("Test Task");
        taskRequest.setDescription("Description");
        taskRequest.setDueDate(LocalDate.now());
        taskRequest.setProjectId(1L);
        taskRequest.setStatus(Task.TaskStatus.TODO);
        taskRequest.setPriority(Task.TaskPriority.HIGH);
    }

    @Test
    void createTask_Success() {
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        TaskResponse response = taskService.createTask(taskRequest);

        assertNotNull(response);
        assertEquals(task.getTitle(), response.getTitle());
        assertEquals(project.getId(), response.getProjectId());
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void createTask_ProjectNotFound() {
        when(projectRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> taskService.createTask(taskRequest));
        verify(taskRepository, never()).save(any(Task.class));
    }

    @Test
    void getTaskById_Success() {
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        TaskResponse response = taskService.getTaskById(1L);

        assertNotNull(response);
        assertEquals(task.getId(), response.getId());
    }

    @Test
    void getTaskById_NotFound() {
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> taskService.getTaskById(1L));
    }

    @Test
    void updateTask_Success() {
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        taskRequest.setTitle("Updated Title");
        
        TaskResponse response = taskService.updateTask(1L, taskRequest);

        assertNotNull(response);
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void deleteTask_Success() {
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        taskService.deleteTask(1L);

        verify(taskRepository, times(1)).delete(task);
    }
}
