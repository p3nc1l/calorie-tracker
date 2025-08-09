import { useContext, useState } from "react"
import SavedDataContext from "../../SavedDataContext"
import { Box, TextField, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Done, Edit, AccountCircle } from "@mui/icons-material";

const NicknameBox = () => {
  const savedNickname = useContext(SavedDataContext).nickname;
  const setSavedNickname = useContext(SavedDataContext).setNickname;
  const [nickname, setNickname] = useState(savedNickname);
  const [editing, setEditing] = useState(false);

  const SaveNickname = () => {
    setSavedNickname(nickname);
    setEditing(false);
  }

  if (!editing) return (
    <Box className="w-max cursor-pointer" onClick={() => setEditing(true)}><Box className="text-4xl flex justify-center items-center gap-2">{nickname} <Edit /></Box></Box>
  )
  else return (
    <Box className="w-max flex"><Box className="w-64"><TextField fullWidth slotProps={{htmlInput: {sx: {fontSize: 36, textAlign: "center"}}}} variant="standard" value={nickname} onChange={e => setNickname(e.target.value)} /></Box><IconButton onClick={SaveNickname} disabled={nickname.length < 3 || nickname.length > 20}><Done /></IconButton></Box>
  )
}

const AvatarArea = () => {
  return (
    <Box className="flex flex-col items-center justify-center gap-4">
      <Box><AccountCircle color="disabled" sx={{fontSize: 216}} /></Box>
      <NicknameBox />
    </Box>
  )
}

const ResetDataDialog = ({ visible = true, closeDialog }: { visible?: boolean, closeDialog: () => void }) => {
  const { setNickname, setDailyGoal, setMeals } = useContext(SavedDataContext);

  const ResetData = () => {
    setNickname("");
    setDailyGoal(0);
    setMeals([]);
  }
  
  return (
    <Dialog open={visible} onClose={closeDialog}>
      <DialogTitle>Reset Data</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to reset all the data saved on your device?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button color="error" onClick={ResetData}>Reset</Button>
      </DialogActions>
    </Dialog>
  )
}

const DailyGoalArea = () => {
  const [editing, setEditing] = useState(false);
  const savedData = useContext(SavedDataContext);
  const [dailyGoal, setDailyGoal] = useState(savedData.dailyGoal);

  const SaveChanges = () => {
    setEditing(false);
    savedData.setDailyGoal(dailyGoal);
  }

  if (editing) return (
    <Box className="flex items-center justify-center w-max">
      <Box className="flex items-center justify-center gap-2">
        <Box className="text-xl">Daily Goal:</Box>
        <Box className="w-20"><TextField fullWidth slotProps={{htmlInput: {type: "number", sx: {fontSize: 20}}}} variant="standard" value={dailyGoal} onChange={e => setDailyGoal(+e.target.value)} /></Box>
        <IconButton disabled={dailyGoal < 0 || dailyGoal > 100000} onClick={SaveChanges}><Done /></IconButton>
      </Box>
    </Box>
  );
  else return (
    <Box className="flex items-center justify-center w-max">
      <Box>
        <span className="text-xl">Daily Goal: {dailyGoal}</span>
      </Box>
      <Box>
        <IconButton onClick={() => setEditing(true)}><Edit /></IconButton>
      </Box>
    </Box>
  )
}

const Profile = () => {
  const [resetDialog, setResetDialog] = useState(false);

  const CloseResetDialog = () => {
    setResetDialog(false);
  }

  return (
    <>
      <ResetDataDialog visible={resetDialog} closeDialog={CloseResetDialog} />
      <Box className="mt-16 mx-auto w-max"><AvatarArea /></Box>
      <Box className="mt-16"><DailyGoalArea /></Box>
      <Box className="w-max mx-auto mt-8"><Button variant="outlined" color="error" size="large" onClick={() => setResetDialog(true)}>Reset Data</Button></Box>
    </>
  )
}

export default Profile