package com.example.TaskTracker_Backend.repository;

import com.example.TaskTracker_Backend.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByStatus(Task.TaskStatus status);
    List<Task> findByPriority(Task.TaskPriority priority);
    List<Task> findByStatusAndPriority(Task.TaskStatus status, Task.TaskPriority priority);

    Page<Task> findByStatus(Task.TaskStatus status, Pageable pageable);
    Page<Task> findByPriority(Task.TaskPriority priority, Pageable pageable);
    Page<Task> findByStatusAndPriority(Task.TaskStatus status, Task.TaskPriority priority, Pageable pageable);
}
