import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CustomTextField from 'src/@core/components/mui/text-field'

import { CardActions, MenuItem, DialogTitle, DialogContent, DialogActions, Dialog, Button } from '@mui/material'

// import Divider from '@mui/material/Divider'
import { useGetCurrencyDetails } from 'src/hooks/admin/currency'
import { useRouter } from 'next/router'
import { useUpdateCurrency } from 'src/hooks/admin/currency'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

//** Types
import { updateCurrencySchema } from '../types'

//** Third Party Imports
import toast, { Toaster } from 'react-hot-toast'

export const CurrencyDetailsPage = ({ currencyId }: { currencyId: string }) => {
  const router = useRouter()
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  // ** Hooks

  const handleEditClickOpen = () => {
    setOpenEdit(true)
  }
  const { data: currencyDetails, isLoading: currencyDetailsLoading } = useGetCurrencyDetails(currencyId)

  const defaultFormValues = {
    code: currencyDetails?.code,
    name: currencyDetails?.name,
    symbol: currencyDetails?.symbol,
    is_source_currency: currencyDetails?.is_source_currency,
    is_destination_currency: currencyDetails?.is_destination_currency,
    is_active: currencyDetails?.is_active
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: defaultFormValues,
    mode: 'onBlur',
    resolver: yupResolver(updateCurrencySchema)
  })

  const {
    mutate: updateCurrency,
    isPending: updateCurrencyLoading,
    isError: updateCurrencyError,
    error: currencyError
  } = useUpdateCurrency(currencyDetails?.id as unknown as string, () => setOpenEdit(false))

  const notify = (message: string) => toast.error(message)
  const onSubmit = (data: any) => {
    updateCurrency(data)
    if (updateCurrencyError) {
      //@ts-ignore
      const err: ErrorItem = currencyError?.response?.data.errors

      //@ts-ignore
      for (const value of err) {
        notify(`${value.detail}(${value.attr})`)
      }
    }
  }

  const handleEditClose = () => setOpenEdit(false)
  const handleClose = () => router.push('/parameters/currencies/')

  return (
    <>
      {!currencyDetailsLoading ? (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ pb: 4 }}>
                <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                  Currency Details
                </Typography>
                <Box sx={{ pt: 4 }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>Name:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{currencyDetails?.name}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>Code:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{currencyDetails?.code}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                      Symbol:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{currencyDetails?.symbol}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                      Source Currency:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {currencyDetails?.is_source_currency ? 'true' : 'false'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                      Destination Currency:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {currencyDetails?.is_destination_currency ? 'true' : 'false'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                      Active Status:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {currencyDetails?.is_active ? 'true' : 'false'}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                  Update
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
                  id='user-view-edit'
                  sx={{
                    textAlign: 'center',
                    fontSize: '1.5rem !important',
                    px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                    pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                  }}
                >
                  Update Currency Information
                </DialogTitle>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <Toaster position='top-right' />
                  <DialogContent
                    sx={{
                      pb: theme => `${theme.spacing(8)} !important`,
                      px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                    }}
                  >
                    <Typography variant='h6' gutterBottom sx={{ mb: 2 }}>
                      {/* Basic details section */}
                    </Typography>
                    <Grid container spacing={6} style={{ marginBottom: '25px' }}>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name='name'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                              fullWidth
                              label='Name'
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              error={Boolean(errors.name)}
                              
                              // helperText={errors?.name}
                              defaultValue={currencyDetails?.name}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name='code'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                              fullWidth
                              label='Code'
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              error={Boolean(errors?.code)}
                              defaultValue={currencyDetails?.code}

                              // helperText={errors?.code}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                    {/* <Typography variant='h6' gutterBottom sx={{ mt: 4, mb: 2 }}>
            Business details section
          </Typography> */}
                    <Grid container spacing={6}>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name='symbol'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                              fullWidth
                              label='Symbol'
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              error={Boolean(errors.symbol)}
                              defaultValue={currencyDetails?.symbol}

                              // helperText={errors.symbol}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name='is_source_currency'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                              select
                              fullWidth
                              label='Source Currency Status'
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              error={Boolean(errors.is_source_currency)}
                              defaultValue={currencyDetails?.is_source_currency}

                              // helperText={errors.is_source_currency}
                            >
                              <MenuItem value='true'>True</MenuItem>
                              <MenuItem value='false'>False</MenuItem>
                            </CustomTextField>
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name='is_destination_currency'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                              select
                              fullWidth
                              label='Destination Currency Status'
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              error={Boolean(errors.is_source_currency)}
                              defaultValue={currencyDetails?.is_destination_currency}

                              // helperText={errors.is_source_currency}
                            >
                              <MenuItem value='true'>True</MenuItem>
                              <MenuItem value='false'>False</MenuItem>
                            </CustomTextField>
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name='is_active'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                              select
                              fullWidth
                              label='Active Status'
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              error={Boolean(errors.is_active)}
                              defaultValue={currencyDetails?.is_active}

                              // helperText={errors.is_source_currency}
                            >
                              <MenuItem value='true'>True</MenuItem>
                              <MenuItem value='false'>False</MenuItem>
                            </CustomTextField>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions
                    sx={{
                      justifyContent: 'center',
                      px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                      pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                  >
                    <Button variant='contained' sx={{ mr: 2 }} disabled={updateCurrencyLoading} type='submit'>
                      Submit
                    </Button>
                    <Button variant='tonal' color='secondary' onClick={handleEditClose}>
                      Cancel
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </Card>
          </Grid>
        </Grid>
      ) : null}
    </>
  )
}
export default CurrencyDetailsPage
