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
  Grid,
  Menu,
  IconButton,
  DialogContentText
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Box from '@mui/system/Box'

// ** Custom Component Import
import Spinner from 'src/@core/components/spinner'
import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import UpdateRate from './updateRate'

// ** Types Imports
import { GetAllBrokersRate } from 'src/hooks/admin/types'

// ** Third Party Imports
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// ** Hooks
import { useGetBrokersRate, useAddBrokersRate, useDeleteBrokersRate } from 'src/hooks/admin/brokersRate'
import { useGetCurrencies } from 'src/hooks/admin/currency'
import { useGetPartnerCategory } from 'src/hooks/admin/partnerCategory'
import router from 'next/router'

interface CellType {
  row: GetAllBrokersRate
}

const RateSetup = () => {
  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
  const [showCurrencyModal, setShowCurrencyModal] = useState(false)
  const [rates, setRates] = useState<number | null>(null)
  const [showSingleRate, setShowSingleRate] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number | null>(null)

  const updateRatesSchema = yup.object().shape({
    partner_category_name: yup.string(),
    source_currency: yup.number(),
    destination_currency: yup.number(),
    rate: yup.number(),
    remark: yup.string()
  })

  //@ts-ignore
  const { mutate: deleteRate, isPending: deleteRateLoading } = useDeleteBrokersRate(idToDelete, () => setOpenDeleteModal(false)
  )

  const { data: allRates, isLoading: ratesLoading } = useGetBrokersRate()
  const { mutate: addBrokersRate, isPending: addBrokersRateLoading } = useAddBrokersRate(() =>
    setShowCurrencyModal(false)
  )
  const { data: currencies } = useGetCurrencies()
  const { data: partnerCategory } = useGetPartnerCategory()

  const defaultValues = {
    partner_category: '',
    source_currency: null,
    destination_currency: null,
    rate: null,
    remark: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(updateRatesSchema)
  })

  if (ratesLoading) {
    return <Spinner />
  }

  const onSubmit = (data: any) => {
    addBrokersRate(data)
    reset()
  }

  function renderSingleRateModal(rate: number | null) {
    setRates(rate)
    setShowSingleRate(true)
  }

  const RowOptions = ({ row }: { row: number | string }) => {
    // ** State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    const handleEdit = () => {
      // @ts-ignore
      renderSingleRateModal(row)
    }

    const handleDelete = () => {
      //@ts-ignore
      setIdToDelete(row.id)
      setOpenDeleteModal(true)
      handleRowOptionsClose()
    }

    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='tabler:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem onClick={handleEdit} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:edit' fontSize={20} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:trash' fontSize={20} />
            Delete
          </MenuItem>
        </Menu>
      </>
    )
  }

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 105,
      field: 'currency_code',
      headerName: 'Currency',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.source_currency_code}-{row?.destination_currency_code}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: 'rate',
      headerName: 'Rate',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.rate}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: 'remark',
      headerName: 'Remark',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.remark}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',

      // @ts-ignore
      renderCell: ({ row }: CellType) => <RowOptions row={row} />
    }
  ]

  function handleDelete() {
    deleteRate()
  }

  const handleShowHistories = () => {
    // Hardcoded values for appname and modelname
    const appname = 'transactions';
    const modelname = 'BrokerRate';

    // Navigate to Histories page with the specified appname and modelname
    router.push(`/histories/${appname}/${modelname}`);
  }

  return (
    <>
      <Fragment>
        <Dialog
          open={openDeleteModal}
          onClose={() => {
            setOpenDeleteModal(false)
          }}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Warning</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Confirming this will prmanently delete the selected rate. Are you sure you want to continue?
            </DialogContentText>
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button disabled={deleteRateLoading} sx={{ backgroundColor: 'red', color: 'white' }} onClick={handleDelete}>
              Confirm
            </Button>
            <Button
              onClick={() => {
                setOpenDeleteModal(false)
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
      {setShowSingleRate && (

        //@ts-ignore
        <UpdateRate rates={rates} setShowSingleRate={setShowSingleRate} showSingleRate={showSingleRate} />
      )}

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
            Add Rate
          </DialogTitle>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <DialogContent
              sx={{
                pb: theme => `${theme.spacing(8)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
              }}
            >
              <Typography variant='h6' gutterBottom sx={{ mb: 2, marginLeft: 'auto', marginRight: 'auto' }}>
                Fill in the details below to add a rate
              </Typography>
              <Grid container spacing={6} style={{ marginBottom: '25px' }}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='partner_category'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='Partner Category'
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={Boolean(errors.partner_category)}
                        helperText={Boolean(errors.partner_category)}
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
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        label='Rate'
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={Boolean(errors.rate)}
                      ></CustomTextField>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='source_currency'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='Source Currency'
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={Boolean(errors.source_currency)}
                        helperText={Boolean(errors.source_currency)}
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
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='destination_currency'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='Destination Currency'
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={Boolean(errors.destination_currency)}
                        helperText={Boolean(errors.destination_currency)}
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

                <Grid item xs={12} sm={12}>
                  <Controller
                    name='remark'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        label='Remark'
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={Boolean(errors.remark)}
                        helperText={Boolean(errors.remark)}
                      ></CustomTextField>
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
              <Button variant='contained' sx={{ mr: 2 }} disabled={addBrokersRateLoading} type='submit'>
                Add
              </Button>
              <Button variant='tonal' color='secondary' onClick={() => setShowCurrencyModal(false)}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Fragment>

      {!ratesLoading ? (
        <Card>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <CardHeader
                title='Rates'
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
                Add Rate
              </Button>
              <Button variant='outlined' onClick={handleShowHistories} sx={{ marginLeft: 4 }} >
                View History
              </Button>
            </Box>
          </Box>
          <DataGrid
            autoHeight
            pagination
            rows={allRates?.results || []}
            rowHeight={62}
            columns={columns}
            pageSizeOptions={[5, 10]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
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

export default RateSetup
