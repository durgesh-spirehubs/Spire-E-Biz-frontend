// // ** Third Party Imports
// import { CircularProgress, Stack } from '@mui/material'
// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'
// import axiosService from 'src/@core/utils/axios'
// import DoctorDetails from 'src/views/doctors/DoctorDetails'

// const DoctorDetailsPage = () => {
//   const [currentData, setCurrentData] = useState(undefined)
//   const [isLoading, setIsLoading] = useState(true)

//   const {
//     query: { customerID }
//   } = useRouter()

//   const fetchSingleData = async () => {
//     setIsLoading(true)
//     const response = await axiosService.get(`/api/doctors/${customerID}`)
//     setCurrentData(response?.data?.data)
//     setIsLoading(false)
//   }
//   useEffect(() => {
//     if (customerID) {
//       fetchSingleData()
//     }
//   }, [customerID])

//   if (isLoading) {
//     return (
//       <Stack justifyContent='center' alignItems='center' sx={{ width: '100%', py: 2 }}>
//         <CircularProgress size={50} />
//       </Stack>
//     )
//   } else {
//     return <DoctorDetails data={currentData} fetchSingleData={fetchSingleData} />
//   }
// }
// DoctorDetailsPage.acl = ['Admin', 'Organization']

// export default DoctorDetailsPage
