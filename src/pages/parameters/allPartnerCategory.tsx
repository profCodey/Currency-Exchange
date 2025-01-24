// ** React Imports
import { useState, useCallback, useEffect } from 'react'

// ** MUI Components
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
  useGetPartnerCategory,
  useUpdatePartnerCategory,
  useDeletePartnerCategory,
  useCreatePartnerCategory
} from 'src/hooks/admin/partnerCategory'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CustomTextField from 'src/@core/components/mui/text-field'

// import { useRouter } from 'next/router'
import { GetPartnerCategory } from 'src/hooks/admin/types'
import ActionsMenu from 'src/components/ActionMenu'

interface CellType {
  row: GetPartnerCategory & { sn: number }
}

const PartnerCategory = () => {
  // ** State
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [openCreate, setOpenCreate] = useState<boolean>(false)
  const [selectedRowLabel, setSelectedRowLabel] = useState<string>('')
  const [label, setLabel] = useState<string>('')
  const [selectedRowId, setSelectedRowId] = useState<string>()
  const [selectedRow, setSelectedRow] = useState<GetPartnerCategory | null>(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
  const [serialNumbers, setSerialNumbers] = useState<number[]>([])

  const { mutate: createNewCategory } = useCreatePartnerCategory()
  const { mutate: updateCategory } = useUpdatePartnerCategory()
  const { data: allPartnerCategory } = useGetPartnerCategory()
    const { mutate: deleteCategory } = useDeletePartnerCategory()


  // const router = useRouter()

  // ** Functions
  const handleEditClickOpen = (selectedRow: GetPartnerCategory) => {
    setSelectedRowLabel(selectedRow.label)
    setSelectedRowId(selectedRow.id)
    setOpenEdit(true)
  }
  const handleEditClose = () => {
    setOpenEdit(false)
    setSelectedRowLabel('')
    setSelectedRowId('')
  }
  const handleCreateModal = () => setOpenCreate(true)
  const handleCreateClose = () => {
    setOpenCreate(false)
    setLabel('')
  }

  const handleAddNewCategory = useCallback(async () => {
    try {
      // Call the create new label mutation function
      await createNewCategory({ label })
      setLabel('')

      handleCreateClose()
    } catch (error) {
      console.error('Error creating new Category', error)}
  }, [label, createNewCategory])

  const handleDelete = (selectedRow: GetPartnerCategory) => {
    setSelectedRow(selectedRow)
    setShowDeleteConfirmation(true)
  }

  const handleConfirmDelete = () => {
    if (selectedRow) {
        deleteCategory(selectedRow.id)
        setShowDeleteConfirmation(false)
        setSelectedRow(null)
    }
}

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false)
        setSelectedRow(null)
    }   




  const handleUpdateCategory = useCallback(async () => {
    try {
      // Call the update Category mutation function
      await updateCategory({ id: selectedRowId as string, data: { label: selectedRowLabel } })

      handleEditClose()
    } catch (error) {
      console.error('Error updating Category', error)
    }
  }, [selectedRowId, selectedRowLabel, updateCategory])

  const handleShowHistories = () => {
    // // Hardcoded values for appname and modelname
    // const appname = 'transactions'
    // const modelname = 'PurposeOfTransaction'

    // // Navigate to Histories page with the specified appname and modelname
    // router.push(`/histories/${appname}/${modelname}`)
  }

  const generateSerialNumbers = useCallback((data: GetPartnerCategory[]) => {
    const sn = data.map((_, index) => index + 1)
    setSerialNumbers(sn)
    }, [])

    useEffect(() =>{
        if (allPartnerCategory) {
            generateSerialNumbers(allPartnerCategory)
        }
    }, [allPartnerCategory, generateSerialNumbers])

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
      field: 'label',
      headerName: 'Category Label',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.label}</Typography>
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

  return (
    <>
      <Card>
        <CardHeader
          title='Partner Categories'
          titleTypographyProps={{ sx: { mb: [2, 0] } }}
          action={
            <>
              <Button variant='contained' onClick={handleCreateModal} sx={{ mr: 2 }}>
                Add Category
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
          rows={allPartnerCategory?.map((row,index) => ({ ...row, sn: serialNumbers[index] })) || []}
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
          Add New Category
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
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleAddNewCategory}>
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
          Edit Category
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
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleUpdateCategory}>
            Save
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
          <Typography>Are you sure you want to delete this category?</Typography>
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

export default PartnerCategory
