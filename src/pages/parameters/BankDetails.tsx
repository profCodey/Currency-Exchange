import React, { useState, useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CustomTextField from 'src/@core/components/mui/text-field'

// import CustomAvatar from 'src/@core/components/mui/avatar'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Switch from '@mui/material/Switch'
import DialogTitle from '@mui/material/DialogTitle'

// import Divider from '@mui/material/Divider'
import CardActions from '@mui/material/CardActions'
import MenuItem from '@mui/material/MenuItem'

import { useRouter } from 'next/router'
import { useGetBankDetails, useUpdateBank } from 'src/hooks/admin/banks'
import { useGetCurrencies } from 'src/hooks/admin/currency'

export const BankDetailsPage = ({ bankId }: { bankId: string }) => {
  const router = useRouter()
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const { data: bankDetails } = useGetBankDetails(bankId)
  const { data: currencies } = useGetCurrencies()
  const { mutate: updateBank } = useUpdateBank()
  const [selectedCurrency, setSelectedCurrency] = useState<string>()
  const [selectedName, setSelectedName] = useState<string>('')
  const [selectedCode, setSelectedCode] = useState<string>('')

  //   const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>('')
  const [selectedActive, setSelectedActive] = useState<boolean>(false)
  const [currencyList, setCurrencyList] = useState<{ id: string; code: string }[]>([])

  const handleEditClickOpen = () => {
    setSelectedName(bankDetails?.data.name as string)
    setSelectedCode(bankDetails?.data.code as string)
    setSelectedActive(bankDetails?.data.is_active as boolean)

    //   setSelectedCurrencyCode(bankDetails?.data.currency_code as string)
    const currencyObject = currencyList.find(currency => currency.id === (bankDetails?.data.currency as string))
    const initialCurrency = currencyObject ? currencyObject.code : ''
    setSelectedCurrency(initialCurrency)
    setOpenEdit(true)
  }
  const handleEditClose = () => setOpenEdit(false)
  const handleClose = () => router.push('/parameters/bank-list')

  useEffect(() => {
    if (currencies) {
      setCurrencyList(currencies)
    }
  }, [currencies])

  const handleUpdateBankDetails = useCallback(async () => {
    try {
      const selectedCurrencyObject = currencyList.find(currency => currency.code === selectedCurrency)
      const currency = selectedCurrencyObject?.id

      await updateBank({
        id: bankId,
        data: { currency, name: selectedName, code: selectedCode, is_active: selectedActive }
      })
      handleEditClose()
    } catch (error) {
      console.error(error)
    }
  }, [currencyList, updateBank, bankId, selectedName, selectedCode, selectedActive, selectedCurrency])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pb: 4 }}>
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
              Bank Details
            </Typography>
            <Box sx={{ pt: 4 }}>
              {/* <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>Id:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{bankDetails?.data.id}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                  Currency Id:
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{bankDetails?.data.currency}</Typography>
              </Box> */}
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                  Currency Code:
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{bankDetails?.data.currency_code}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>Bank Name:</Typography>
                <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                  {bankDetails?.data.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>Bank Code:</Typography>
                <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                  {bankDetails?.data.code}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>Active:</Typography>
                <Typography sx={{ color: 'text.secondary' }}> {bankDetails?.data.is_active ? 'yes' : 'no'}</Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
              Edit
            </Button>
            <Button color='error' variant='tonal' onClick={handleClose}>
              Close
            </Button>
          </CardActions>
          <Dialog
            open={openEdit}
            onClose={handleEditClose}
            aria-labelledby='user-view-edit'
            aria-describedby='user-view-edit-description'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
          >
            <DialogTitle
              id='bank-details-edit'
              sx={{
                textAlign: 'center',
                fontSize: '1.5rem !important',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              Edit Bank Information
            </DialogTitle>
            <DialogContent
              sx={{
                pb: theme => `${theme.spacing(8)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
              }}
            >
              <form>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      select
                      fullWidth
                      label='Currency'
                      value={selectedCurrency}
                      onChange={e => setSelectedCurrency(e.target.value as string)}
                    >
                      {currencyList.map(currency => (
                        <MenuItem key={currency.id} value={currency.code}>
                          {currency.code}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      label='Bank Name'
                      placeholder='Bank Name'
                      value={selectedName}
                      onChange={e => setSelectedName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      label='Bank Code'
                      placeholder='Bank Code'
                      value={selectedCode}
                      onChange={e => setSelectedCode(e.target.value)}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      label='Currency Code'
                      placeholder='Currency Code'
                      value={selectedCurrencyCode}
                      onChange={e => setSelectedCurrencyCode(e.target.value)}
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Active:</Typography>
                    <Switch
                      checked={selectedActive}
                      onChange={() => setSelectedActive(!selectedActive)}
                      color='primary'
                    />
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions
              sx={{
                justifyContent: 'center',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleUpdateBankDetails}>
                Submit
              </Button>
              <Button variant='tonal' color='secondary' onClick={handleEditClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      </Grid>
    </Grid>
  )
}
