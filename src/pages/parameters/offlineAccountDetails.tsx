import { useState, useCallback, useEffect } from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useGetAllOfflineAccounts } from 'src/hooks/admin/banks'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CustomTextField from 'src/@core/components/mui/text-field'
import {
  useCreateNewOfflineAccount,
  useUpdateOfflineAccountDetails,
  useDeleteOfflineAccount
} from 'src/hooks/admin/banks'
import { GetAllOfflineAccounts } from '../../hooks/admin/types'
import Button from '@mui/material/Button'
import { useGetAllTenants } from 'src/hooks/admin/tenants'
import { useGetCurrencies } from 'src/hooks/admin/currency'
import { useRouter } from 'next/router'
import ActionsMenu from 'src/components/ActionMenu'

interface CellType {
  row: GetAllOfflineAccounts & { sn: number } // Add sn property to CellType
}

const OfflineAccountDetails = () => {
  const router = useRouter()
  const [openCreate, setOpenCreate] = useState<boolean>(false)
  const [account_name, setAccount_name] = useState<string>('')
  const [account_number, setAccount_number] = useState<string>('')
  const { data: currencies } = useGetCurrencies()
  const [selectedCurrency, setSelectedCurrency] = useState<string>()
  const [currencyList, setCurrencyList] = useState<{ id: string; code: string }[]>([])

  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [bank_name, setBank_name] = useState<string>('')
  const [selectedTenant, setSelectedTenant] = useState<string>('')
  const [tenantList, setTenantList] = useState<{ id: string; name: string }[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [editAccount, setEditAccount] = useState<GetAllOfflineAccounts | null>(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
  const [selectedRowToDelete, setSelectedRowToDelete] = useState<GetAllOfflineAccounts | null>(null)
  const [serialNumbers, setSerialNumbers] = useState<number[]>([])

  // Function to generate serial numbers

  const { data: allOfflineAccounts, isLoading: offlineAccountsLoading } = useGetAllOfflineAccounts()
  const { mutate: createOfflineAccount } = useCreateNewOfflineAccount()
  const { data: tenants } = useGetAllTenants()
  const { mutate: updateAccountDetails } = useUpdateOfflineAccountDetails()
  const { mutate: deleteOfflineAccount } = useDeleteOfflineAccount()

  const handleEditClickOpen = (selectedRow: GetAllOfflineAccounts) => {
    setEditAccount(selectedRow)
    setAccount_name(selectedRow.account_name || '')
    setAccount_number(selectedRow.account_number || '')
    setBank_name(selectedRow.bank_name || '')
    const currencyObject = currencyList.find(currency => currency.id === (selectedRow.currency as string))
    const initialCurrency = currencyObject ? currencyObject.code : ''
    const tenantObject = tenantList.find(tenant => tenant.id === selectedRow.tenant)
    const initialTenant = tenantObject ? tenantObject.name : ''
    setSelectedCurrency(initialCurrency)
    setSelectedTenant(initialTenant)
    setOpenEdit(true)
  }

  const handleEditClose = () => {
    setAccount_name('')
    setAccount_number('')
    setBank_name('')
    setSelectedTenant('')
    setSelectedCurrency('')

    setOpenEdit(false)
  }

  const handleCreateModal = () => setOpenCreate(true)
  const handleCreateClose = () => {
    setAccount_name('')
    setAccount_number('')
    setBank_name('')
    setSelectedTenant('')
    setSelectedCurrency('')

    setOpenCreate(false)
  }

  const generateSerialNumbers = useCallback((data: GetAllOfflineAccounts[]) => {
    const numbers = data.results.map((_, index) => index + 1)
    setSerialNumbers(numbers)
  }, [])

  useEffect(() => {
    if (allOfflineAccounts) {
      generateSerialNumbers(allOfflineAccounts.data || [])
    }
  }, [allOfflineAccounts, generateSerialNumbers])

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 105,
      field: 'sn', // Use sn field for S/N
      headerName: 'S/N',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.sn}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: 'account_name',
      headerName: 'Account Name',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.account_name}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: 'account_number',
      headerName: 'Account Number',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.account_number}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: 'bank_name',
      headerName: 'Bank Name',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.bank_name}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: 'currency_code',
      headerName: 'Currency',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.currency_code}</Typography>
    },

    //   {
    //     flex: 0.1,
    //     minWidth: 105,
    //     field: 'code',
    //     headerName: 'Bank Code',
    //     renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.code}</Typography>
    //   },
    {
      flex: 0.1,
      minWidth: 105,
      field: 'tenant',
      headerName: 'Tenant',
      renderCell: ({ row }: CellType) => {
        const tenantObject = tenantList.find(tenant => tenant.id === row.tenant)
        const tenantName = tenantObject ? tenantObject.name : 'null'

        return <Typography sx={{ color: 'text.secondary' }}>{tenantName}</Typography>
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      flex: 0.1,
      minWidth: 105,
      renderCell: ({ row }: CellType) => (
        <ActionsMenu onEdit={() => handleEditClickOpen(row)} onDelete={() => handleDelete(row)} />
      )
    }
  ]

  useEffect(() => {
    // Populate tenant list when the tenants data is available
    if (tenants) {
      setTenantList(tenants.data.results)
    }
    if (currencies) {
      setCurrencyList(currencies)
    }
  }, [tenants, currencies])

  const handlecreateOfflineAccount = useCallback(async () => {
    try {
      const selectedTenantObject = tenantList.find(tenant => tenant.name === selectedTenant)
      const tenant = selectedTenantObject?.id
      const selectedCurrencyObject = currencyList.find(currency => currency.code === selectedCurrency)
      const currency = selectedCurrencyObject?.id
      await createOfflineAccount({ account_name, account_number, bank_name, currency, tenant })

      handleCreateClose()
    } catch (error) {
      console.error(error)
    }
  }, [
    tenantList,
    currencyList,
    createOfflineAccount,
    account_name,
    account_number,
    bank_name,
    selectedTenant,
    selectedCurrency
  ])

  const handleDelete = (selectedRow: GetAllOfflineAccounts) => {
    setSelectedRowToDelete(selectedRow)
    setShowDeleteConfirmation(true)
  }

  const handleConfirmDelete = () => {
    if (selectedRowToDelete) {
      deleteOfflineAccount(selectedRowToDelete.id)
      setShowDeleteConfirmation(false)
      setSelectedRowToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false)
    setSelectedRowToDelete(null)
  }

  const handleUpdateOfflineAccountDetails = useCallback(async () => {
    try {
      let tenant = ''

      if (selectedTenant !== null) {
        const selectedTenantObject = tenantList.find(tenant => tenant.name === selectedTenant)
        tenant = selectedTenantObject?.id || ''
      }
      const selectedCurrencyObject = currencyList.find(currency => currency.code === selectedCurrency)
      const currency = selectedCurrencyObject?.id

      await updateAccountDetails({
        id: editAccount?.id as string,
        data: { currency, account_name, account_number, bank_name, tenant }
      })
      setAccount_name('')
      setAccount_number('')
      setBank_name('')
      setSelectedTenant('')
      setSelectedCurrency('')
      handleEditClose()
    } catch (error) {
      console.error(error)
    }
  }, [
    selectedTenant,
    currencyList,
    updateAccountDetails,
    editAccount?.id,
    account_name,
    account_number,
    bank_name,
    tenantList,
    selectedCurrency
  ])

  const handleShowHistories = () => {
    // Hardcoded values for appname and modelname
    const appname = 'transactions'
    const modelname = 'OfflineAccountDetail'

    // Navigate to Histories page with the specified appname and modelname
    router.push(`/histories/${appname}/${modelname}`)
  }

  return (
    <>
      <Card>
        <CardHeader
          title='All Ofline accounts'
          titleTypographyProps={{ sx: { mb: [2, 0] } }}
          action={
            <>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleCreateModal}>
                Add Offline Account
              </Button>
              <Button variant='outlined' onClick={handleShowHistories}>
                View History
              </Button>
            </>
          }
          sx={{
            py: 4,
            flexDirection: ['column', 'row'],
            '& .MuiCardHeader-action': { m: 0 },
            alignItems: ['flex-start', 'center']
          }}
        />

        <DataGrid
          autoHeight
          pagination
          rows={allOfflineAccounts?.data?.results?.map((row, index) => ({ ...row, sn: serialNumbers[index] })) || []}
          rowHeight={62}
          columns={columns}
          pageSizeOptions={[10, 20]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          loading={offlineAccountsLoading}
        />
      </Card>

      <Dialog
        open={openCreate}
        onClose={handleCreateClose}
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
          Add Offline Account
        </DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label='Account Name'
                  placeholder='account name'
                  value={account_name}
                  onChange={e => setAccount_name(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label='Account Number '
                  placeholder='account number'
                  value={account_number}
                  onChange={e => setAccount_number(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label='Bank Name'
                  placeholder='bank name'
                  value={bank_name}
                  onChange={e => setBank_name(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  select
                  fullWidth
                  label='Tenant'
                  value={selectedTenant}
                  onChange={e => setSelectedTenant(e.target.value as string)}
                >
                  {tenantList.map(tenant => (
                    <MenuItem key={tenant.id} value={tenant.name}>
                      {tenant.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
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
          <Button variant='contained' sx={{ mr: 2 }} onClick={handlecreateOfflineAccount}>
            Add
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleCreateClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
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
          Edit Offline Account
        </DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label='Account Name'
                  placeholder='account name'
                  value={account_name}
                  onChange={e => setAccount_name(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label='Account Number '
                  placeholder='account number'
                  value={account_number}
                  onChange={e => setAccount_number(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label='Bank Name'
                  placeholder='bank name'
                  value={bank_name}
                  onChange={e => setBank_name(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  select
                  label='Tenant'
                  value={selectedTenant}
                  onChange={e => setSelectedTenant(e.target.value as string)}
                  fullWidth
                >
                  <MenuItem value={null}>Remove Tenant</MenuItem>
                  {tenantList.map(tenant => (
                    <MenuItem key={tenant.id} value={tenant.name}>
                      {tenant.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  select
                  label='Currency'
                  value={selectedCurrency}
                  onChange={e => setSelectedCurrency(e.target.value as string)}
                  fullWidth
                >
                  {currencyList.map(currency => (
                    <MenuItem key={currency.id} value={currency.code}>
                      {currency.code}
                    </MenuItem>
                  ))}
                </CustomTextField>
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
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleUpdateOfflineAccountDetails}>
            Save Changes
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleEditClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showDeleteConfirmation}
        onClose={handleCancelDelete}
        aria-labelledby='delete-confirmation-dialog'
        aria-describedby='delete-confirmation-dialog-description'
      >
        <DialogTitle id='delete-confirmation-dialog'>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete the offline account?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default OfflineAccountDetails
