import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const useStyles = makeStyles()(() => {
  return {
    root: {
      width: 'auto',
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'orange',

          '&:hover': {
            borderColor: 'white',
          },
        },
      },
    },
  };
});

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <TextField
        placeholder="Search..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Search">
                <IconButton type="submit" aria-label="search">
                  <SearchIcon color="primary" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        className={classes.root}
      />
    </form>
  );
}

export default SearchBar;
