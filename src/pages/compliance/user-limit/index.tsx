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
import UpdateUserLimit from './updateUserLimit'

// ** Types Imports
import { GetAllUserLimit, GetAllCurrencies } from 'src/hooks/admin/types';
import { ErrorItem } from 'src/context/types'

// ** Third Party Imports
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

// ** Hooks
import { useGetUserLimit, useAddUserLimit, useDeleteUserLimit } from 'src/hooks/admin/userLimit'
import { useGetCurrencies } from 'src/hooks/admin/currency'
import router from 'next/router';
import { formatCurrency } from 'src/@core/utils/format'

//** Helper Functions
import { getCurrencyNameById } from 'src/@core/utils/format'

interface CellType {
  row: GetAllUserLimit
}

const UserLimitSetup = () => {
  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
  const [showUserLimitModal, setUserLimitModal] = useState(false)
  const [userLimit, setUserLimit] = useState<number | null>(null)
  const [showSingleUserLimit, setShowSingleUserLimit] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number | null>(null)

  const updateUserLimitSchema = yup.object().shape({
    currency: yup.string(),
    daily_limit: yup.string(),
    weekly_limit: yup.string(),
    monthly_limit: yup.string(),
    user: yup.string(),
    email: yup.string()
  })

  //@ts-ignore
  const { mutate: deletUserLimit, isPending: deletUserLimitLoading } = useDeleteUserLimit(idToDelete, () =>
    setOpenDeleteModal(false)
  )

  const defaultValues = {
    currency: '',
    daily_limit: '',
    weekly_limit: '',
    monthly_limit: '',
    user: '',
    email: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(updateUserLimitSchema)
  })
  
  const { data: allUserLimit, isLoading: userLimitLoading } = useGetUserLimit()
  const { mutate: addUserLimit, isPending: addUserLimitLoading, isError:addUserLimitError, error: userLimitError } = useAddUserLimit(() =>
    setUserLimitModal(false), reset
  )
  const { data: currencies } = useGetCurrencies()



  if (userLimitLoading) {
    return <Spinner />
  }

  const notify = (message:string) => toast.error(message);
  const onSubmit = (data: any) => {
    addUserLimit(data)
    if (addUserLimitError){
      //@ts-ignore
      const err:ErrorItem = userLimitError?.response?.data.errors;

     //@ts-ignore
      for (const value of err) {
        notify(`${value.detail}(${value.attr})`)
      }
     }
  }

  function renderSingleUserLimitModal(rate: number | null) {
    setUserLimit(rate)
    setShowSingleUserLimit(true)
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
      renderSingleUserLimitModal(row)
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
      field: 'email',
      headerName: 'Email',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.email}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: 'currency',
      headerName: 'Currency',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{getCurrencyNameById(row?.currency, currencies)}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: 'daily_limit',
      headerName: 'Daily Limit',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{formatCurrency(row?.daily_limit)}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: 'weekly_limit',
      headerName: 'Weekly Limit',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{formatCurrency(row?.weekly_limit)}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: 'monthly_limit',
      headerName: 'Monthly Limit',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{formatCurrency(row?.monthly_limit)}</Typography>
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
    deletUserLimit()
  }

  const handleShowHistories = () => {
    // Hardcoded values for appname and modelname
    const appname = 'transactions'
    const modelname = 'UserLimit'

    // Navigate to Histories page with the specified appname and modelname
    router.push(`/histories/${appname}/${modelname}`)
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
              Confirming this will prmanently delete the selected User Limit. Are you sure you want to continue?
            </DialogContentText>
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button
              disabled={deletUserLimitLoading}
              sx={{color: 'red' }}
              onClick={handleDelete}
            >
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
      {setShowSingleUserLimit && (
        <UpdateUserLimit

          //@ts-ignore
          userLimit={userLimit}
          setShowSingleUserLimit={setShowSingleUserLimit}
          showSingleUserLimit={showSingleUserLimit}
        />
      )}

      <Fragment>
        <Dialog
          open={showUserLimitModal}
          onClose={() => setUserLimitModal(false)}
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
            Add User Limit
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
                Fill in the details below to add a User Limit
              </Typography>
              <Grid container spacing={6} style={{ marginBottom: '25px' }}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='currency'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='Currency'
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={Boolean(errors.currency)}
                        helperText={Boolean(errors.currency)}
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
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='daily_limit'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        label='Daily Limit'
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={Boolean(errors.daily_limit)}
                      ></CustomTextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='weekly_limit'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        label='Weekly Limit'
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={Boolean(errors.weekly_limit)}
                      ></CustomTextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='monthly_limit'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        label='Monthly Limit'
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={Boolean(errors.monthly_limit)}
                      ></CustomTextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        label='Email'
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={Boolean(errors.email)}
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
              <Button variant='contained' sx={{ mr: 2 }} disabled={addUserLimitLoading} type='submit'>
                Add
              </Button>
              <Button variant='tonal' color='secondary' onClick={() => setUserLimitModal(false)}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Fragment>

      {!userLimitLoading ? (
        <Card>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <CardHeader
                title='User Limit'
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
                onClick={() => setUserLimitModal(true)}
                variant='contained'
                endIcon={<Icon icon='fluent:album-add-20-regular' />}
              >
                Add User Limit
              </Button>
              <Button variant='outlined' onClick={handleShowHistories} sx={{ marginLeft: 4 }}>
                View History
              </Button>
            </Box>
          </Box>
          <DataGrid
            autoHeight
            pagination
            rows={allUserLimit || []}
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

export default UserLimitSetup
