import { Box, Typography } from "@mui/material"
import PageStepper from "./PageStepper";
import ButtonBar from "./ButtonBar";

const Page1 = ({ setPage }: { setPage: React.Dispatch<React.SetStateAction<number>> }) => {
  return (
    <Box className="w-dvw h-dvh flex flex-col">
      <PageStepper currentStep={0} />
      <Box className="w-full grow flex flex-col items-center justify-center gap-12">
        <Box className="flex flex-col items-center justify-center gap-16 w-full">
          <Typography variant="h3" component={"h1"}>Attention</Typography>
          <Box className="border p-2 border-gray-300 rounded-sm w-8/10 max-w-3xl"><Typography>In order for this app to function properly it may store personal information provided by you on your device (such as  your nickname, your daily goal and the meals you log).<br /><br />The searches you make through this app are sent to our remote server on the internet.<br /><br />Any data you provide except your searches are kept on your local device and not shared with any remote device!</Typography></Box>
        </Box>
        <ButtonBar variant="continue" setPage={setPage} />
      </Box>
    </Box>
  )
}

export default Page1