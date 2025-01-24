// pages/tenant-details/[id].tsx

import React from 'react'
import { useRouter } from 'next/router'
import CurrencyDetailsPage from '../currencyDetails'


const TenantDetails = () => {
  const router = useRouter()
  const { id } = router.query

  return <CurrencyDetailsPage currencyId={id as string} />
}

export default TenantDetails
