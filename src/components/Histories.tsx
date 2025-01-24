// ** React Imports
import { useState } from 'react'

// ** MUI Components
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

// import Grid from '@mui/material/Grid'
// import Button from '@mui/material/Button'
// import Dialog from '@mui/material/Dialog'
// import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
// import DialogTitle from '@mui/material/DialogTitle'
// import CustomTextField from 'src/@core/components/mui/text-field'
import { GetAllHistories } from 'src/hooks/admin/types'
import { useGetAllHistories } from 'src/hooks/admin/histories'

interface CellType {
  row: GetAllHistories
}
const getBackgroundColor = (type: string) => {
  switch (type) {
    case '+':
      return '#28a744'
    case '-':
      return '#dc3444'
    case '~':
      return '#027bff'

    // case 'failed':
    //   return '#dc3444'
    // case 'successful':
    //   return '#28a744'
    // case 'cancelled':
    //   return '#343a3f'
    default:
      return 'white' // Default color
  }
}
const useTruncateState = (initialState: boolean) => {
  const [truncate, setTruncate] = useState(initialState);

  const handleToggleTruncate = () => {
    setTruncate(!truncate);
  };

  return [truncate, handleToggleTruncate] as const;
};

const ColumnsComponent = ({ row }: CellType) => {
  const fields = row.fields;

  // Convert fields object to string (e.g., "id: 8, label: Loans")
  const fieldsString = Object.entries(fields)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');

  const [truncate, handleToggleTruncate] = useTruncateState(true);

  const truncatedContent = truncate ? fieldsString.slice(0, 20) : fieldsString;

  return (
    <>
      <Typography sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap' }}>
        {truncatedContent}
      </Typography>
      {fieldsString.length > 20 && (
        <Button variant="text" onClick={handleToggleTruncate}>
          {truncate ? 'View More' : 'View Less'}
        </Button>
      )}
    </>
  );
};

const columns: GridColDef[] = [
  {
    flex: 0.1,
    minWidth: 190,
    maxWidth: 200,
    field: 'history_user__email',
    headerName: 'Updated By',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.history_user__email}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 150,
    maxWidth: 190,
    field: 'history_date',
    headerName: 'Date',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{new Date(row.history_date).toLocaleString()}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 105,
    maxWidth: 150,
    field: 'history_type',
    headerName: 'Type',
    renderCell: ({ row }: CellType) => (
      <Typography
        sx={{
          color: 'white',
          background: getBackgroundColor(row.history_type),
          borderRadius: '12px',
          px: '10px',
          py: '3px'
        }}
      >
        {mapHistoryType(row.history_type)}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 400,
    field: 'fields',
    headerName: 'Fields',
    renderCell: ColumnsComponent,
  },
]

// Helper function to map history types to display values
const mapHistoryType = (type: string) => {
  switch (type) {
    case '+':
      return 'Created'
    case '-':
      return 'Deleted'
    case '~':
      return 'Updated'
    default:
      return type // Return the original type if not matched
  }
}

interface HistoriesProps {
  appname: string
  modelname: string
}

const Histories = ({ appname, modelname }: HistoriesProps) => {
  const { data: allHistories } = useGetAllHistories(appname, modelname)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const router = useRouter()

  const handleCloseButtonClick = () => {
    // Navigate back to the previous page
    router.back()
  }

  return (
    <>
      <Card>
        <CardHeader
          title='History'
          titleTypographyProps={{ sx: { mb: [2, 0] } }}
          action={
            <>
              <Button variant='contained' onClick={handleCloseButtonClick}>
                Close
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
          rows={allHistories?.data || []}
          rowHeight={62}
          columns={columns}
          pageSizeOptions={[10, 20]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          getRowId={row => row.history_user_email + row.history_date + row.history_type}
        />
      </Card>

      {/* <Dialog
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
      </Dialog> */}
    </>
  )
}

export default Histories
