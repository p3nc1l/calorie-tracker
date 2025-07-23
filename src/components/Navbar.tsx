import { BottomNavigation, Paper, Button, IconButton } from '@mui/material'
import { BottomNavigationAction } from '@mui/material'
import HomeFilled from '@mui/icons-material/HomeFilled';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { AccountCircle, AddBox, ListAlt } from '@mui/icons-material';
import { isMobile } from 'react-device-detect';

const Navbar = ({ page, setPage }: {page: number, setPage: (page: number) => void}) => {
  

  return (
    <Paper className={`fixed ${isMobile ? "bottom-0 w-screen border-gray-200 border-t-1" : "bottom-2 left-1/2 -translate-x-1/2"}`} elevation={!isMobile ? 3 : 0}>
      <BottomNavigation className='rounded-md' showLabels value={page} onChange={(_, value) => setPage(value)}>
        <BottomNavigationAction label={!isMobile ? "Home" : ""} icon={<HomeFilled />} />
        <BottomNavigationAction label={!isMobile ? "Foods" : ""} icon={<FastfoodIcon />} />
        {!isMobile ?
         <Button variant='contained' className='flex-col'><AddBox /><div>Add</div></Button> :
         <IconButton size='large'><AddBox fontSize='large'/></IconButton> }
        <BottomNavigationAction label={!isMobile ? "Meals" : ""} icon={<ListAlt />} value={2}/>
        <BottomNavigationAction label={!isMobile ? "Profile" : ""} icon={<AccountCircle />} value={3}/>
      </BottomNavigation>
    </Paper>
  )
}

export default Navbar