import { Box, Grid, Typography } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { LocalDining, Whatshot } from "@mui/icons-material";

const Home = () => {
  const dailyGoal = Number(localStorage.getItem("dailyGoal")) || Infinity;
  const reachedToday = JSON.parse(localStorage.getItem("reachedToday") || "{}");

  return (
    <Box className={"w-screen flex-none flex flex-col items-center"}>
      <Box className="w-full max-w-7xl px-4 mb-16">
        <Box className="mt-20">
          <Typography sx={{ fontWeight: 600 }} variant="h3" component={"h1"}>Hi, <span className="bg-gradient-to-r from-green-700 to-yellow-500 text-transparent bg-clip-text">{localStorage.getItem("nickname") || "user"}</span><br />{(dailyGoal) - (reachedToday.calories || 0)} more calories to reach your daily goal</Typography>
        </Box>
        <Box className="flex flex-row flex-wrap mt-20 gap-4">
          <Card>
            <CardContent>
              <Box className="flex flex-row items-start justify-center gap-12">
                <Box className="flex flex-col gap-16">
                  <Box className="flex items-center justify-center w-max"><Whatshot color="primary" className="pb-0.5"/><Typography>Calories</Typography></Box>
                  <Typography variant="h5" component={"p"}>{reachedToday.calories || 0} / {dailyGoal}</Typography>
                </Box>
                <Box className="w-32">
                  <CircularProgressbar 
                    value={reachedToday.calories || 0} 
                    maxValue={dailyGoal} 
                    text={`${Math.round(((reachedToday.calories || 0) / (dailyGoal)) * 100)}%`}
                    styles={buildStyles({
                      pathColor: 'rgba(34, 197, 94)',
                      textColor: '#000',
                      trailColor: '#eee',
                    })} />
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Box className="flex items-center justify-center w-max"><LocalDining color="primary" className="pb-0.5"/><Typography>Nutrients Today</Typography></Box>
              <Grid container spacing={2} className="mt-4">
                <Grid size={10}><Typography>Fat</Typography></Grid><Grid size={2}><Typography>{reachedToday.fat || 0}g</Typography></Grid>
                <Grid size={10}><Typography>Carbohydrates</Typography></Grid><Grid size={2}><Typography>{reachedToday.carbs || 0}g</Typography></Grid>
                <Grid size={10}><Typography>Protein</Typography></Grid><Grid size={2}><Typography>{reachedToday.protein || 0}g</Typography></Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}

export default Home