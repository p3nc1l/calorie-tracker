import { Box, Stepper, Step, StepLabel } from "@mui/material"

const PageStepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <Box className="h-max w-full max-w-3xl py-8 px-2 mx-auto">
      <Stepper activeStep={currentStep}>
        <Step>
          <StepLabel>Attention</StepLabel>
        </Step>
        <Step>
          <StepLabel>Nickname</StepLabel>
        </Step>
        <Step>
          <StepLabel>Daily Goal</StepLabel>
        </Step>
      </Stepper>
    </Box>
  )
}

export default PageStepper