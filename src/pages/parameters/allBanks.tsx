import { useState, useCallback, useEffect } from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useGetAllBanks } from 'src/hooks/admin/banks'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Grid'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CustomTextField from 'src/@core/components/mui/text-field'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'

import { useCreateNewBank } from 'src/hooks/admin/banks'
import { GetAllBanks } from '../../hooks/admin/types'
import { useGetCurrencies } from 'src/hooks/admin/currency'

import { useRouter } from 'next/router'

interface CellType {
  row: GetAllBanks
}

const columns: GridColDef[] = [
  {
    flex: 0.1,
    minWidth: 105,
    field: 'id',
    headerName: 'S/N',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.id}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 105,
    field: 'name',
    headerName: 'Bank Name',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.name}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 105,
    field: 'currency_code',
    headerName: 'Currency Code',
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
    field: 'is_active',
    headerName: 'Active',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.is_active ? 'Yes' : 'No'}</Typography>
    )
  }
]

const AllBanks = () => {
  const [openCreate, setOpenCreate] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [currency, setCurrency] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [is_active, setIs_active] = useState<boolean>(true)
  const router = useRouter()
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const { data: allBanks, isLoading: banksLoading } = useGetAllBanks()
  const { mutate: createNewBank } = useCreateNewBank()
  const { data: currencies } = useGetCurrencies()

  const [currencyList, setCurrencyList] = useState<{ id: string; code: string }[]>([])
  const handleCreateModal = () => setOpenCreate(true)
  const handleCreateClose = () => setOpenCreate(false)

  useEffect(() => {
    if (currencies) {
      setCurrencyList(currencies)
    }
  }, [currencies])
  const handleCreateNewBank = useCallback(async () => {
    try {
      const selectedCurrencyObject = currencyList.find(currencyItem => currencyItem.code === currency)
      const currencyItem = selectedCurrencyObject?.id

      await createNewBank({ name, currency: currencyItem, code, is_active })
      setName('')
      setCurrency('')
      setCode('')
      setIs_active(false)
      handleCreateClose()
    } catch (error) {
      console.error(error)
    }
  }, [currencyList, createNewBank, name, code, is_active, currency])

  return (
    <>
      <Card>
        <CardHeader
          title='All Banks'
          titleTypographyProps={{ sx: { mb: [2, 0] } }}
          action={
            <>
              <Button variant='contained' onClick={handleCreateModal}>
                Add Bank
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
          rows={allBanks?.data.results || []}
          rowHeight={62}
          columns={columns}
          pageSizeOptions={[10, 20]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          loading={banksLoading}
          onRowClick={params => {
            router.push(`/parameters/bank-details/${params.row.id}`)
          }}
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
          Add Bank
        </DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label='Bank Name'
                  placeholder='name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                select
                fullWidth
                label='Currency' value={currency} onChange={e => setCurrency(e.target.value as string)}  >
                  
                  {currencyList.map(currencyItem => (
                    <MenuItem key={currencyItem.id} value={currencyItem.code}>
                      {currencyItem.code}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label='Bank Code'
                  placeholder='code'
                  value={code}
                  onChange={e => setCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Active:</Typography>
                <Switch checked={is_active} onChange={() => setIs_active(!is_active)} color='primary' />
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
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleCreateNewBank}>
            Add
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleCreateClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AllBanks
