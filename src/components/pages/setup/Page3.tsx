import { Box, TextField, Typography, Alert } from "@mui/material"
import PageStepper from "./PageStepper";
import ButtonBar from "./ButtonBar";

const Page3 = ({ setPage, dailyGoal, setDailyGoal }: { setPage: React.Dispatch<React.SetStateAction<number>>, dailyGoal: number, setDailyGoal: React.Dispatch<React.SetStateAction<number>> }) => {
  return (
    <Box className="w-dvw h-dvh flex flex-col">
      <PageStepper currentStep={2} />
      <Box className="w-full grow flex flex-col items-center justify-center gap-12">
        <Box className="flex flex-col items-center justify-center gap-2 w-full">
          <Box className="w-72"><TextField variant="standard" fullWidth slotProps={{htmlInput: {sx: {fontSize: 24, textAlign: "center"}, type: "number"}}} value={+dailyGoal} onChange={e => setDailyGoal(+e.target.value)} /></Box>
          <Typography variant="h6" component={"span"}>Enter daily calorie goal</Typography>
          {dailyGoal < 0 && <Alert severity="error">Your daily goal cannot be lower than 0</Alert>}
          {dailyGoal > 100000 && <Alert severity="error">Your daily goal cannot be higher than 100000</Alert>}
        </Box>
        <ButtonBar variant="finish" setPage={setPage} />
      </Box>
    </Box>
  )
}

export default Page3