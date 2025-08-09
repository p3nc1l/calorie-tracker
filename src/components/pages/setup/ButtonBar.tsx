import { Box, Button } from "@mui/material"
import { East, West, Done } from "@mui/icons-material"

const ButtonBar = ({ setPage, variant = "back-continue", continueDisabled = false }: { setPage: React.Dispatch<React.SetStateAction<number>>, variant?: string, continueDisabled?: boolean }) => {
  const NextPage = () => {
    setPage(prevPage => prevPage + 1);
  }

  const PrevPage = () => {
    setPage(prevPage => prevPage - 1)
  }

  if (variant == "back-continue") return (
    <Box className="flex gap-4">
      <Button variant="outlined" startIcon={<West />} onClick={PrevPage} size="large">Back</Button>
      <Button variant="contained" endIcon={<East />} onClick={NextPage} size="large" disabled={continueDisabled}>Continue</Button>
    </Box>
  )
  else if (variant == "get-started") return (
    <Box className="flex gap-4">
      <Button variant="contained" endIcon={<East />} onClick={NextPage} size="large" disabled={continueDisabled}>Get Started</Button>
    </Box>
  )
  else if (variant == "continue") return (
    <Box className="flex gap-4">
      <Button variant="contained" endIcon={<East />} onClick={NextPage} size="large" disabled={continueDisabled}>Continue</Button>
    </Box>
  )
  else if (variant == "finish") return (
    <Box className="flex gap-4">
      <Button variant="outlined" startIcon={<West />} onClick={PrevPage} size="large">Back</Button>
      <Button variant="contained" endIcon={<Done />} onClick={NextPage} size="large" disabled={continueDisabled}>Finish</Button>
    </Box>
  )
}

export default ButtonBar