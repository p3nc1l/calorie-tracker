import { Box, Button, Typography } from "@mui/material"
import { ArrowRightAlt } from "@mui/icons-material"
import { useState } from "react";
import Page1 from "./Page1";

const Setup = () => {
  const [page, setPage] = useState(0);

  const NextPage = () => {
    setPage(prevPage => prevPage + 1);
  }

  if (page == 0) return (
    <Box className="w-dvw h-dvh flex flex-col items-center justify-center gap-16">
      <Box className="flex flex-col items-center justify-center gap-16">
        <img width={200} src="/thunder.png" />
        <Typography variant="h3" component={"h1"}>Calorie Tracker</Typography>
      </Box>
      <Button variant="contained" endIcon={<ArrowRightAlt />} onClick={NextPage} size="large">Get Started</Button>
    </Box>
  )
  else if (page == 1) return (<Page1 nextPage={NextPage} />)

}

export default Setup