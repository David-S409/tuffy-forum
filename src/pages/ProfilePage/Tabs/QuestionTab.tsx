import * as React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TablePagination,
  Container,
  IconButton,
  Link,
} from '@mui/material';
import {
  Box,
  Button,
  Divider,
  Modal,
  ModalDialog,
  Typography,
} from '@mui/joy';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { makeStyles } from 'tss-react/mui';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

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
  const [open, setOpen] = React.useState<boolean>(false);
  const [ids, setIds] = React.useState(0);
  
  const fetchInfo = () => {
    axios.get('http://localhost:8080/api/v1/questions', { withCredentials: true})
    .then((response) => {
      setQuestion(response.data);
    }).catch((err) => {
      console.error(err);
    })
    axios.get('http://localhost:8080/api/v1/courses', { withCredentials: true})
    .then((response) => {
      setCourses(response.data);
    }).catch((err) => {
      console.error(err);
    })
  }

  React.useEffect(() => {
    fetchInfo();
  }, []);
  
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
            <StyledTableCell width={300}>Title</StyledTableCell>
            <StyledTableCell width={175}>Course</StyledTableCell>
            <StyledTableCell width={125}>Vote #</StyledTableCell>
            <StyledTableCell width={125}>Delete</StyledTableCell>  
          </TableRow>
        </TableHead>
        <TableBody>
          {questions
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((question) => (
              <StyledTableRow key={questions.indexOf(question)}>
                    <StyledTableCell component="th" scope="row">
                      {question.questionId}
                      </StyledTableCell>
                      <StyledTableCell align="left"
                        sx={{maxWidth: 300}}
                      >
                        <Link href={`/question/${question.questionId}`}
                        underline='hover'
                        overflow='hidden'
                        width={250}
                        >
                          {question.header.length <= 125 ? question.header: (question.header.substr(0,125) + "...")}
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
                      <IconButton 
                        title="Delete"
                        onClick={() => {setIds(question.questionId), setOpen(true)}}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Modal open={open} onClose={() => setOpen(false)}>
                        <ModalDialog
                          variant="outlined"
                          role="alertdialog"
                          aria-labelledby="alert-dialog-modal-title"
                          aria-describedby="alert-dialog-modal-description"
                        >
                          <Typography
                            id="alert-dialog-modal-title"
                            component="h2"
                            startDecorator={<WarningRoundedIcon />}
                          >
                            Confirmation
                          </Typography>
                          <Divider />
                          <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
                            Are you sure you want to discard this question?
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                              Cancel
                            </Button>
                            <Button 
                            variant="solid" 
                            color="danger" 
                            onClick={() => {
                              axios.get(`http://localhost:8080/api/v1/question/remove/${ids}`, { withCredentials: true })
                              .then((response) => {
                                console.log(`Question ${ids} deleted`);
                                setOpen(false);
                              }).catch((err) => {
                                console.error(err);
                              })}}
                              >
                              Confirm
                            </Button>
                          </Box>
                        </ModalDialog>
                      </Modal>
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
