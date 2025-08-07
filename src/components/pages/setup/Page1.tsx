import { Box, Typography, Button } from "@mui/material"
import { ArrowRightAlt } from "@mui/icons-material";

const Page1 = ({ nextPage }: { nextPage: () => void }) => {
  return (
    <Box className="w-dvw h-dvh flex flex-col items-center justify-center gap-12">
      <Box className="flex flex-col items-center justify-center gap-16 w-full">
        <Typography variant="h3" component={"h1"}>Attention</Typography>
        <Box className="border p-2 border-gray-300 rounded-sm w-8/10 max-w-3xl"><Typography>In order for this app to function properly it may store personal information provided by you on your device (such as  your nickname, your daily goal and the meals you log).<br /><br />The searches you make through this app are sent to our remote server on the internet.<br /><br />Any data you provide except your searches are kept on your local device and not shared with any remote device!</Typography></Box>
      </Box>
      <Box className="flex gap-4">
        <Button variant="contained" endIcon={<ArrowRightAlt />} onClick={nextPage} size="large">Continue</Button>
      </Box>
    </Box>
  )
}

export default Page1