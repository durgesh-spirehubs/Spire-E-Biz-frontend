"use client"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axiosServices from '@/lib/axios'
import CustomerDetails from '@/view/customer/customerDetails'
const CustomerDetailsPage = () => {
  const [currentData, setCurrentData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {customerID}=useParams();
  useEffect(() => {
    if (!customerID) return;
    const controller = new AbortController();
    const fetchSingleData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosServices.get(`/api/customers/${customerID}`, { signal: controller.signal });
        setCurrentData(response?.data?.data);
      } catch (err) {
        if ((err as any)?.code === 'ERR_CANCELED') return;
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSingleData();
    return () => controller.abort();
  }, [customerID])

  if (isLoading) {
    return (
    //   <Stack justifyContent='center' alignItems='center' sx={{ width: '100%', py: 2 }}>
    //     <CircularProgress size={50} />

    //   </Stack>
    <div>Loading </div>
    )
  } else {
    return <CustomerDetails data={currentData}  />
  }
}
CustomerDetailsPage.acl = ['Admin', 'Customer']
export default CustomerDetailsPage;
