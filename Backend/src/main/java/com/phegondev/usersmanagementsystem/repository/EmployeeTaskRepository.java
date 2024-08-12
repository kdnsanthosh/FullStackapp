package com.phegondev.usersmanagementsystem.repository;

import com.phegondev.usersmanagementsystem.entity.EmployeeTask;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EmployeeTaskRepository extends JpaRepository<EmployeeTask, Long> {
    List<EmployeeTask> findByOurUsers_Id(Long userId);
}