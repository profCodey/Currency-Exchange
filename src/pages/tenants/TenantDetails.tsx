import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CustomTextField from 'src/@core/components/mui/text-field'
import Tab from '@mui/material/Tab'
import { TabContext, TabPanel } from '@mui/lab'
import Tabs from '@mui/material/Tabs'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// import Divider from '@mui/material/Divider'
import CardActions from '@mui/material/CardActions'
import MenuItem from '@mui/material/MenuItem'
import { useGetTenantDetails } from 'src/hooks/admin/tenants'
import { useRouter } from 'next/router'

export const UserDetailsPage = ({ tenantId }: { tenantId: string }) => {
  const router = useRouter()
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const { data: tenantDetails, isLoading: tenantDetailsLoading } = useGetTenantDetails(tenantId)
  const [tabValue, setTabValue] = useState(0)

  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)
  const handleClose = () => router.push('/tenants/tenant-list/')
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <>
      {!tenantDetailsLoading ? (
        <TabContext value={tabValue}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ pb: 4 }}>
                  <Tabs value={tabValue} onChange={handleChangeTab}>
                    <Tab label='Tenant Details' />
                    <Tab label='Users List' />
                  </Tabs>
                  <TabPanel value={0}>
                    <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                      Tenant Details
                    </Typography>
                    <Box sx={{ pt: 4 }}>
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                          Name:
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{tenantDetails?.data.name}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                          Company Short Name:
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                          {tenantDetails?.data.company_short_name}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                          Company Full Name:
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                          {tenantDetails?.data.company_full_name}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                          Company Address:
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                          {tenantDetails?.data.company_address}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                          Company Email:
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                          {tenantDetails?.data.company_email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                          Tagline:
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{tenantDetails?.data.tagline}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                          Tagline Note:
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>+1 {tenantDetails?.data.tagline_note}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                          Default Fee Type:
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{tenantDetails?.data.default_fee_type}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                          Active:
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                          {' '}
                          {tenantDetails?.data.is_active ? 'true' : 'false'}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', mb: 3 }}>
                        <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                          Facebook Link:
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{tenantDetails?.data.facebook_url}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                          Twitter Link:
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{tenantDetails?.data.twitter_url}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                          Appstore Link:
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{tenantDetails?.data.appstore_url}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary', width: 180 }}>
                          Playstore Link:
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{tenantDetails?.data.playstore_url}</Typography>
                      </Box>
                    </Box>
                    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                        Edit
                      </Button>
                      <Button color='error' variant='tonal' onClick={handleClose}>
                        Close
                      </Button>
                    </CardActions>
                  </TabPanel>
                  <TabPanel value={1}>
                    <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                      Users List
                    </Typography>
                    <Box sx={{ pt: 4 }}>
                      <Typography variant='h6' sx={{ color: 'text.secondary', mb: 3 }}>
                        User List is empty
                      </Typography>
                    </Box>
                  </TabPanel>
                </CardContent>

                <Dialog
                  open={openEdit}
                  onClose={handleEditClose}
                  aria-labelledby='user-view-edit'
                  aria-describedby='user-view-edit-description'
                  sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
                >
                  <DialogTitle
                    id='tenant-details-edit'
                    sx={{
                      textAlign: 'center',
                      fontSize: '1.5rem !important',
                      px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                      pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                  >
                    Edit User Information
                  </DialogTitle>
                  <DialogContent
                    sx={{
                      pb: theme => `${theme.spacing(8)} !important`,
                      px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                    }}
                  >
                    <DialogContentText
                      variant='body2'
                      id='user-view-edit-description'
                      sx={{ textAlign: 'center', mb: 7 }}
                    >
                      Updating user details will receive a privacy audit.
                    </DialogContentText>
                    <form>
                      <Grid container spacing={6}>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            fullWidth
                            label='Name'
                            placeholder='John Doe'
                            defaultValue={tenantDetails?.data.name}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            fullWidth
                            label='Company Short Name'
                            placeholder='John Doe'
                            defaultValue={tenantDetails?.data.company_short_name}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            fullWidth
                            label='Company Full Name'
                            defaultValue={tenantDetails?.data.company_full_name}
                            placeholder='john Doe'
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            fullWidth
                            type='email'
                            label='Company Email'
                            defaultValue={tenantDetails?.data.company_email}
                            placeholder='john Doe'
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            fullWidth
                            label='Company Address'
                            defaultValue={tenantDetails?.data.company_address}
                            placeholder='john Doe'
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            fullWidth
                            label='Tagline'
                            defaultValue={tenantDetails?.data.tagline}
                            placeholder='john Doe'
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            fullWidth
                            label='Tagline Note'
                            defaultValue={tenantDetails?.data.tagline_note}
                            placeholder='john Doe'
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            select
                            fullWidth
                            label='Default Fee Type'
                            defaultValue={tenantDetails?.data.default_fee_type}
                          >
                            <MenuItem value='pending'>Without Fee</MenuItem>
                            <MenuItem value='active'>With Fee</MenuItem>
                          </CustomTextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            select
                            fullWidth
                            label='Active'
                            defaultValue={tenantDetails?.data.is_active ? 'true' : 'false'}
                            placeholder='true'
                          >
                            <MenuItem value='pending'>false</MenuItem>
                            <MenuItem value='active'>true</MenuItem>
                          </CustomTextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            fullWidth
                            label='Facebook Link'
                            placeholder='facebook'
                            defaultValue={tenantDetails?.data.facebook_url}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            fullWidth
                            label='Twitter Link'
                            placeholder='twitter'
                            defaultValue={tenantDetails?.data.twitter_url}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            fullWidth
                            label='Appstore Link'
                            placeholder='appstore'
                            defaultValue={tenantDetails?.data.appstore_url}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            fullWidth
                            label='Playstore Link'
                            placeholder='playstore'
                            defaultValue={tenantDetails?.data.playstore_url}
                          />
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
                    <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClose}>
                      Submit
                    </Button>
                    <Button variant='tonal' color='secondary' onClick={handleEditClose}>
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </Card>
            </Grid>
          </Grid>
        </TabContext>
      ) : null}
    </>
  )
}
export default UserDetailsPage
