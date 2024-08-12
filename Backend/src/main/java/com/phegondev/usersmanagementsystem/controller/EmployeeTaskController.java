package com.phegondev.usersmanagementsystem.controller;

import com.phegondev.usersmanagementsystem.entity.EmployeeTask;
import com.phegondev.usersmanagementsystem.repository.EmployeeTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*")
public class EmployeeTaskController {

    @Autowired
    private  EmployeeTaskRepository repository;

    @GetMapping
    public List<EmployeeTask> getAllTasks() {
        return repository.findAll();
    }

    @PostMapping
    public EmployeeTask createTask(@RequestBody EmployeeTask task) {
        task.setTotal(task.getMon() + task.getTue() + task.getWed() + task.getThu() + task.getFri() + task.getSat());
        return repository.save(task);
    }

    @GetMapping("/{userId}")  //new implemented for get list of task through userID
    public List<EmployeeTask> getEmployeeTasksByUserId(@PathVariable Long userId) {
    return repository.findByOurUsers_Id(userId);
    }


    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @DeleteMapping
    public void deleteAllTasks() {
        repository.deleteAll();
    }

    @PostMapping("/{id}/dates")
    public EmployeeTask setDatesForTask(
            @PathVariable Long id,
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        EmployeeTask task = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        task.setStartDate(startDate);
        task.setEndDate(endDate);

        return repository.save(task);
    }
    // new implementation of approve button reflect
    @PutMapping("/{id}/approve")
    public EmployeeTask approveTask(@PathVariable Long id)
    {
        EmployeeTask task = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        task.setStatus("Approved");
        return repository.save(task);

    }



}
