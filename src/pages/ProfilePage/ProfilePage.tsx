import * as React from 'react';
import {
  Tabs,
  Tab,
  Typography,
  Box,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ProfileTab from './Tabs/ProfileTab';
import CourseTab from './Tabs/CourseTab';
import QuestionTab from './Tabs/QuestionTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  console.log(value);
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        boxShadow: 10,
        bgcolor: 'background.paper',
        marginTop: '-30px',
        padding: '10px',
        width: 'auto',
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="User" />
        <Tab label="Course" />
        <Tab label="Question" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ProfileTab />
      </TabPanel>      
      <TabPanel value={value} index={1}>
        <CourseTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <QuestionTab />
      </TabPanel>
    </Box>
  );
}
