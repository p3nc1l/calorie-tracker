import { BottomNavigation, Box, Button } from '@mui/material'
import { BottomNavigationAction } from '@mui/material'
import HomeFilled from '@mui/icons-material/HomeFilled';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { AccountCircle, AddBox, ListAlt } from '@mui/icons-material';

const Navbar = ({ page, setPage }: {page: number, setPage: (page: number) => void}) => {
  

  return (
    <Box className='absolute bottom-2 left-1/2 -translate-x-1/2 border-gray-200 border-1 rounded-md shadow-md'>
      <BottomNavigation className='rounded-md' showLabels value={page < 2 ? page : page + 1} onChange={(_, value) => setPage(value < 2 ? value : value - 1)}>
        <BottomNavigationAction label="Home" icon={<HomeFilled />} />
        <BottomNavigationAction label="Foods" icon={<FastfoodIcon />} />
        <Button variant='contained' className='flex-col'><AddBox /><div>Add</div></Button>
        <BottomNavigationAction label="Meals" icon={<ListAlt />} />
        <BottomNavigationAction label="Profile" icon={<AccountCircle />} />
      </BottomNavigation>
    </Box>
  )
}

export default Navbar