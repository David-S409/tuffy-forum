import * as React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TablePagination,
  Container,
  IconButton,
  Tooltip,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { makeStyles } from 'tss-react/mui';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.divider,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 1,
  },
}));

interface Course {
  courseId: number;
  courseCode: string;
}

interface Data {
  questionId: number;
  header: string;
  courseId: number;
  votes: number;
  remove: boolean;
}


const useStyles = makeStyles()(() => {
  return {
    root: {
      paddingTop: 'auto',
      paddingBottom: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      flexDirection: 'column',
      width: 'auto',
    },
  }})

export default function QuestionTab () {
  const { classes } = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [questions, setQuestion] = React.useState<Data[]>([]);
  const [courses, setCourses] = React.useState<Course[]>([]);
  
  React.useEffect(() => {
    axios.get('http://localhost:8080/api/v1/questions', { withCredentials: true})
    .then((response) => {
      setQuestion(response.data);
    }).catch((err) => {
      console.error(err);
    })
    axios.get('http://localhost:8080/api/v1/user/courses', { withCredentials: true})
    .then((response) => {
      setCourses(response.data);
    }).catch((err) => {
      console.error(err);
    })
  }, [])

  
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

 

  return (
    <Container className={classes.root}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={50}>ID</StyledTableCell>
            <StyledTableCell width={250}>Title</StyledTableCell>
            <StyledTableCell width={175}>Course</StyledTableCell>
            <StyledTableCell width={125}>Vote #</StyledTableCell>
            <StyledTableCell width={125}>Remove</StyledTableCell>  
          </TableRow>
        </TableHead>
        <TableBody>
          {questions
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((question) => (
              <StyledTableRow key={question.questionId}>
                    <StyledTableCell component="th" scope="row">
                      {question.questionId}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Link href="#"
                        underline='hover'
                        >
                          {question.header}
                        </Link>
                      </StyledTableCell>
                {courses.map((course) => {
                  if (question.courseId === course.courseId)
                  return (
                    <StyledTableCell key={course.courseId} align="left">
                      {course.courseCode}
                      </StyledTableCell>
                    )
                  })}
                  <StyledTableCell align="left">{question.votes}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Tooltip title="Remove">
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>  
                  </StyledTableCell>  
                    
                  </StyledTableRow>
            ))}
        </TableBody>
      </Table>

    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={questions.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </Container>
  );
}
