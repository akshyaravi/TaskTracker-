package com.example.TaskTracker_Backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseFixer implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    public DatabaseFixer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            // Fixes the "Data truncated for column" issue by increasing column size
            jdbcTemplate.execute("ALTER TABLE tasks MODIFY COLUMN status VARCHAR(50)");
            jdbcTemplate.execute("ALTER TABLE tasks MODIFY COLUMN priority VARCHAR(50)");
            System.out.println("Database schema successfully updated to allow longer enum strings.");
        } catch (Exception e) {
            System.out.println("Could not alter table: " + e.getMessage());
        }
    }
}
