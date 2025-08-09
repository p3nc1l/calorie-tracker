import { Box, TextField, Typography, Alert } from "@mui/material"
import PageStepper from "./PageStepper";
import ButtonBar from "./ButtonBar";
import { useDebounce } from "@uidotdev/usehooks";

const Page2 = ({ setPage, nickname, setNickname }: { setPage: React.Dispatch<React.SetStateAction<number>>, nickname: string, setNickname: React.Dispatch<React.SetStateAction<string>> }) => {
  const correctNickname = nickname.length >= 3 && nickname.length <= 20 ? true : false;
  const nicknameDebounced = useDebounce(nickname, 1000);

  return (
    <Box className="w-dvw h-dvh flex flex-col">
      <PageStepper currentStep={1} />
      <Box className="w-full grow flex flex-col items-center justify-center gap-12">
        <Box className="flex flex-col items-center justify-center gap-2 w-full">
          <Box className="w-72"><TextField variant="standard" fullWidth slotProps={{htmlInput: {sx: {fontSize: 24, textAlign: "center"}}}} value={nickname} onChange={e => setNickname(e.target.value)} /></Box>
          <Typography variant="h6" component={"span"}>Enter your nickname</Typography>
          {nicknameDebounced.length < 3 && nicknameDebounced.length != 0 && <Alert severity="error">Your nickname must have at least 3 characters</Alert>}
          {nicknameDebounced.length > 20 && <Alert severity="error">Your nickname can not have more than 20 characters</Alert>}
        </Box>
        <ButtonBar continueDisabled={!correctNickname} setPage={setPage} />
      </Box>
    </Box>
  )
}

export default Page2