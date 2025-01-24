// ** React Imports
import { useState, useEffect, ReactElement, SyntheticEvent, Dispatch, SetStateAction } from 'react'

// ** MUI Components
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'
import { useGetSingleTransaction } from 'src/hooks/admin/transactions'

// ** Type Import

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Import
import SingleTransaction from './transaction-details'
import Recipent from './recipients'

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 38,
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 130
    }
  }
}))

interface TransactionProps {
  transactionId: number | null
  setShowSingleTransaction: Dispatch<SetStateAction<boolean>>
  setShowAllTransaction: Dispatch<SetStateAction<boolean>>
}

const Transaction = ({ transactionId, setShowSingleTransaction, setShowAllTransaction }: TransactionProps) => {
  const tab = 'transaction-details'
  const { data: singleTransaction } = useGetSingleTransaction(transactionId?.toString() || '')

  // ** State
  const [activeTab, setActiveTab] = useState<string>(tab || 'transaction-details')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // ** Hooks
  const hideText = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  const handleChange = (event: SyntheticEvent, value: string) => {
    setIsLoading(true)
    setActiveTab(value)
    setIsLoading(false)
    if (value === 'transaction-details') {
      console.log('transaction-details')
    } else if (value === 'recipients') {
      console.log('recipients')
    }
  }
  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const tabContentList: { [key: string]: ReactElement } = {
    'transaction-details': <SingleTransaction singleTransaction={singleTransaction} />,
    recipients: <Recipent recipients={singleTransaction?.data?.recipients} />

    // projects: <Projects data={data as ProjectsTabType[]} />,
    // connections: <Connections data={data as ConnectionsTabType[]} />
  }

  function handleBack() {
    setShowAllTransaction(true)
    setShowSingleTransaction(false)
  }

  return (
    <Grid container spacing={6}>
      <Typography sx={{ ml: 10, mt: 10, fontWeight: 700, cursor: 'pointer' }} onClick={handleBack}>
        {' '}
        Back
      </Typography>
      {activeTab === undefined ? null : (
        <Grid item xs={12}>
          <TabContext value={activeTab}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <TabList
                  variant='scrollable'
                  scrollButtons='auto'
                  onChange={handleChange}
                  aria-label='customized tabs example'
                >
                  <Tab
                    value='transaction-details'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Icon fontSize='1.125rem' icon='tabler:user-check' />
                        {!hideText && 'Transaction Details'}
                      </Box>
                    }
                  />
                  <Tab
                    value='recipients'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Icon fontSize='1.125rem' icon='tabler:users' />
                        {!hideText && 'Recipients'}
                      </Box>
                    }
                  />
                </TabList>
              </Grid>
              <Grid item xs={12}>
                {isLoading ? (
                  <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <CircularProgress sx={{ mb: 4 }} />
                    <Typography>Loading...</Typography>
                  </Box>
                ) : (
                  <TabPanel sx={{ p: 0 }} value={activeTab}>
                    {tabContentList[activeTab]}
                  </TabPanel>
                )}
              </Grid>
            </Grid>
          </TabContext>
        </Grid>
      )}
    </Grid>
  )
}

export default Transaction
