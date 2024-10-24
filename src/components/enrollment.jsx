import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Typography,
  Paper
} from '@mui/material';

const StudentForm = () => {
  const [student, setStudent] = useState({
    first_name: '',
    last_name: '',
    birthday: '',
    gender: '',
    sub_city: '',
    city: '',
    course_id: '',
    id_number: '',
    teacher_id: ''
  });

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/v1/courses');
        setCourses(response.data || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setErrorMessage('Failed to load courses. Please try again later.');
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/v1/teachers');
        setTeachers(response.data || []);
      } catch (error) {
        console.error('Error fetching teachers:', error);
        setErrorMessage('Failed to load teachers. Please try again later.');
      }
    };

    fetchCourses();
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student.first_name || !student.last_name || !student.birthday || 
        !student.gender || !student.sub_city || !student.city || 
        !student.course_id || !student.id_number || !student.teacher_id) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setErrorMessage('');

    try {
      await axios.post('http://[::1]:3000/api/v1/students', { student });
      alert('Student created successfully!');
      setStudent({
        first_name: '',
        last_name: '',
        birthday: '',
        gender: '',
        sub_city: '',
        city: '',
        course_id: '',
        id_number: '',
        teacher_id: ''
      });
    } catch (error) {
      console.error('Error creating student:', error);
      alert('Error creating student. Please check your input.');
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: '30px', maxWidth: '800px', margin: 'auto' }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Create Student
          </Typography>
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="first_name"
                value={student.first_name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="last_name"
                value={student.last_name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Birthday"
                type="date"
                name="birthday"
                value={student.birthday}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={student.gender}
                  onChange={handleChange}
                >
                  <MenuItem value=""><em>Select Gender</em></MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Sub City"
                name="sub_city"
                value={student.sub_city}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                name="city"
                value={student.city}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Course</InputLabel>
                <Select
                  name="course_id"
                  value={student.course_id}
                  onChange={handleChange}
                >
                  <MenuItem value=""><em>Select a Course</em></MenuItem>
                  {Array.isArray(courses) && courses.map(course => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Teacher</InputLabel>
                <Select
                  name="teacher_id"
                  value={student.teacher_id}
                  onChange={handleChange}
                >
                  <MenuItem value=""><em>Select a Teacher</em></MenuItem>
                  {Array.isArray(teachers) && teachers.map(teacher => (
                    <MenuItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ID Number"
                name="id_number"
                value={student.id_number}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Create Student
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default StudentForm;
