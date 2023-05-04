/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import {
  IconButton,
  InputBase,
  Paper,
  MenuItem,
  MenuList,
  Popper,
  ClickAwayListener,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import axios from 'axios';

const useStyles = makeStyles()(() => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      width: 400,
      outline: 'solid',
      outlineColor: 'currentColor',
      outlineWidth: 'thin',
      outlineStyle: 'auto',
      borderRadius: '8px',
    },
    input: {
      marginLeft: '16px',
      flex: 1,
    },
    searchButton: {
      padding: '8px',
    },
    popper: {
      zIndex: 1,
      offset: '0, 8px',
      minWidth: '250px',
    },
    menuItem: {
      padding: '8px 16px',
    },
  };
});

type SearchType = 'course' | 'question' | 'tag';

function SearchBar() {
  const { classes } = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<SearchType>();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const history = useNavigate();

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchType(event.target.value as SearchType);
  };

  const handleSearch = async () => {
    if (searchTerm.length === 0) {
      setSearchResults([]);
      return;
    }

    await axios
      .get(`http://localhost:8080/api/v1/questions/search?search=${searchTerm}`)
      .then((response) => {
        setSearchResults(response.data);
        setIsOpen(true);
      })
      .catch((error) => {
        console.log('error:', error);
      });
  };

  const handleItemClick = (result: any) => {
    setIsOpen(false);
    setSearchResults([]);
    setSearchTerm('');
    if (result.courseId) {
      history(`/courses/${result.courseId}`);
    } else if (result.questionId) {
      history(`/questions/${result.questionId}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClickAway = () => {
    setIsOpen(false);
    setSearchResults([]);
  };

  return (
    <div className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search…"
        value={searchTerm}
        onChange={handleSearchTermChange}
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton
        className={classes.searchButton}
        onClick={handleSearch}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <Popper
        className={classes.popper}
        open={isOpen}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClickAway}>
            <MenuList autoFocusItem={isOpen}>
              {searchResults.map((result) => (
                <MenuItem
                  key={result.questionId || result.courseId}
                  className={classes.menuItem}
                  onClick={() => handleItemClick(result)}
                >
                  {result.courseId ? result.courseName : result.questionTitle}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
}

export default SearchBar;

// /*

// /* eslint-disable no-console */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { InputBase, IconButton } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import axios from 'axios';

// function SearchBar() {
//   const history = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = async (event: { preventDefault: () => void }) => {
//     event.preventDefault();
//     try {
//       const response = await axios.get(`/search?q=${searchTerm}`);
//       setSearchResults(response.data);
//       history('/search');
//     } catch (error) {
//       console.log('error:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSearch}>
//       <InputBase
//         placeholder="Search…"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         inputProps={{ 'aria-label': 'search' }}
//       />
//       <IconButton type="submit" aria-label="search">
//         <SearchIcon />
//       </IconButton>
//     </form>
//   );
// }

// export default SearchBar;
// */
