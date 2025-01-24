import { yupResolver } from '@hookform/resolvers/yup'
import { Dialog, DialogTitle, DialogContent, Typography, Grid, DialogActions, Button, MenuItem } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { useUpdateGlobalLimit } from 'src/hooks/admin/globalLimit'
import * as yup from 'yup'
import { useGetCurrencies } from 'src/hooks/admin/currency'
import { GetAllGlobalLimit } from 'src/hooks/admin/types'
import  toast, {Toaster} from 'react-hot-toast'
import { GetAllCurrencies } from 'src/hooks/admin/types'

interface UpdateGlobalLimitProps {
  globalLimit: GetAllGlobalLimit
  setShowSingleGlobalLimit: Dispatch<SetStateAction<boolean>>
  showSingleGlobalLimit: boolean
}

const UpdateGlobalLimit = ({
  globalLimit,
  setShowSingleGlobalLimit,
  showSingleGlobalLimit
}: UpdateGlobalLimitProps) => {

  //@ts-ignore
  const { mutate: updateGlobalLimit, isPending: updateGlobalLimitLoading, isError : updateGlobalLimitError, error: globalLimitError } = useUpdateGlobalLimit(
    globalLimit?.id as unknown as string,
    () => setShowSingleGlobalLimit(false)
  )

  const { data: currencies, isLoading: currenciesLoading } = useGetCurrencies()

  const notify = (message:string) => toast.error(message);
  const onSubmit = (data: any) => {
    updateGlobalLimit(data)
    if (updateGlobalLimitError) {
    //@ts-ignore
    const err:ErrorItem = globalLimitError?.response?.data.errors;

    //@ts-ignore
     for (const value of err) {
      notify(`${value.detail}(${value.attr})`)
  }
}
  }

  const updateGlobalLimitSchema = yup.object().shape({
    currency: yup.string(),
    daily_limit: yup.string(),
    weekly_limit: yup.string(),
    monthly_limit: yup.string()
  })

  const defaultFormValues = React.useMemo(
    () => ({
      currency: globalLimit?.currency,
      daily_limit: globalLimit?.daily_limit,
      weekly_limit: globalLimit?.weekly_limit,
      monthly_limit: globalLimit?.monthly_limit
    }),
    [globalLimit]
  )

  const {
    control,
    handleSubmit,
    formState: { errors }  } = useForm({
    defaultValues: defaultFormValues,
    mode: 'onBlur',
    resolver: yupResolver(updateGlobalLimitSchema)
  })

  return (
    <>
      <Dialog
        open={showSingleGlobalLimit}
        onClose={() => setShowSingleGlobalLimit(false)}
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
          Update Global Limit

        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
      <Toaster
            position="top-right"
        />
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <Typography variant='h6' gutterBottom sx={{ mb: 2, marginLeft: 'auto', marginRight: 'auto' }}>
              Fill in the details of the global limit you want to update
            </Typography>
            <Grid container spacing={6} style={{ marginBottom: '25px' }}>
                {!currenciesLoading && (
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='currency'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CustomTextField
                          select
                          fullWidth
                          label='Currency'
                          value={field.value || globalLimit?.currency || ''}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={Boolean(errors.currency)}
                        >
                          {currencies?.map((currency:GetAllCurrencies) => (
                            <MenuItem key={currency.id} value={currency.id}>
                              {currency.name}
                            </MenuItem>
                          ))}
                        </CustomTextField>
                      )}
                    />
                  </Grid>
                )}
              <Grid item xs={12} sm={6}>
                <Controller
                  name='daily_limit'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      fullWidth
                      label='Daily limit'
                      value={field.value || globalLimit?.daily_limit || ''}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={Boolean(errors.daily_limit)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='weekly_limit'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      fullWidth
                      label='Weekly limit'
                      value={field.value || globalLimit?.weekly_limit || ''}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={Boolean(errors.weekly_limit)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='monthly_limit'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      fullWidth
                      label='Monthly limit'
                      value={field.value || globalLimit?.monthly_limit || ''}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={Boolean(errors.monthly_limit)}
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
            <Button variant='contained' sx={{ mr: 2 }} disabled={updateGlobalLimitLoading} type='submit'>
              Update
            </Button>
            <Button variant='tonal' color='secondary' onClick={() => setShowSingleGlobalLimit(false)}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default UpdateGlobalLimit
