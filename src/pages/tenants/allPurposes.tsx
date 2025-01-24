// ** React Imports
import { useState, useCallback } from 'react'

// ** MUI Components
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useGetAllPurposes, useUpdatePurpose } from 'src/hooks/admin/tenants'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CustomTextField from 'src/@core/components/mui/text-field'
import { useCreateNewPurpose } from 'src/hooks/admin/tenants'
import { useRouter } from 'next/router'
import { GetAllPurposes } from 'src/hooks/admin/types'

interface CellType {
  row: GetAllPurposes
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
    field: 'label',
    headerName: 'Purpose Label',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.label}</Typography>
  }
]

const Purposes = () => {
  // ** State
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [openCreate, setOpenCreate] = useState<boolean>(false)
  const [selectedRowLabel, setSelectedRowLabel] = useState<string>('')
  const [label, setLabel] = useState<string>('')
  const [selectedRowId, setSelectedRowId] = useState<string>()
  const { mutate: createNewPurpose } = useCreateNewPurpose()
  const { mutate: updatePurpose } = useUpdatePurpose()
  const { data: allPurposes } = useGetAllPurposes()
  const router = useRouter()

  // ** Functions
  const handleEditClickOpen = (selectedRow: GetAllPurposes) => {
    setSelectedRowLabel(selectedRow.label)
    setSelectedRowId(selectedRow.id)
    setOpenEdit(true)
  }
  const handleEditClose = () => setOpenEdit(false)
  const handleCreateModal = () => setOpenCreate(true)
  const handleCreateClose = () => setOpenCreate(false)

  const handleAddNewPurpose = useCallback(async () => {
    try {
      // Call the create new label mutation function
      await createNewPurpose({ label })
      setLabel('')

      handleCreateClose()
    } catch (error) {
      console.error('Error creating new label', error)
    }
  }, [label, createNewPurpose])

  const handleUpdatePurpose = useCallback(async () => {
    try {
      // Call the update purpose mutation function
      await updatePurpose({ id: selectedRowId as string, data: { label: selectedRowLabel } })

      handleEditClose()
    } catch (error) {
      console.error('Error updating purpose', error)
    }
  }, [selectedRowId, selectedRowLabel, updatePurpose])

  const handleShowHistories = () => {
    // Hardcoded values for appname and modelname
    const appname = 'transactions';
    const modelname = 'PurposeOfTransaction';

    // Navigate to Histories page with the specified appname and modelname
    router.push(`/histories/${appname}/${modelname}`);
  }

  return (
    <>
      <Card>
        <CardHeader
          title='Purposes'
          titleTypographyProps={{ sx: { mb: [2, 0] } }}
          action={
            <>
              <Button variant='contained' onClick={handleCreateModal} sx={{ mr: 2 }}>
                Add Purpose
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
          rows={allPurposes?.data.results || []}
          rowHeight={62}
          columns={columns}
          pageSizeOptions={[10, 20]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          onRowClick={params => handleEditClickOpen(params.row as GetAllPurposes)}
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
          Add New Purpose
        </DialogTitle>
        <DialogContent>
          <form>
            <Grid>
              <CustomTextField
                fullWidth
                label='Label'
                placeholder='label'
                value={label}
                onChange={e => setLabel(e.target.value)}
              />
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
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleAddNewPurpose}>
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
          Edit Purpose
        </DialogTitle>
        <DialogContent>
          <form>
            <Grid>
              <CustomTextField
                fullWidth
                label='Label'
                placeholder='label'
                value={selectedRowLabel}
                onChange={e => setSelectedRowLabel(e.target.value)}
              />
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
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleUpdatePurpose}>
            Save
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleEditClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Purposes
