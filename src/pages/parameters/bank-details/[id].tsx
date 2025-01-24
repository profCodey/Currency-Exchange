import React from 'react'
import { useRouter } from 'next/router'
import { BankDetailsPage } from '../BankDetails'

const BankDetails = () => {
  const router = useRouter()
  const { id } = router.query
 

  return (
  <div>
      <BankDetailsPage bankId={id as string} />
  </div>
  )
}

export default BankDetails
