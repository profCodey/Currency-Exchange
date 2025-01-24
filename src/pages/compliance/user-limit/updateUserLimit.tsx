import { yupResolver } from '@hookform/resolvers/yup'
import { Dialog, DialogTitle, DialogContent, Typography, Grid, DialogActions, Button, MenuItem } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { useUpdateUserLimit } from 'src/hooks/admin/userLimit'
import * as yup from 'yup'
import { useGetCurrencies } from 'src/hooks/admin/currency'
import { GetAllUserLimit } from 'src/hooks/admin/types'
import  toast, {Toaster} from 'react-hot-toast'
import { GetAllCurrencies } from 'src/hooks/admin/types'

interface UpdateUserLimitProps {
  userLimit: GetAllUserLimit
  setShowSingleUserLimit: Dispatch<SetStateAction<boolean>>
  showSingleUserLimit: boolean
}

const UpdateUserLimit = ({
  userLimit,
  setShowSingleUserLimit,
  showSingleUserLimit
}: UpdateUserLimitProps) => {
  //@ts-ignore
  const { mutate: updateUserLimit, isPending: updateUserLimitLoading,  isError : updateUserLimitError, error: userLimitError } = useUpdateUserLimit(
    userLimit?.id as unknown as string,
    () => setShowSingleUserLimit(false)
  )

  const { data: currencies, isLoading: currenciesLoading } = useGetCurrencies()

  const notify = (message:string) => toast.error(message);
  const onSubmit = (data: any) => {
    updateUserLimit(data)
    if (updateUserLimitError) {
      //@ts-ignore
      const err:ErrorItem = userLimitError?.response?.data.errors;
      
      //@ts-ignore
       for (const value of err) {
        notify(`${value.detail}(${value.attr})`)
    }
  }
  }
  const updateUserLimitSchema = yup.object().shape({
    currency: yup.string(),
    daily_limit: yup.string(),
    weekly_limit: yup.string(),
    monthly_limit: yup.string(),
    user: yup.string(),
  })

  const defaultFormValues = React.useMemo(
    () => ({
      currency: userLimit?.currency,
      daily_limit: userLimit?.daily_limit,
      weekly_limit: userLimit?.weekly_limit,
      monthly_limit: userLimit?.monthly_limit,
      user: userLimit?.user
    }),
    [userLimit]
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormValues,
    mode: 'onBlur',
    resolver: yupResolver(updateUserLimitSchema)
  })

  return (
    <>
      <Dialog
        open={showSingleUserLimit}
        onClose={() => setShowSingleUserLimit(false)}
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
          Update User Limit
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
              Fill in the details of the user limit you want to update
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
                          value={field.value || userLimit?.currency || ''}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={Boolean(errors.currency)}
                        >
                          {currencies?.map((currency: GetAllCurrencies) => (
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
                      value={field.value || userLimit?.daily_limit || ''}
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
                      value={field.value || userLimit?.weekly_limit || ''}
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
                      label='Monthly Limit'
                      value={field.value || userLimit?.monthly_limit || ''}
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
            <Button variant='contained' sx={{ mr: 2 }} disabled={updateUserLimitLoading} type='submit'>
              Update
            </Button>
            <Button variant='tonal' color='secondary' onClick={() => setShowSingleUserLimit(false)}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default UpdateUserLimit
