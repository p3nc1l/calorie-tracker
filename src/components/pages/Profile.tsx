import { useContext, useState } from "react"
import SavedDataContext from "../../SavedDataContext"
import { Box, TextField, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Done, Edit, AccountCircle } from "@mui/icons-material";

const NicknameBox = () => {
  const savedNickname = useContext(SavedDataContext).nickname;
  const setSavedNickname = useContext(SavedDataContext).setNickname;
  const [nickname, setNickname] = useState(savedNickname);
  const [editingNickname, setEditingNickname] = useState(false);

  const SaveNickname = () => {
    setSavedNickname(nickname);
    setEditingNickname(false);
  }

  if (!editingNickname) return (
    <Box className="w-max cursor-pointer" onClick={() => setEditingNickname(true)}><Box className="text-4xl flex justify-center items-center gap-2">{nickname} <Edit /></Box></Box>
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

const Profile = () => {
  const [resetDialog, setResetDialog] = useState(false);

  const CloseResetDialog = () => {
    setResetDialog(false);
  }

  return (
    <>
      <ResetDataDialog visible={resetDialog} closeDialog={CloseResetDialog} />
      <Box className="mt-16 mx-auto w-max"><AvatarArea /></Box>
      <Box className="w-max mx-auto mt-8"><Button variant="outlined" color="error" size="large" onClick={() => setResetDialog(true)}>Reset Data</Button></Box>
    </>
  )
}

export default Profile