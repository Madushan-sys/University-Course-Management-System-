import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

function App() {
  const [courses, setCourses] = useState([]);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");

  // Fetch courses
  useEffect(() => {
    fetch("http://localhost:8080/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);

  // Add new course
  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = { code, title };

    fetch("http://localhost:8080/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCourse),
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses([...courses, data]);
        setCode("");
        setTitle("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        📚 Course Management
      </Typography>

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          justifyContent: "center",
        }}
      >
        <TextField
          label="Course Code"
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <TextField
          label="Course Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Course
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Code</TableCell>
              <TableCell sx={{ color: "white" }}>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.code}</TableCell>
                <TableCell>{course.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
