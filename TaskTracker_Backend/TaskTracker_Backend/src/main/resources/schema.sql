CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    priority VARCHAR(50) NOT NULL,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    project_id BIGINT NOT NULL,
    CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    INDEX idx_project_id (project_id),
    INDEX idx_status (status),
    INDEX idx_due_date (due_date)
);

-- Sample Insert Statements
INSERT INTO projects (name, description) VALUES 
('Website Redesign', 'Overhaul the main company website with modern UI.'),
('Mobile App Launch', 'Develop and launch the new iOS and Android applications.');

INSERT INTO tasks (title, description, status, priority, due_date, project_id) VALUES 
('Create mockups', 'Design Figma mockups for the landing page.', 'TODO', 'HIGH', '2026-07-10', 1),
('Setup CI/CD pipeline', 'Configure GitHub Actions for deployment.', 'IN_PROGRESS', 'MEDIUM', '2026-07-05', 2),
('Write API documentation', 'Document the backend REST endpoints using Swagger.', 'DONE', 'LOW', '2026-06-25', 2);
