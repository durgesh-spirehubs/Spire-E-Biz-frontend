"use client"
import MainCard from "@/components/dashboard/main-card";
import { Fragment } from "react/jsx-runtime";
export interface PurchaseOrderData {
  id: number;
  supplier_id: string;
  total_items:number;
  service_type:string;
  number_of_weeks:string;
  overallPrice:number,
  genratePurchaseOrderId:string
  genrateQuotationRequestId:string
  estimatedDeliveryDate:string
  reEstimatedDeliveryDate:string
  purchaseOrderStatus:string
  status?: string;      
  createdAt?: string;
  products?: [{
      quantity?: number
      receivedQuantity?:number
      price?: number;
      tax?:number;
      totalPrice?:number;
      receivedStatus?:string
  }]
}
interface PurchaseOrderDetailsProps{
    data:PurchaseOrderData | undefined
}
const PurchaseOrderDetails =({data}: PurchaseOrderDetailsProps) => {
    if (!data) return <div>No data available</div>;
    return (
        <MainCard title="Purchase Order Details">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="font-semibold text-lg text-blue-700 gap-2">Purchase Order Details:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 mb-6">
                    <div>
                    <div className="font-medium">Purchase Order ID</div>
                    <div className="text-gray-700">{data.genratePurchaseOrderId}</div>
                    </div>
                    <div>
                    <div className="font-medium">Created at:</div>
                    <div className="text-gray-700">{data.createdAt?.split('T')[0]}</div>
                    </div>
                    <div>
                    <div className="font-medium">Estimated Delivery Date</div>
                    <div className="text-gray-700">{data.estimatedDeliveryDate?.split('T')[0]}</div>
                    </div>
                    <div>
                    <div className="font-medium">Service Type</div>
                    <div className="text-gray-700 break-words max-w-full">
                      {data.service_type}
                     </div>
                    </div>
                </div>
                 <hr/>
                 <p className="font-semibold text-lg text-blue-700 gap-2 mt-2">Products Detail:</p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 mb-6">
                    {data?.products?.map((product,index)=>(
                    
                     <Fragment key={index}>
                    <div>
                       <div className="font-medium"> Quantity</div>
                       <div className="text-gray-700">{product?.quantity}</div>
                    </div>
                    <div>
                       <div className="font-medium">Received Quantity</div>
                       <div className="text-gray-700">{product?.receivedQuantity}</div>
                    </div>
                    <div>
                       <div className="font-medium">Price</div>
                       <div className="text-gray-700">{product?.price}</div>
                    </div>
                    <div>
                       <div className="font-medium">Tax</div>
                       <div className="text-gray-700">{product?.tax}</div>
                    </div>
                    <div>
                       <div className="font-medium">Total Price</div>
                       <div className="text-gray-700">{product?.totalPrice}</div>
                    </div>
                    <div>
                       <div className="font-medium">Status</div>
                       <div className="text-gray-700">{product?.receivedStatus}</div>
                    </div>
                     </Fragment >
                    )
                )
                }
           </div>
           </div>
        </MainCard>
    )
}
export default PurchaseOrderDetails;
