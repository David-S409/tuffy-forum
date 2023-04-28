import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.app);
  const userUrl = `/profile/u/#${user?.userId}`;

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  //console.log(window.location.pathname);
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        boxShadow: 10,
        bgcolor: 'background.paper',
        marginTop: '-30px',
        padding: '10px',
      }}
      //sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="User" {...a11yProps(0)} />
        <Tab label="Course" {...a11yProps(1)} />
        <Tab label="Question" {...a11yProps(2)} />
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
