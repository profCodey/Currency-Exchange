// ** React Imports
import { useState, useCallback } from 'react'

// ** MUI Components
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useGetRateNotifications, useSendRateNotifications, useClearNotifications } from 'src/hooks/admin/notification'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { formatTimestamp } from 'src/@core/utils/format'
import toast from 'react-hot-toast'

import { GetRateNotification } from 'src/hooks/admin/types'

interface CellType {
  row: GetRateNotification
}

const columns: GridColDef[] = [
  {
    flex: 0.1,
    minWidth: 105,
    field: 'created_by_name',
    headerName: 'Updated By',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.created_by_name}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 105,
    field: 'created_on',
    headerName: 'On ',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{formatTimestamp(row.created_on)}</Typography>
    )
  }
]

const RateNotifications = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [openCreate, setOpenCreate] = useState<boolean>(false)
  const [openClear, setOpenClear] = useState<boolean>(false)

  const { data: allNotifications } = useGetRateNotifications()
  const { mutate: sendNotifications } = useSendRateNotifications()
  const { mutate: clearNotifications } = useClearNotifications()

  const handleCreateModal = () => setOpenCreate(true)
  const handleClearModal = () => setOpenClear(true)
  const handleClearModalClose = () => setOpenClear(false)
  const handleCreateClose = () => setOpenCreate(false)

  const handleSendNotification = useCallback(async () => {
    try {
      await sendNotifications()
      handleCreateClose()
    } catch (error) {
      console.error('Error sending rate notification', error)
    }
  }, [sendNotifications])

  const handleClearNotifications = useCallback(async () => {
    try {
      await clearNotifications()
      handleClearModalClose()
    } catch (error) {
      console.error('Error clearing rate notification', error)
      toast.error('Error clearing rate notification')
    }
  }, [clearNotifications])

  return (
    <>
      <Card>
        <CardHeader
          title='Rate Notifications'
          titleTypographyProps={{ sx: { mb: [2, 0] } }}
          action={
            <>
              <Button variant='contained' onClick={handleCreateModal}>
                Send Rate Notification
              </Button>

              <Button variant='outlined' sx={{ ml: 2 }} onClick={handleClearModal}>
                Clear Rate Update
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
          rows={allNotifications || []}
          rowHeight={62}
          columns={columns}
          pageSizeOptions={[10, 20]} 
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          getRowId={row => row.created_by_name + row.created_on}

          //   onRowClick={params => handleModalOpen(params.row as GetAllNotifications)}
        />
      </Card>

      <Dialog
        open={openCreate}
        onClose={handleCreateClose}
        aria-labelledby='user-view-edit'
        aria-describedby='user-view-edit-description'
        sx={{ '& .MuiPaper-root': { width: '50%', maxWidth: 500 } }}
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
          Confirmation{' '}
        </DialogTitle>
        <DialogContent>Are you sure you want to send rate notification to all users?</DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleSendNotification}>
            Yes
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleCreateClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openClear}
        onClose={handleClearModalClose}
        aria-labelledby='user-view-edit'
        aria-describedby='user-view-edit-description'
        sx={{ '& .MuiPaper-root': { width: '50%', maxWidth: 500 } }}
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
          Confirmation{' '}
        </DialogTitle>
        <DialogContent>Are you sure you want to clear all rate notification updates?</DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleClearNotifications}>
            Yes
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleClearModalClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default RateNotifications
