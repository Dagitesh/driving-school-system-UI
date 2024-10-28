import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Typography,
  IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <div>
    
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '20px', backgroundColor: '#f5f5f5' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="students table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={8} align="right">
                <Link to="/enrollment" style={{ textDecoration: 'none' }}>
                  <IconButton color="primary" size="small">
                    <AddIcon />
                  </IconButton>
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>First Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Last Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Date of Birth</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Region</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Course</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Teacher</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Sub City</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>ID Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={student.id}>
                  <TableCell>{student.first_name || 'N/A'}</TableCell>
                  <TableCell>{student.last_name || 'N/A'}</TableCell>
                  <TableCell>{student.birthday || 'N/A'}</TableCell>
                  <TableCell>{student.city || 'N/A'}</TableCell>
                  <TableCell>{student.course ? student.course.name : 'N/A'}</TableCell>
                  <TableCell>{student.teacher ? student.teacher.name : 'N/A'}</TableCell>
                  <TableCell>{student.sub_city || 'N/A'}</TableCell>
                  <TableCell>{student.id_number || 'N/A'}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={students.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
};

export default Dashboard;
