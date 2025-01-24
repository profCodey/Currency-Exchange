import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CustomTextField from 'src/@core/components/mui/text-field'

// import CustomAvatar from 'src/@core/components/mui/avatar'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// import Divider from '@mui/material/Divider'
import CardActions from '@mui/material/CardActions'
import MenuItem from '@mui/material/MenuItem'

// import { UsersType } from 'src/types/apps/userTypes'
// import { ThemeColor } from 'src/@core/layouts/types'

// import { getInitials } from 'src/@core/utils/get-initials'
import { useGetTenantDetails } from 'src/hooks/admin/tenants'
import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'

// interface ColorsType {
//   [key: string]: ThemeColor
// }

// const data: UsersType = {
//   id: 1,
//   name: 'ahmad',
//   companyShortName: 'Ahmad Money',
//   companyFullName: 'Ahmad Money enterprises',
//   companyAddress: 'Lagos',
//   tagline: 'A smarter way to Send Money',
//   taglineNote: 'Send money faster to your loved ones',
//   defaultFeeType: 'Without Fee',
//   phoneNumber: '+44 232-9151',
//   address: 'lagos',
//   role: 'superAdmin',
//   facebookLink: 'www.facebook.com',
//   twitterLink: 'www.twitter.com',
//   websiteUrl: 'www.ahmadMoney.com',
//   youtubeLink: 'www.youtube.com',
//   avatar: '/images/avatars/14.png',
//   playstoreLink: 'www.playstore.com',
//   appstoreLink: 'www.appstore.com'
// }

export const UserDetailsPage = ({ transactionId }: { transactionId: string }) => {
console.log('tenant id', transactionId)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const handleEditClickOpen = () => setOpenEdit(true)
  const { data: tenantDetails, isLoading: tenantDetailsLoading } = useGetTenantDetails(transactionId)

  const handleEditClose = () => setOpenEdit(false)

  return (
    <>
      {!tenantDetailsLoading ? (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ pb: 4 }}>
                <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                  Tenant Details
                </Typography>
                <Box sx={{ pt: 4 }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Name:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{tenantDetails?.data.name}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                      Company Short Name:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{tenantDetails?.data.company_short_name}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Company Full Name:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{tenantDetails?.data.company_full_name}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Company Address:</Typography>
                    <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                      {tenantDetails?.data.company_address}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Company Email:</Typography>
                    <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                      {tenantDetails?.data.company_email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Tagline:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{tenantDetails?.data.tagline}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Tagline Note:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>+1 {tenantDetails?.data.tagline_note}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Default Fee Type:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{tenantDetails?.data.default_fee_type}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Active:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {' '}
                      {tenantDetails?.data.is_active ? 'true' : 'false'}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Facebook Link:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{tenantDetails?.data.facebook_url}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Twitter Link:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{tenantDetails?.data.twitter_url}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Appstore Link:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{tenantDetails?.data.appstore_url}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Playstore Link:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{tenantDetails?.data.playstore_url}</Typography>
                  </Box>
                </Box>
              </CardContent>

              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                  Edit
                </Button>
                <Button color='error' variant='tonal' onClick={() => setSuspendDialogOpen(true)}>
                  Suspend
                </Button>
              </CardActions>

              <Dialog
                open={openEdit}
                onClose={handleEditClose}
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

              <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
            </Card>
          </Grid>
        </Grid>
      ) : null}
    </>
  )
}
export default UserDetailsPage
