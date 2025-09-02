package com.example.course_management;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // 👈 allow React to call backend
@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseRepository repo;

    @GetMapping
    public List<Course> getAllCourses() {
        return repo.findAll();
    }

    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        return repo.save(course);
    }
}


