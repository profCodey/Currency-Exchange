// ** React Imports
import { useState, useCallback } from 'react'

// ** MUI Components
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useGetAllRoles } from 'src/hooks/admin/tenants'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CustomTextField from 'src/@core/components/mui/text-field'
import { useCreateNewRole } from 'src/hooks/admin/tenants'

import { StaffRoles } from 'src/hooks/admin/types'

interface CellType {
  row: StaffRoles
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
    headerName: 'Staff Role',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.name}</Typography>
  }
]

const Roles = () => {
  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [openCreate, setOpenCreate] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const { mutate: createNewRole } = useCreateNewRole()
  const { data: allRoles } = useGetAllRoles()

  // ** Functions
 
  const handleCreateModal = () => setOpenCreate(true)
  const handleCreateClose = () => setOpenCreate(false)

  const handleAddNewRole = useCallback(async () => {
    try {
      // Call the create new label mutation function
      await createNewRole({ name })
      setName('')

      handleCreateClose()
    } catch (error) {
      console.error('Error creating new label', error)
    }
  }, [name, createNewRole])

 
  return (
    <>
      <Card>
        <CardHeader
          title='Roles'
          titleTypographyProps={{ sx: { mb: [2, 0] } }}
          action={
            <>
              <Button variant='contained' onClick={handleCreateModal}>
                Add New Role
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
          rows={allRoles?.data.results || []}
          rowHeight={62}
          columns={columns}
          pageSizeOptions={[10, 20]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
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
          Create New Role
        </DialogTitle>
        <DialogContent>
          <form>
            <Grid>
              <CustomTextField
                fullWidth
                label='Name'
                placeholder='name'
                value={name}
                onChange={e => setName(e.target.value)}
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
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleAddNewRole}>
            Create
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleCreateClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

  
    </>
  )
}

export default Roles
