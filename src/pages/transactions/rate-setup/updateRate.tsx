import { yupResolver } from '@hookform/resolvers/yup'
import { Dialog, DialogTitle, DialogContent, Typography, Grid, DialogActions, Button, MenuItem } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { useUpdateBrokersRate } from 'src/hooks/admin/brokersRate'
import * as yup from 'yup'
import { useGetCurrencies } from 'src/hooks/admin/currency'
import { useGetPartnerCategory } from 'src/hooks/admin/partnerCategory'
import { GetAllBrokersRate } from 'src/hooks/admin/types'

interface RateProps {
  rates: GetAllBrokersRate
  setShowSingleRate: Dispatch<SetStateAction<boolean>>
  showSingleRate: boolean
}

const UpdateRate = ({ rates, setShowSingleRate, showSingleRate }: RateProps) => {
  //@ts-ignore
  const { mutate: updateCurrency, isPending: updateCurrencyLoading } = useUpdateBrokersRate(
    rates?.id as unknown as string,
    () => setShowSingleRate(false)
  )

  const { data: partnerCategory } = useGetPartnerCategory()

  const { data: currencies, isLoading: currenciesLoading } = useGetCurrencies()

  const onSubmit = (data: any) => {
    updateCurrency(data)
  }

  const updateRatesSchema = yup.object().shape({
    partner_category: yup.string().required('partner category is required'),
    source_currency: yup.string().required('source currency is required'),
    destination_currency: yup.string().required('destination currency is required'),
    rate: yup.number().required('rate is required'),
    remark: yup.string().required('remark is required')
  })

  const defaultFormValues = React.useMemo(
    () => ({
      partner_category: rates?.partner_category,
      source_currency: rates?.source_currency,
      destination_currency: rates?.destination_currency,
      rate: rates?.rate,
      remark: rates?.remark
    }),
    [rates]
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: defaultFormValues,
    mode: 'onBlur',
    resolver: yupResolver(updateRatesSchema)
  })
  React.useEffect(() => {
    // Reset the form when the rates prop changes
    reset(defaultFormValues)
  }, [reset, defaultFormValues])

  return (
    <>
      <Dialog
        open={showSingleRate}
        onClose={() => setShowSingleRate(false)}
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
          Update Rate
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <Typography variant='h6' gutterBottom sx={{ mb: 2, marginLeft: 'auto', marginRight: 'auto' }}>
              Fill in the details of the rates you want to update
            </Typography>
            <Grid container spacing={6} style={{ marginBottom: '25px' }}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='partner_category'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      fullWidth
                      select
                      label='Partner Category'
                      value={field.value || rates?.partner_category || ''}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={Boolean(errors.partner_category)}
                    >
                      {partnerCategory?.map(partnerCategory => (
                        <MenuItem key={partnerCategory.id} value={partnerCategory.id}>
                          {partnerCategory.label}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='rate'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      fullWidth
                      label='Rate'
                      value={field.value || rates?.rate || ''}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={Boolean(errors.rate)}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={6}>
              {!currenciesLoading && (
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='source_currency'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='Source Currency'
                        value={field.value || rates?.source_currency || ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={Boolean(errors.source_currency)}
                      >
                        {/* <MenuItem value={rates.source_currency}>
                        <em>All Currencies</em>
                      </MenuItem> */}
                        {currencies?.map(currency => (
                          <MenuItem key={currency.id} value={currency.id}>
                            {currency.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>
              )}
              {!currenciesLoading && (
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='destination_currency'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='Destination Currency'
                        value={field.value || rates?.destination_currency || ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={Boolean(errors.destination_currency)}
                      >
                        {currencies?.map(currency => (
                          <MenuItem key={currency.id} value={currency.id}>
                            {currency.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>
              )}

              <Grid item xs={12} sm={12}>
                <Controller
                  name='remark'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      fullWidth
                      label='Remark'
                      value={field.value || rates?.remark || ''}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={Boolean(errors.remark)}
                    />
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
              Update
            </Button>
            <Button variant='tonal' color='secondary' onClick={() => setShowSingleRate(false)}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default UpdateRate
