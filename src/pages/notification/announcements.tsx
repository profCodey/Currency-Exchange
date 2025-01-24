// ** React Imports
import { useState } from 'react'

// ** MUI Components
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import { MenuItem } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
  useGetAnnouncements,
  useCreateAnnouncement,
  useDeleteAnnouncement,
  useSendSampleAnnouncement,
  usePublishAnnouncement,
  useUpdateAnnouncement
} from 'src/hooks/admin/notification'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { formatTimestamp } from 'src/@core/utils/format'

// import toast from 'react-hot-toast'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { GetAnnouncements } from 'src/hooks/admin/types'
import CustomTextField from 'src/@core/components/mui/text-field'
import ActionsMenu from 'src/components/AnnouncementActionMenu'

const newAnnouncementSchema = yup.object().shape({
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
  type: yup.string().required('Type is required')
})

const defaultValues = {
  subject: '',
  message: '',
  type: ''
}

interface CellType {
  row: GetAnnouncements
}


const Announcements = () => {
  const columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 105,
      field: 'created_by',
      headerName: 'Updated By',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.created_by}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: 'created_on',
      headerName: 'Created On ',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{formatTimestamp(row.created_on)}</Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: 'updated_on',
      headerName: 'Updated On ',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{formatTimestamp(row.updated_on)}</Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: 'subject',
      headerName: 'Subject',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.subject}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: 'message',
      headerName: 'Message',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.message}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: 'type',
      headerName: 'Type',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.type}</Typography>
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      flex: 0.1,
      minWidth: 105,
      renderCell: ({ row }: CellType) => (
        <ActionsMenu
          onEdit={() => handleEditClickOpen(row)}
          onDelete={() => handleDelete(row)}
          onPublish={() => handlePublishOpen(row)}
          onSendSample={() => handleSendSampleOpen(row)}
        />
      )
    }
  ]

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [openCreate, setOpenCreate] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openPublish, setOpenPublish] = useState<boolean>(false)
  const [showSampleConfirmation, setShowSampleConfirmation] = useState<boolean>(false)
  const [selectedEmail, setSelectedEmail] = useState<string>('') // New state to track selected email


  const [selectedRowToDelete,setSelectedRowToDelete] = useState<GetAnnouncements | null>(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
  const [editAnnouncement, setEditAnnouncement] = useState<GetAnnouncements | null>(null)

  const { data: allAnnouncements } = useGetAnnouncements()
  const { mutate: createAnnouncement } = useCreateAnnouncement()
  const { mutate: updateAnnouncement } = useUpdateAnnouncement()
  const { mutate: deleteAnnouncement } = useDeleteAnnouncement()
  const { mutate: publishAnnouncement } = usePublishAnnouncement()
  const { mutate: sendSampleAnnouncement } = useSendSampleAnnouncement()

  const handleCreateModal = () => setOpenCreate(true)
  
  const handleCreateClose = () => setOpenCreate(false)
 
  const handlePublishOpen = (selectedRow: GetAnnouncements) => {
    setSelectedRowToDelete(selectedRow)
    setOpenPublish(true)
  }
  
  const handleEditClickOpen = (selectedRow: GetAnnouncements) => {
    setEditAnnouncement(selectedRow)
    reset({
      subject: selectedRow.subject,
      message: selectedRow.message,
      type: selectedRow.type
    });
    setOpenEdit(true)
  }
  const handleEditClose = () => {
    reset(defaultValues);

    setOpenEdit(false)

    setEditAnnouncement(null)
  }

  const handleDelete = (selectedRow: GetAnnouncements) => {
    setSelectedRowToDelete(selectedRow)
    setShowDeleteConfirmation(true)
  }

  const handleConfirmPublish = () => {
    if (selectedRowToDelete) {
      publishAnnouncement(selectedRowToDelete.id)
      setOpenPublish(false)
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false)
    setSelectedRowToDelete(null)
  }

  const handleCancelPublish = () => {
    setOpenPublish(false)
    setSelectedRowToDelete(null)
  }
  
  const handleConfirmDelete = () => {
    if (selectedRowToDelete) {
      deleteAnnouncement(selectedRowToDelete.id)
      setShowDeleteConfirmation(false)
      setSelectedRowToDelete(null)
    }
  }
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(newAnnouncementSchema)
  })

  const onSubmit = async (data: any) => {
    try {
      await createAnnouncement(data)
      handleCreateClose()
      reset(defaultValues)
    } catch (error) {
      console.error('Error creating announcement', error)
    }
  }

  const handleSendSampleOpen = (selectedRow: GetAnnouncements) => {
    setSelectedRowToDelete(selectedRow)
    setShowSampleConfirmation(true)
  }

  const handleConfirmSendSample = async () => {
    if (selectedRowToDelete) {
      if (selectedRowToDelete.type === 'email' && selectedEmail === '') {

        return;
      }

      // Perform the sendSampleAnnouncement logic here
      if (selectedRowToDelete.type === 'email') {

        // Handle sending sample to the selected email
        await sendSampleAnnouncement({ id: selectedRowToDelete.id, email: selectedEmail });
      } else {
        // Handle sending sample for 'site' type
        await sendSampleAnnouncement({ id: selectedRowToDelete.id });
      }

      setShowSampleConfirmation(false);
      setSelectedRowToDelete(null);
      setSelectedEmail('')
    }
  }

    const handleCancelSendSample = () => {
      setShowSampleConfirmation(false);
      setSelectedRowToDelete(null);
      setSelectedEmail('')
    }

  return (
    <>
      <Card>
        <CardHeader
          title='Announcements'
          titleTypographyProps={{ sx: { mb: [2, 0] } }}
          action={
            <>
              <Button variant='contained' onClick={handleCreateModal}>
                Create Announcement
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
          rows={allAnnouncements || []}
          rowHeight={62}
          columns={columns}
          pageSizeOptions={[10, 20]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}

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
          Create Announcement
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                {' '}
                <Controller
                  name='subject'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      label='Subject'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={Boolean(errors.subject)}
                      helperText={errors.subject?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {' '}
                <Controller
                  name='message'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      label='Message'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={Boolean(errors.message)}
                      helperText={errors.message?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {' '}
                <Controller
                  name='type'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      select
                      label='Type'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={Boolean(errors.type)}
                      helperText={errors.type?.message}
                    >
                      <MenuItem value='email'>email</MenuItem>
                      <MenuItem value='site'>site</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>
            </Grid>
            <DialogActions
              sx={{
                justifyContent: 'center',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              <Button variant='contained' type='submit' sx={{ mr: 2 }}>
                Create
              </Button>
              <Button variant='tonal' color='secondary' onClick={handleCreateClose}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openEdit}
        onClose={handleEditClose}
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
          Edit Announcement
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit(async (data: any) => {
              try {
                await updateAnnouncement({ ...data, id: editAnnouncement?.id })
                handleEditClose()
              } catch (error) {
                console.error('Error updating announcement', error)
              }
            })}
          >
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                {' '}
                <Controller
                  name='subject'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      label='Subject'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={Boolean(errors.subject)}
                      helperText={errors.subject?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {' '}
                <Controller
                  name='message'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      label='Message'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={Boolean(errors.message)}
                      helperText={errors.message?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {' '}
                <Controller
                  name='type'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      select
                      label='Type'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={Boolean(errors.type)}
                      helperText={errors.type?.message}
                    >
                      <MenuItem value='email'>email</MenuItem>
                      <MenuItem value='site'>site</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>
            </Grid>
            <DialogActions
              sx={{
                justifyContent: 'center',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              <Button variant='contained' type='submit' sx={{ mr: 2 }}>
                Update
              </Button>
              <Button variant='tonal' color='secondary' onClick={handleEditClose}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={showDeleteConfirmation}
        onClose={handleCancelDelete}
        aria-labelledby='delete-confirmation-dialog'
        aria-describedby='delete-confirmation-dialog-description'
      >
        <DialogTitle id='delete-confirmation-dialog'>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this announcement?</Typography>
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
      <Dialog
        open={openPublish}
        onClose={handleCancelPublish}
        aria-labelledby='delete-confirmation-dialog'
        aria-describedby='delete-confirmation-dialog-description'
      >
        <DialogTitle id='delete-confirmation-dialog'>Confirm Publish</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to publish this announcement? This announcement will be shared to all users of the application</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelPublish} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleConfirmPublish} color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
    open={showSampleConfirmation}
    onClose={handleCancelSendSample}
    aria-labelledby='send-sample-confirmation-dialog'
    aria-describedby='send-sample-confirmation-dialog-description'
  >
    <DialogTitle id='send-sample-confirmation-dialog'>Confirm Send Sample Announcement</DialogTitle>
    <DialogContent>
      {selectedRowToDelete?.type === 'email' ? (
        <CustomTextField
          fullWidth
          label='Enter Email'
          placeholder='Enter destination email.'
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
        />
         
      ) : (
        <Typography>Are you sure you want to send a sample announcement? This announcement will be send to all users of the application</Typography>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCancelSendSample} color='primary'>
        Cancel
      </Button>
      <Button onClick={handleConfirmSendSample} color='primary'>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
      
    </>
  )
}

export default Announcements