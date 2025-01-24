// ** React Imports
import { useState } from 'react'

// ** MUI Components
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetAllTenants } from 'src/hooks/admin/tenants';

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
// import axios from 'axios'

// ** Types Imports
import { GetAllTenants } from './types'
import { useRouter } from 'next/router';

interface CellType {
  row: GetAllTenants
}

const columns: GridColDef[] = [
  {
      flex: 0.1,
      minWidth: 105,
      field: 'name',
      headerName: 'Tenant Name',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.name}</Typography>
  },

  // {
  //   flex: 0.1,
  //   minWidth: 105,
  //   field: 'emailAddress',
  //   headerName: 'Email Adress',
  //   renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.emailAddress}</Typography>
  // },
  {
    flex: 0.1,
    minWidth: 105,
    field: 'company_full_name',
    headerName: 'Company Name',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.company_full_name}</Typography>
  },
]

const AnalyticsProject = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const router = useRouter();
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const { data: allTenants, isLoading: tenantsLoading } = useGetAllTenants();

  const handleFilter = (val: string) => {
    setValue(val)
  }

  return(
  <>
  {!tenantsLoading ? (
    <Card>
      <CardHeader
        title='Tenants'
        titleTypographyProps={{ sx: { mb: [2, 0] } }}
        action={<CustomTextField value={value} placeholder='Search' onChange={e => handleFilter(e.target.value)} />}
        sx={{
          py: 4,
          flexDirection: ['column', 'row'],
          '& .MuiCardHeader-action': { m: 0 },
          alignItems: ['flex-start', 'center']
        }}
      />
      < DataGrid
        autoHeight
        pagination
        rows={allTenants?.data?.results || []}
        rowHeight={62}
        columns={columns}
        pageSizeOptions={[10, 20]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onRowClick={(params) => {
          router.push(`/tenants/tenant-details/${params.row.id}`)
        }}
        sx={{ cursor: 'pointer' }}
      />
    </Card>
  ) : null}

 </>
  )
}

export default AnalyticsProject
