// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  // ** Hook

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
                    <svg width='40' height='40' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M13.8672 3.99764H50.4547C72.6806 3.64244 82.1405 16.1119 82.1385 32.5394C82.1357 59.3772 59.1177 61.2069 50.4547 61.0802H29.8349V92.0104H13.8672V3.99764ZM29.8349 28.0063V18.7077H49.4486C58.9123 18.7077 63.6442 21.5464 64.9978 28.0063H29.8339H29.8349ZM29.8349 37.3221C31.2518 43.6802 35.9837 46.6207 45.3331 46.6207H64.9478V37.3221H29.8349Z'
              fill='#00B0F0'
            />
          </svg>
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
