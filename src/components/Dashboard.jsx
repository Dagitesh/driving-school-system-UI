import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [isSaving, setIsSaving] = useState(false); // State for loading during save

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/v1/students');
        setStudents(response.data);
      } catch (err) {
        console.error(err);
        setError('Error fetching students data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setFormValues({
      first_name: student.first_name,
      last_name: student.last_name,
      birthday: student.birthday,
      city: student.city,
      course: student.course ? student.course.name : '',
      teacher: student.teacher ? student.teacher.name : '',
      sub_city: student.sub_city,
      id_number: student.id_number
    });
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedStudent(null);
    setFormValues({}); // Clear form values when closing the dialog
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSaveChanges = async () => {
    setIsSaving(true); // Set loading state
    try {
      await axios.put(`http://127.0.0.1:3000/api/v1/students/${selectedStudent.id}`, formValues);
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === selectedStudent.id ? { ...student, ...formValues } : student
        )
      );
      handleDialogClose();
    } catch (err) {
      console.error('Error updating student:', err);
      const message = err.response?.data?.errors?.join(', ') || 'Failed to update student information';
      setError(message);
    } finally {
      setIsSaving(false); // Reset loading state
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: 'white' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/enrollment" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Enroll New Student
          </Button>
        </Link>
      </div>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell>Sub City</TableCell>
              <TableCell>ID Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                onClick={() => handleRowClick(student)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{student.first_name || 'N/A'}</TableCell>
                <TableCell>{student.last_name || 'N/A'}</TableCell>
                <TableCell>{student.birthday || 'N/A'}</TableCell>
                <TableCell>{student.city || 'N/A'}</TableCell>
                <TableCell>{student.course ? student.course.name : 'N/A'}</TableCell>
                <TableCell>{student.teacher && student.teacher.name ? student.teacher.name : 'N/A'}</TableCell>
                <TableCell>{student.sub_city || 'N/A'}</TableCell>
                <TableCell>{student.id_number || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Student Information</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="first_name"
            value={formValues.first_name || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={formValues.last_name || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Date of Birth"
            name="birthday"
            value={formValues.birthday || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Region"
            name="city"
            value={formValues.city || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Sub City"
            name="sub_city"
            value={formValues.sub_city || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="ID Number"
            name="id_number"
            value={formValues.id_number || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveChanges} color="primary" disabled={isSaving}>
            {isSaving ? <CircularProgress size={24} /> : 'Save'}
          </Button>
          <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
