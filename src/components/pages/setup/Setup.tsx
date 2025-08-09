import { Box, Typography } from "@mui/material"
import { useState } from "react";
import Page1 from "./Page1";
import Page2 from "./Page2";
import ButtonBar from "./ButtonBar";
import Page3 from "./Page3";

const Setup = ({ setNickname, setDailyGoal }: { setNickname: React.Dispatch<React.SetStateAction<string>>, setDailyGoal: React.Dispatch<React.SetStateAction<number>> }) => {
  const [page, setPage] = useState(0);
  const [setupNickname, setSetupNickname] = useState("");
  const [setupGoal, setSetupGoal] = useState(1000);

  const Finish = () => {
    setNickname(setupNickname);
    setDailyGoal(setupGoal);
  }

  if (page == 0) return (
    <Box className="w-dvw h-dvh flex flex-col items-center justify-center gap-16">
      <Box className="flex flex-col items-center justify-center gap-16">
        <img width={200} src="/thunder.png" />
        <Typography variant="h3" component={"h1"}>Calorie Tracker</Typography>
      </Box>
      <ButtonBar setPage={setPage} variant="get-started" />
    </Box>
  )
  else if (page == 1) return (<Page1 setPage={setPage} />)
  else if (page == 2) return (<Page2 nickname={setupNickname} setNickname={setSetupNickname} setPage={setPage} />)
  else if (page == 3) return (<Page3 dailyGoal={setupGoal} setDailyGoal={setSetupGoal} setPage={setPage} />)
  else if (page == 4) Finish();
}

export default Setup