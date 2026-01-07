"use client"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axiosServices from '@/lib/axios'
import Loader from '@/components/ui/loader'
import CustomerDetails from '@/view/customer/customerDetails'
import PurchaseOrderDetails from '@/view/purchase-order/purchaseOrderDetails'
const PurchaseOrderDetailsPage = () => {
  const [currentData, setCurrentData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {purchaseOrderID}=useParams();
  useEffect(() => {
    if (!purchaseOrderID) return;
    const fetchSingleData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosServices.get(`/api/items-purchase-orders/${purchaseOrderID}`);
        setCurrentData(response?.data?.data);
      } catch (err) {
        if ((err as any)?.code === 'ERR_CANCELED') return;
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSingleData();
  }, [purchaseOrderID])

  if (isLoading) {
    return (
      <Loader/>
    )
  } else {
    return <PurchaseOrderDetails data={currentData}  />
  }
}
export default PurchaseOrderDetailsPage;


