// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Components
import {
  Typography,
  Card,
  CardHeader,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Menu,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useGetAllTransaction } from 'src/hooks/admin/transactions'
import Box from '@mui/system/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import Transaction from './transaction'
import Spinner from 'src/@core/components/spinner'

// ** Types Imports
import { AllTransactions } from './types'
import { GetAllTenants, GetAllCurrencies } from 'src/hooks/admin/types'


// ** Third Party Imports
import { DatePicker } from '@mantine/dates'

// ** Hooks
import { useGetCurrencies } from 'src/hooks/admin/currency'

// ** Helper Function Imports
import { formatCurrency, formatTimestamp } from 'src/@core/utils/format'
import { useGetAllTenants } from 'src/hooks/admin/tenants'
import { GetAllTenants } from 'src/hooks/admin/types'
import Tenants from 'src/pages/tenants'

const getBackgroundColor = (status: string) => {
  switch (status) {
    case 'pending':
      return '#343a3f'
    case 'submitted':
      return '#15a3b8'
    case 'processing':
      return '#027bff'
    case 'failed':
      return '#dc3444'
    case 'successful':
      return '#28a744'
    case 'cancelled':
      return '#343a3f'
    default:
      return 'white' // Default color
  }
}

interface CellType {
  row: AllTransactions
}

const columns: GridColDef[] = [
  {
    flex: 0.1,
    minWidth: 150,
    maxWidth: 200,
    field: 'sender_name',
    headerName: 'Sender Name',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.sender_name}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 150,
    maxWidth: 200,
    field: 'amount',
    headerName: 'Amount',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.source_currency_symbol}
        {formatCurrency(row?.source_amount)}-{row?.destination_currency_symbol}
        {formatCurrency(row?.total_recipient_amount)}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 105,
    maxWidth: 200,
    field: 'partner_rate',
    headerName: 'Partner Rate',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{formatCurrency(row?.partner_rate)}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 105,
    maxWidth: 200,
    field: 'broker_rate',
    headerName: 'Broker Rate',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{formatCurrency(row?.broker_rate)}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 105,
    maxWidth: 200,
    field: 'fee_type',
    headerName: 'Fee Type',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.fee_type}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 105,
    maxWidth: 200,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => (
      <Typography
        sx={{
          color: 'white',
          background: getBackgroundColor(row?.status),
          borderRadius: '12px',
          px: '10px',
          py: '3px'
        }}
      >
        {row?.status}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 260,
    field: 'created_on',
    headerName: 'Transaction Date',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{formatTimestamp(row?.created_on)}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 105,
    maxWidth: 200,
    field: 'tenant_name',
    headerName: 'Tenant Name',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.tenant_name}</Typography>
  }
]

const AllTransactions = () => {
  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [transactionId, setTransactionId] = useState<number | null>(null)
  const [showSingleTransaction, setShowSingleTransaction] = useState(false)
  const [showAllTransaction, setShowAllTransaction] = useState(true)
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null])

  // const [currentPage, setCurrentPage] = useState(1)
  const transactionsPerPage = 20

  // const [status, setStatus] = useState('')
  const [statusToSend, setStatusToSend] = useState('')
  const [transactionType, setTransactionType] = useState('')
  const [transactionTypeToSend, setTransactionTypeToSend] = useState('')
  const [sourceCurrency, setSourceCurrency] = useState('')
  const [sourceCurrToSend, setSourceCurrToSend] = useState('')
  const [destinationCurrency, setDestinationCurrency] = useState('')
  const [destinationCurrencyToSend, setDestinationCurrencyToSend] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [paymentMethodToSend, setPaymentMethodToSend] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null)

  // const [anchorEl3, setAnchorEl3] = useState<null | HTMLElement>(null)
  const [tenantName, setTenantName] = useState('')
  const [tenantNameToSend, setTenantNameToSend] = useState('')

  // const [dateRange, setDateRange] = useState('')
  // const [value, setValue] = useState<Date | null>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const dateRange = ''

  const { data: allTransactions, isLoading: transactionsLoading, refetch: refetch  } = useGetAllTransaction([
    statusToSend,
    transactionTypeToSend,
    sourceCurrToSend,
    destinationCurrencyToSend,
    paymentMethodToSend,
    dateRange,
    transactionsPerPage,
    tenantNameToSend
  ])

const { data: allTenants } = useGetAllTenants()
const tenants = allTenants?.data.results

  const { data: allCurrencies, isLoading: currenciesLoading, } = useGetCurrencies()

  function renderSingleTransactionModal(transactionId: number | null) {
    setTransactionId(transactionId)
    setShowSingleTransaction(true)
    setShowAllTransaction(false)
  }

  const handleModalClose = () => setModalOpen(false)

  const handleFilter = () => {
    // setStatusToSend(status)
    setTransactionTypeToSend(transactionType)
    setSourceCurrToSend(sourceCurrency)
    setDestinationCurrencyToSend(destinationCurrency)
    setPaymentMethodToSend(paymentMethod)
    setTenantNameToSend(tenantName)
    handleModalClose()
    refetch()
  }

  console.log(transactionTypeToSend, sourceCurrToSend, destinationCurrencyToSend, paymentMethodToSend, tenantName)
  if (transactionsLoading) {
    return <Spinner />
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget)
  }

  // const handleClick3 = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl3(event.currentTarget)
  // }

  const handleClose = (status: string) => {
    setStatusToSend(status)
    setAnchorEl(null)
  }

  const handleClose2 = (status: string) => {
    console.log('status', status)
    setAnchorEl2(null)
  }

  // const handleClose3 = (tenantName: string) => {
  //   setTenantName(tenantName)
  //   setAnchorEl3(null)
  // }


  function handleClearFilters() {
    setStatusToSend('')
    setTransactionTypeToSend('')
    setSourceCurrToSend('')
    setDestinationCurrencyToSend('')
    setPaymentMethodToSend('')
    setTenantNameToSend('')

setTransactionType('')
setSourceCurrency('')
setDestinationCurrency('')
setPaymentMethod('')
setTenantName('')

    refetch()
  }

  return (
    <>
      {showSingleTransaction && (
        <Transaction
          transactionId={transactionId}
          setShowSingleTransaction={setShowSingleTransaction}
          setShowAllTransaction={setShowAllTransaction}
        />
      )}
      {!transactionsLoading && showAllTransaction ? (
        <Card>
          <Fragment>
            <Dialog
              open={modalOpen}
              onClose={handleModalClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <DialogTitle id='alert-dialog-title'>
                <Typography variant='h6' component='span'>
                  Filter Transactions
                </Typography>
                <IconButton
                  aria-label='close'
                  onClick={handleModalClose}
                  sx={{ top: 8, right: 10, position: 'absolute', color: 'grey.500' }}
                >
                  <Icon icon='tabler:x' />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Box sx={{ display: 'flex', gap: 5 }}>
                  <Box sx={{ width: '100' }}>
                    <CustomTextField
                      select
                      defaultValue={transactionType}
                      label='Transaction Type'
                      onChange={e => {
                        setTransactionType(e.target.value)
                      }}
                      id='custom-select'
                    >
                      <MenuItem value=''>
                        <em>All Transactions</em>
                      </MenuItem>
                      <MenuItem value={'automated'}>Automated</MenuItem>
                      <MenuItem value={'offline'}>Offline</MenuItem>
                    </CustomTextField>
                  </Box>
                  <Box sx={{ width: '200' }}>
                    <CustomTextField
                      select
                      defaultValue={paymentMethod}
                      label='Payment Method'
                      onChange={e => {
                        setPaymentMethod(e.target.value)
                      }}
                      id='custom-select'
                    >
                      <MenuItem value=''>
                        <em>All</em>
                      </MenuItem>
                      <MenuItem value={'open_banking'}>Open Banking</MenuItem>
                      <MenuItem value={'offline'}>offline Transfer</MenuItem>
                      <MenuItem value={'virtual_account'}>Virtual Account</MenuItem>
                    </CustomTextField>
                  </Box>

                </Box>
                <Box sx={{ display: 'flex', gap: 5, mt: 10, justifyContent: 'center' }}>
                  <Box sx={{ width: '100' }}>
                    {!currenciesLoading && (
                      <CustomTextField
                        select
                        defaultValue={sourceCurrency}
                        label='Source Currency'
                        id='custom-select'
                        onChange={e => {
                          setSourceCurrency(e.target.value)
                        }}
                      >
                        <MenuItem value=''>
                          <em>All Currencies</em>
                        </MenuItem>
                        {allCurrencies?.map((currency:GetAllCurrencies) => (
                          <MenuItem key={currency.id} value={currency.id}>
                            {currency.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  </Box>
                  <Box sx={{ width: '100' }}>
                    {!currenciesLoading && (
                      <CustomTextField
                        select
                        defaultValue={destinationCurrency}
                        label='Destination Currency'
                        id='custom-select'
                        onChange={e => {
                          setDestinationCurrency(e.target.value)
                        }}
                      >
                        <MenuItem value=''>
                          <em>All Currencies</em>
                        </MenuItem>
                        {allCurrencies?.map((currency: GetAllCurrencies) => (
                          <MenuItem key={currency.id} value={currency.id}>
                            {currency.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  </Box>

                </Box>

                                <Box sx={{ display: 'flex', gap: 5, mt: 10, justifyContent: 'center' }}>
                <Box>
                      <CustomTextField
                        select
                        defaultValue={tenantName}
                        label='Tenant Name'
                        id='custom-select'
                        onChange={e => {
                          setTenantName(e.target.value)
                        }}
                      >
                        <MenuItem value=''>
                          <em>All Tenants</em>
                        </MenuItem>
                        {tenants?.map((tenant:GetAllTenants) => (
                          <MenuItem key={tenant.id} value={tenant.id}>
                            {tenant.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                  </Box>
                  </Box>
                {/* <Box sx={{ display: 'flex', gap: 5, mt: 10, justifyContent: 'center' }}> */}
                {/* <Box>
                <Button variant='outlined' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick3}>
                  Filter Tenants
                </Button>
                <Menu keepMounted id='simple-menu' anchorEl={anchorEl3} onClose={handleClose3} open={Boolean(anchorEl3)}>
                {tenants?.map((tenant:GetAllTenants )=> (
                          <MenuItem key={tenant.id} value={tenant.id} onClick={() => handleClose3(tenant.id)}>
                            {tenant.name}
                          </MenuItem>
                        ))}
                </Menu>
              </Box> */}
                          {/* <Box sx={{ width: '100' }}>
                <Box sx={{mt: 10}}>
                     <CustomTextField
                       select
                       defaultValue={tenantName}
                       label='Tenant Name'
                       id='custom-select'
                       onChange={e => {
                         setTenantName(e.target.value)
                       }}
                     >
                       <MenuItem value=''>
                         <em>All Tenants</em>
                       </MenuItem>
                       {tenants?.map((tenant:GetAllTenants) => (
                         <MenuItem key={tenant.id} value={tenant.id}>
                           {tenant.name}
                         </MenuItem>
                       ))}
                     </CustomTextField>
                 </Box>

              </Box> */}
              {/* </Box> */}
              </DialogContent>
              <DialogActions className='dialog-actions-dense' sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button disabled={transactionsLoading} onClick={handleFilter} variant='contained' color='primary'>
                  Filter
                </Button>
              </DialogActions>
            </Dialog>
          </Fragment>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <CardHeader
                title='All Transactions'
                titleTypographyProps={{ sx: { mb: [2, 0] } }}
                sx={{
                  py: 4,
                  flexDirection: ['column', 'row'],
                  '& .MuiCardHeader-action': { m: 0 },
                  alignItems: ['flex-start', 'center']
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* <Box>
                <Button variant='outlined' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick2}>
                  Filter Date
                </Button>
                <Menu
                  keepMounted
                  id='simple-menu'
                  anchorEl={anchorEl2}
                  onClose={handleClose2}
                  open={Boolean(anchorEl2)}
                >
                  <Box sx={{ width: '200', mt: 5 }}>
                    <Typography align='center' gutterBottom>
                      Date Range
                    </Typography>
                    <DatePicker type='range' value={value} onChange={setValue} />
                  </Box>
                </Menu>
              </Box> */}
              {/* <Box>
                      <CustomTextField
                        select
                        defaultValue={statusToSend}
                        label='Filter Status'
                        id='custom-select'
                        onChange={e => {
                          setStatusToSend(e.target.value)
                        }}
                      >
         <Menu
                  keepMounted
                  id='simple-menu'
                  anchorEl={anchorEl2}
                  onClose={handleClose2}
                  open={Boolean(anchorEl2)}
                >
                  <Box sx={{ width: '200', mt: 5 }}>
                    <Typography align='center' gutterBottom>
                      Date Range
                    </Typography>
                    <DatePicker type='range' value={value} onChange={setValue} />
                  </Box>
                </Menu>
                      </CustomTextField>
                  </Box> */}
        <Box>

      <CustomTextField
        variant="outlined"
        onClick={handleClick2}
        value={value[0] ? `${value[0]?.toLocaleDateString()} - ${value[1]?.toLocaleDateString()}` : ''}
       placeholder='Select Date Range'
       cursor='pointer'
      />
      <Menu
        keepMounted
        id="simple-menu"
        anchorEl={anchorEl2}
        onClose={handleClose2}
        open={Boolean(anchorEl2)}
      >
        <Box sx={{ width: '200', mt: 5 }}>
          <Typography align="center" gutterBottom>
            Date Range
          </Typography>
          <DatePicker
            type="range"
            startText="Start Date"
            endText="End Date"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </Box>
      </Menu>
    </Box>
              <Box sx={{marginBottom: 6, marginLeft: 2, marginRight: 2, mt: 2}}>
                      <CustomTextField
                        select
                        defaultValue={statusToSend}
                        id='custom-select'
                        onChange={e => {
                          setStatusToSend(e.target.value)
                        }}
                        label='Filter Status'

                      >
                  <MenuItem value = ''>All Status</MenuItem>
                  <MenuItem value= 'pending'>Pending</MenuItem>
                  <MenuItem value= 'submitted'>Submitted</MenuItem>
                  <MenuItem value= 'processing'>Processing</MenuItem>
                  <MenuItem value= 'successful'>Successful</MenuItem>
                  <MenuItem value= 'failed'>Failed</MenuItem>
                  <MenuItem value= 'cancelled'>Cancelled</MenuItem>
                      </CustomTextField>
                  </Box>
              <Box>
                <Button
                  variant='outlined'
                  aria-controls='simple-menu'
                  aria-haspopup='true'
                  onClick={() => setModalOpen(true)}
                >
                  Filter Transactions
                </Button>
              </Box>
              <Box sx={{ mr: 6, ml: 2 }}>
                <Button
                  variant='outlined'
                  aria-controls='simple-menu'
                  aria-haspopup='true'
                  onClick={handleClearFilters}
                >
                  Clear All Filters
                </Button>
              </Box>
            </Box>
          </Box>
          <DataGrid
            autoHeight
            pagination
            rows={allTransactions?.results || []}
            rowHeight={62}
            columns={columns}
            pageSizeOptions={[10, 20]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            onRowClick={params => {
              renderSingleTransactionModal(params.row.id)
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

export default AllTransactions
