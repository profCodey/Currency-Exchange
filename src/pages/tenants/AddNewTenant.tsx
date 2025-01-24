// Import necessary dependencies
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import CustomTextField from 'src/@core/components/mui/text-field'
import { CardActions, MenuItem } from '@mui/material'
import * as yup from 'yup'
import { useCreateNewTenant } from 'src/hooks/admin/tenants'
import toast from 'react-hot-toast'


// import { useCurrencyOptions } from 'src/hooks/currencies'

// import DialogAlert from 'src/views/apps/user/view/NewTenantDialog'

// Define the AddNewTenantForm component

const newTenantSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  company_full_name: yup.string().required('Company Full Name is required'),
  company_short_name: yup.string().required('Company Short Name is required'),
  company_address: yup.string().required('Company Address is required'),
  default_fee_type: yup.string().required('Default Fee Type is required'),
  source_currencies: yup.array().of(yup.string()).required('Source Currencies is required'),
  destination_currencies: yup.array().of(yup.string()).required('Destination Currencies is required'),
  theme_id: yup.number().required('Theme ID is required'),
  user: yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    first_name: yup.string().required('First Name is required'),
    last_name: yup.string().required('Last Name is required')
  }),
  profile: yup.object().shape({
    category: yup.string().required('Profile Category is required')
  }),
  address: yup.object().shape({
    building_number: yup.string().required('Building Number is required'),
    street_name: yup.string().required('Street Name is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required'),
    country_code: yup.string().max(4, 'Country Code must not exceed 4 characters').required('Country Code is required'),
    postcode: yup.string().required('Postcode is required'),
    full_address: yup.string().required('Full Address is required')
  })
})

const defaultValues = {
  name: '',
  company_full_name: '',
  company_short_name: '',
  company_address: '',
  default_fee_type: '',
  source_currencies: [1],
  destination_currencies: [2],
  theme_id: 1,
  user: {
    email: '',
    first_name: '',
    last_name: ''
  },
  profile: {
    category: 1
  },
  address: {
    building_number: '',
    street_name: '',
    city: '',
    state: '',
    country: '',
    country_code: '',
    postcode: '',
    full_address: ''
  }
}
const AddNewTenant = () => {
  // State to hold form data

  // const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)
  // const openCreateModal = () => {
  //   setCreateModalOpen(true)
  // }

  const { mutate: createNewTenant } = useCreateNewTenant()

  // const { data: currencyOptions } = useCurrencyOptions()

  // Function to handle form submission

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(newTenantSchema)
  })

  const onSubmit = (data: any) => {
    // openCreateModal()

    handleConfirm(data)
  }

  const handleConfirm = async (data: any) => {
    try {
      await createNewTenant(data);

      // The navigation is handled in the onSuccess callback of useCreateNewTenant

    } catch (error) {
      console.error('Error creating tenant', error);
      toast.error('Error creating tenant')
    }
  }
  

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' sx={{ mb: 2 }}>
          Add New Tenant
        </Typography>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='h6' gutterBottom sx={{ mb: 2 }}>
            Basic details section
          </Typography>
          <Grid container spacing={6}>
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
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='user.email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Email'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors?.user?.email)}
                    helperText={errors.user?.email?.message ?? ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='user.first_name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='User First Name'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors?.user?.first_name)}
                    helperText={errors.user?.first_name?.message ?? ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='user.last_name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='User Last Name'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors?.user?.last_name)}
                    helperText={errors.user?.last_name?.message ?? ''}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Typography variant='h6' gutterBottom sx={{ mt: 4, mb: 2 }}>
            Business details section
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='company_full_name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Company Full Name'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.company_full_name)}
                    helperText={errors.company_full_name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='company_short_name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Company Short Name'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.company_short_name)}
                    helperText={errors.company_short_name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='company_address'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Company Address'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.company_address)}
                    helperText={errors.company_address?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='default_fee_type'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Default Fee Type'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.default_fee_type)}
                    helperText={errors.default_fee_type?.message}
                  >
                    <MenuItem value='without_fee'>Without Fee</MenuItem>
                    <MenuItem value='with_fee'>With Fee</MenuItem>
                  </CustomTextField>
                )}
              />
              {/* <Controller
                name='source_currencies'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Source Currencies'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.source_currencies)}
                    helperText={errors.source_currencies?.message}
                  >
                    {currencyOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                  </CustomTextField>
                )}
              /> */}
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <Controller 
              name='source_currencies'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <CustomTextField
                fullWidth
                label='Source Currencies'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={Boolean(errors.source_currencies)}
                helperText={errors.source_currencies?.message}
                />
              )}
              />
              
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
              name='destination_currencies'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <CustomTextField
                fullWidth
                label='Destination Currencies'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={Boolean(errors.destination_currencies)}
                helperText={errors.destination_currencies?.message}
                />
              )}
              />
              
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
              name='theme_id'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <CustomTextField
                fullWidth
                label='Theme ID'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={Boolean(errors.theme_id)}
                helperText={errors.theme_id?.message}
                />
              )}
              />

            </Grid> 
            */}

            {/* <Grid item xs={12} sm={6}>
              <Controller
              name='profile.category'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <CustomTextField
                fullWidth
                label='Profile Category'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={Boolean(errors.profile?.category)}
                helperText={errors.profile?.category?.message}
                />
              )}
              />
            </Grid> */}
          </Grid>
          <Typography variant='h6' gutterBottom sx={{ mt: 4, mb: 2 }}>
            Address section
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='address.building_number'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Building Number'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.address?.building_number)}
                    helperText={errors.address?.building_number?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='address.street_name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Street Name'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.address?.street_name)}
                    helperText={errors.address?.street_name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='address.city'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='City'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.address?.city)}
                    helperText={errors.address?.city?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='address.state'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='State'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.address?.state)}
                    helperText={errors.address?.state?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='address.country'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Country'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.address?.country)}
                    helperText={errors.address?.country?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='address.country_code'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Country Code'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.address?.country_code)}
                    helperText={errors.address?.country_code?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='address.postcode'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Postcode'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.address?.postcode)}
                    helperText={errors.address?.postcode?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='address.full_address'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Full Address'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.address?.full_address)}
                    helperText={errors.address?.full_address?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button fullWidth type='submit' variant='contained'>
              Add Tenant
            </Button>
          </CardActions>
        </form>
      </CardContent>

      {/* <DialogAlert open={createModalOpen} setOpen={setCreateModalOpen} onConfirm={handleConfirm}/> */}
    </Card>
  )
}

export default AddNewTenant
