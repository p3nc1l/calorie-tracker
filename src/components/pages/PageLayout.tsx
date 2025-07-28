import { type ReactNode } from 'react'
import { Box } from '@mui/material';

const PageLayout = ({ active, children }: { active: boolean, children: ReactNode }) => {
  return (
    <Box className={`w-screen h-screen ${!active && "overflow-y-hidden"}`}>
      <Box className={"w-screen flex-none flex flex-col items-center"}>
        <Box className="w-full max-w-7xl px-4 mb-16">
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default PageLayout