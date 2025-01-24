// ** MUI Components
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// ** Types
import { SingleTransactions } from '../types'

// ** Helper Function
import { formatTimestamp, formatCurrency } from 'src/@core/utils/format'

interface SingleTransactionProps {
  singleTransaction: SingleTransactions
}

export const SingleTransaction = ({ singleTransaction }: SingleTransactionProps) => {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pb: 4 }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Transaction Details
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                     Sender Name:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{singleTransaction?.data.sender_name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                    Tenant Name:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{singleTransaction?.data.tenant_name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                    Source Amount:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {singleTransaction?.data.source_currency.symbol}
                    {formatCurrency(singleTransaction?.data.source_amount)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                    Destination Amount:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {singleTransaction?.data.destination_currency.symbol}
                    {formatCurrency(singleTransaction?.data.total_recipient_amount)}
                  </Typography>
                </Box>               
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                    Partner's Rate:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {formatCurrency(singleTransaction?.data.partner_rate)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                    Broker's Rate:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {formatCurrency(singleTransaction?.data.broker_rate)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                    Currency:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {singleTransaction?.data.source_currency.code}-{singleTransaction?.data.destination_currency.code}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>Status:</Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                    {singleTransaction?.data.status}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                    Fee Type:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                    {singleTransaction?.data.fee_type}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>Fee:</Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                    {formatCurrency(singleTransaction?.data.fee)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                    Reference:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                    {singleTransaction?.data.reference}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                    Transaction Type:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                    {singleTransaction?.data.transaction_type}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                    Created On:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                    {formatTimestamp(singleTransaction?.data.created_on)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                    Updated On:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                    {formatTimestamp(singleTransaction?.data.updated_on)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                    Payment Method:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{singleTransaction?.data.payment_method}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                    Proof of Payment:
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{singleTransaction?.data.proof_of_payment}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
export default SingleTransaction
