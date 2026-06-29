package com.example.TaskTracker_Backend.service;

import com.example.TaskTracker_Backend.dto.ProjectRequest;
import com.example.TaskTracker_Backend.dto.ProjectResponse;
import com.example.TaskTracker_Backend.entity.Project;
import com.example.TaskTracker_Backend.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional
    public ProjectResponse createProject(ProjectRequest request) {
        Project project = new Project();
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setDueDate(request.getDueDate());
        
        Project savedProject = projectRepository.save(project);
        return mapToResponse(savedProject);
    }

    public List<ProjectResponse> getProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ProjectResponse mapToResponse(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getDueDate(),
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }
}
