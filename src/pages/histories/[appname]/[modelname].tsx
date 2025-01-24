
import React from 'react'
import { useRouter } from 'next/router'
import Histories from 'src/components/Histories'

const HistoryPage = () => {
  const router = useRouter()
  const { appname, modelname } = router.query

  return <Histories appname={appname as string} modelname={modelname as string} />;
}

export default HistoryPage
