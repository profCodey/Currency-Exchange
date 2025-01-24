// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Components
import {
  Typography,
  Card,
  CardHeader,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Grid
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Box from '@mui/system/Box'

// ** Custom Component Import
import Spinner from 'src/@core/components/spinner'
import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Types Imports
import { Currency } from 'src/pages/transactions/transaction-list/types'
import { updateCurrencySchema } from '../types'

// ** Third Party Imports
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorItem } from 'src/context/types';

// ** Hooks
import { useGetCurrencies } from 'src/hooks/admin/currency'
import { useCreateCurrency } from 'src/hooks/admin/currency'

//** Next Imports
import router from 'next/router'
import toast, { Toaster } from 'react-hot-toast';


interface CellType {
  row: Currency
}

const columns: GridColDef[] = [
  {
    flex: 0.1,
    minWidth: 290,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.name}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 105,
    field: 'code',
    headerName: 'Code',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.code}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 105,
    field: 'symbol',
    headerName: 'Symbol',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.symbol}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 105,
    field: 'is_source_currency',
    headerName: 'Source Currency',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.is_source_currency ? 'true' : 'false'}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 105,
    field: 'is_destination_currency',
    headerName: 'Destination Currency',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.is_destination_currency ? 'true' : 'false'}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 260,
    field: 'is_active',
    headerName: 'Active Status',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.is_active ? 'true' : 'false'}</Typography>
    )
  }
]

const Currencies = () => {
  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [showCurrencyModal, setShowCurrencyModal] = useState(false)

  const defaultFormValues = {
    code: '',
    name: '',
    symbol: '',
    is_source_currency: '',
    is_destination_currency: '',
    is_active: ''
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: defaultFormValues,
    mode: 'onBlur',
    resolver: yupResolver(updateCurrencySchema)
  })

  const { mutate: updateCurrency, isPending: addCurrencyLoading, isError: addCurrencyError, error: currencyError  } = useCreateCurrency(() => setShowCurrencyModal(false), reset);

  // const [currentPage, setCurrentPage] = useState(1)
  // const transactionsPerPage = 20

  // const [dateRange, setDateRange] = useState('')
  // const [value, setValue] = useState<Date | null>(null);

  const { data: allCurrencies, isLoading: currenciesLoading } = useGetCurrencies()

  if (currenciesLoading) {
    return <Spinner />
  }

  const notify = (message:string) => toast.error(message);

  const onSubmit = (data: any) => {
    updateCurrency(data)
    if (addCurrencyError){
      //@ts-ignore
      const err:ErrorItem = currencyError?.response?.data.errors;

     //@ts-ignore
      for (const value of err) {
        notify(`${value.detail}(${value.attr})`)
      }
     }
  }

  return (
    <>
      <Fragment>
        <Dialog
          open={showCurrencyModal}
          onClose={() => setShowCurrencyModal(false)}
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
            Add Currency
            <Toaster
      position='top-right'
      toastOptions={{
        style: {
          fontSize: '14px', // Adjust the font size as needed
        },
      }}
      />
          </DialogTitle>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <DialogContent
              sx={{
                pb: theme => `${theme.spacing(8)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
              }}
            >
              <Typography variant='h6' gutterBottom sx={{ mb: 2, marginLeft: 'auto', marginRight: 'auto' }}>
                Fill in the details of the currency you want to add
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
                      />
                    )}
                  />
                </Grid>
              </Grid>
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
              <Button variant='contained' sx={{ mr: 2 }} disabled={addCurrencyLoading} type='submit'>
                Submit
              </Button>
              <Button variant='tonal' color='secondary' onClick={() => setShowCurrencyModal(false)}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Fragment>

      {!currenciesLoading ? (
        <Card>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <CardHeader
                title='Currencies'
                titleTypographyProps={{ sx: { mb: [2, 0] } }}
                sx={{
                  py: 4,
                  flexDirection: ['column', 'row'],
                  '& .MuiCardHeader-action': { m: 0 },
                  alignItems: ['flex-start', 'center']
                }}
              />
            </Box>
            <Box sx={{ marginRight: 6 }}>
              <Button
                onClick={() => setShowCurrencyModal(true)}
                variant='contained'
                endIcon={<Icon icon='fluent:album-add-20-regular' />}
              >
                Add Currency
              </Button>
            </Box>
          </Box>
          <DataGrid
            autoHeight
            pagination
            rows={allCurrencies || []}
            rowHeight={62}
            columns={columns}
            pageSizeOptions={[10, 20]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            onRowClick={params => {
              router.push(`/parameters/currencies/currency-details/${params.row.id}`)
            }}
            sx={{
              cursor: 'pointer',
              paddingRight: '0px'
            }}
          />
        </Card>
      ) : null}
    </>
  )
}

export default Currencies
