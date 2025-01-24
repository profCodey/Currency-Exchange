// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'


// ** Types
import { TransactionRecipient } from '../types'
import { formatCurrency } from 'src/@core/utils/format'

  interface RecipientsProps {
    recipients: TransactionRecipient;
  }

  const Recipients = ({ recipients }: RecipientsProps) => {

  return (
    <Grid container spacing={6}>
      {recipients &&
        Array.isArray(recipients) &&
        recipients.map((recipient) => {
          return (
            <Grid key={recipient?.id} item xs={12} md={6} lg={4}>
              <Card>
                <CardContent>
                <Box sx={{ mb: 6 }}>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Recipients Details
              </Typography>
            </Box>
            { recipient.bank_name &&    <Box
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 3 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary',  width: 200}}>
              Bank Name:
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {recipient.bank_name}
            </Typography>
          </Box>
        </Box>}

       {recipient.account_number && <Box
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 3 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary',  width: 200 }}>
              Account Number:
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            {recipient.account_number}
            </Typography>
          </Box>
        </Box> }

     { recipient.account_name &&   <Box
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 3 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary',  width: 200 }}>
              Account Name:
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            {recipient.account_name}
            </Typography>
          </Box>
        </Box>}

      {recipient.email &&  <Box
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 3 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary',  width: 200 }}>
              Email:
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            {recipient.email}
            </Typography>
          </Box>
        </Box>}

        {recipient.sortcode && <Box
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 3 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary',  width: 200 }}>
              Sort Code:
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            {recipient.sortcode}
            </Typography>
          </Box>
        </Box>}

       {recipient.amount && <Box
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 3 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary',  width: 200 }}>
            Amount:
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            {formatCurrency(recipient.amount)}
            </Typography>
          </Box>
        </Box>}

       {recipient.purpose_of_transaction && <Box
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 3 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary',  width: 200 }}>
            Purpose of Transaction:
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            {recipient.purpose_of_transaction}
            </Typography>
          </Box>
        </Box>}

       {recipient.status && <Box
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 3 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary',  width: 200 }}>
            Status:
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            {recipient.status}
            </Typography>
          </Box>
        </Box>}

       {recipient.save_beneficiary && <Box
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 3 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary',  width: 200 }}>
            Save Beneficiary:
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            {recipient.save_beneficiary}
            </Typography>
          </Box>
        </Box>}

                </CardContent>
              </Card>
            </Grid>

          )
        })}
    </Grid>
  )
}

export default Recipients
