import * as React from 'react';
import {
  Tabs,
  Tab,
  Typography,
  Box,
} from '@mui/material';
import ProfileTab from './Tabs/ProfileTab';
import CourseTab from './Tabs/CourseTab';
import QuestionTab from './Tabs/QuestionTab';
import { pathToFileURL } from 'url';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabNameToIndex {
  [key: number]: string;
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
  let path = location.pathname;
  const urlId = path.substring(0,12);

  const currentTab = () => {
    if (path === `${urlId}/UserProfile`) return 0;
    else if (path === `${urlId}/MyCourses`) return 1;
    else if (path === `${urlId}/MyQuestions`) return 2;
    else return 0;
  }
  const tabNameToIndex: TabNameToIndex ={
    0: "/UserProfile",
    1: "/MyCourses",
    2: "/MyQuestions"
  }
  const [value, setValue] = React.useState<number>(currentTab);
  const [tabId, setTabId] = React.useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabId(tabNameToIndex[newValue]);
    setValue(newValue);
  };
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
        <Tab label="User" href='UserProfile' />
        <Tab label="Course" href='MyCourses' />
        <Tab label="Question" href='MyQuestions' />
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
