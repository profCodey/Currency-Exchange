// pages/tenant-details/[id].tsx

import React from 'react'
import { useRouter } from 'next/router'
import UserDetailsPage from '../TenantDetails'

const TenantDetails = () => {
  const router = useRouter()
  const { id } = router.query

  return <UserDetailsPage tenantId={id as string} />
}

export default TenantDetails
