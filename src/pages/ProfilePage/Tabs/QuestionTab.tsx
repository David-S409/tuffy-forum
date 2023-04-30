import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from 'tss-react/mui';
import { Container } from '@mui/material';
import axios from 'axios';

interface Column {
  id: 'questionId' | 'header' | 'courseCode' | 'votes' | 'remove';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'questionId', label: 'ID', minWidth: 50},
  { id: 'header', label: 'Title', minWidth: 250 },
  { id: 'courseCode', label: 'Course', minWidth: 150 },
  {
    id: 'votes',
    label: 'Vote',
    minWidth: 170,
  },
  {
    id: 'remove',
    label: 'Remove',
    minWidth: 170,
  },
];

interface Data {
  questId: number;
  header: string;
  votes: number;
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
      height: '100%',
      width: '100%',
    },
  }})

export default function QuestionTab () {
  const { classes } = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [questions, setQuestion] = React.useState<Data[]>([]);
  
  React.useEffect(() => {
    axios.get('http://localhost:8080/api/v1/questions', { withCredentials: true})
    .then((response) => {
      setQuestion(response.data);
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
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {questions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((question) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={question.questId}>
                      {columns.map((column) => {
                        const value = question[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
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
