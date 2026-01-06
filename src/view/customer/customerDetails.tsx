"use client"
import MainCard from "@/components/dashboard/main-card";
export interface UserData {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
  customer_type?: string; 
  status?: string;      
  createdAt?: string;
  addresses?: {
      addressType?: string;
      addressLine1?: string;
      addressLine2?: string;
      pincode?: string;
      city?:{
        cityName?: string;
      };
      state?:{
        stateName?: string;
      };
      country?:{
        countryName?:string;
      }
  }
}
interface CustomerDetailsProps{
    data:UserData | undefined
}
const CustomerDetails : React.FC<CustomerDetailsProps>=({data}) => {
    if (!data) return <div>No data available</div>;
    return (
        <MainCard title="Customer Details">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center ">
           
                </div>
                <p className="font-semibold text-lg text-blue-700 gap-2">Basic Details:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 mb-6">
                    <div>
                    <div className="font-medium">Customer ID</div>
                    <div className="text-gray-700">{data.user_id}</div>
                    </div>
                    <div>
                    <div className="font-medium">First Name</div>
                    <div className="text-gray-700">{data.first_name}</div>
                    </div>
                    <div>
                    <div className="font-medium">Last Name</div>
                    <div className="text-gray-700">{data.last_name}</div>
                    </div>
                    <div>
                    <div className="font-medium">Email</div>
                    <div className="text-gray-700 break-words max-w-full">
                      {data.email_address}
                     </div>
                    </div>
                    <div>
                    <div className="font-medium">Mobile Number</div>
                    <div className="text-gray-700">{data.phone_number}</div>
                    </div>
                    <div>
                    <div className="font-medium">Created At</div>
                    <div className="text-gray-700">{data.createdAt?.split('T')[0]}</div>
                    </div>
                    <div>
                    <div className="font-medium">Customer Type</div>
                    <div className="text-gray-700">{data.customer_type}</div>
                    </div>
                    <div>
                    <div className="font-medium">Status</div>
                    <div className="text-gray-700">{data.status}</div>
                    </div>
                </div>
                 <hr/>
                 <p className="font-semibold text-lg text-blue-700 gap-2 mt-2">Address:</p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 mb-6">
                    <div>
                       <div className="font-medium">Address Type</div>
                       <div className="text-gray-700">{data?.addresses?.addressType}</div>
                    </div>
                    <div>
                       <div className="font-medium">Address Line 1</div>
                       <div className="text-gray-700">{data?.addresses?.addressLine1}</div>
                    </div>
                    <div>
                       <div className="font-medium">Address Line 2</div>
                       <div className="text-gray-700">{data?.addresses?.addressLine2}</div>
                    </div>
                    <div>
                       <div className="font-medium">Pin  Code</div>
                       <div className="text-gray-700">{data?.addresses?.pincode}</div>
                    </div>
                    <div>
                       <div className="font-medium">City</div>
                       <div className="text-gray-700">{data?.addresses?.city?.cityName}</div>
                    </div>
                    <div>
                       <div className="font-medium">State</div>
                       <div className="text-gray-700">{data?.addresses?.state?.stateName}</div>
                    </div>
                    <div>
                       <div className="font-medium">Country</div>
                       <div className="text-gray-700">{data?.addresses?.country?.countryName}</div>
                    </div>
                 </div>
           </div>
        </MainCard>
    )
}
export default CustomerDetails;
