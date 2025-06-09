import {useState} from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { BsFillHandbagFill } from "react-icons/bs";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaHandHoldingDollar } from "react-icons/fa6";
import AreaChart from "@/components/Area-chart/page.tsx";

type FirstInfoCardsType = {
    totalCustomers: number;
    todayOrders: number;
    monthlyRevenue: number;
    monthlyIncome: number;

}

const AdminDashboard = () => {
    const [firstInfoCards, setFirstInfoCards] = useState<FirstInfoCardsType>({
        totalCustomers: 1000,
        todayOrders: 1001,
        monthlyRevenue: 1002,
        monthlyIncome: 1003,
    })

    return (
        <div className="w-full flex-1 flex flex-col gap-4">

            {/* First Information cards */}
            <div className="bg-white flex flex-wrap font-poppins   gap-4">

                {/*1st card*/}
                <div className="min-w-60 p-4  rounded-lg shadow-md bg-blue-100 border border-gray-200">
                  <h2 className="text-[13px] font-normal mb-2 text-gray-600 flex gap-1">
                      <HiMiniUsers className='mt-[2px]'/>
                      Total Customers
                  </h2>
                  <p className='text-lg font-bold text-blue-600'>{firstInfoCards.totalCustomers}</p>
                </div>

                {/*2st card*/}
                <div className="min-w-60 p-4  rounded-lg shadow-md bg-yellow-100 border border-gray-200">
                    <h2 className="text-[13px] font-normal mb-2 text-gray-600 flex gap-1">
                        <BsFillHandbagFill className='mt-[2px]'/>
                        Today Orders
                    </h2>
                    <p className='text-lg font-bold text-yellow-600'>{firstInfoCards.todayOrders}</p>
                </div>

                {/*3st card*/}
                <div className="min-w-60 p-4  rounded-lg shadow-md bg-red-100 border border-gray-200">
                    <h2 className="text-[13px] font-normal mb-2 text-gray-600 flex gap-1">
                        <AiFillDollarCircle className='mt-[2px]'/>
                        Monthly Revenue
                    </h2>
                    <p className='text-lg font-bold text-red-600'>{firstInfoCards.monthlyRevenue}</p>
                </div>

                {/*4st card*/}
                <div className="min-w-60 p-4  rounded-lg shadow-md bg-green-100 border border-gray-200">
                    <h2 className="text-[13px] font-normal mb-2 text-gray-600 flex gap-1">
                        <FaHandHoldingDollar className='mt-[2px]'/>
                        Monthly Income
                    </h2>
                    <p className='text-lg font-bold text-green-600'>{firstInfoCards.monthlyIncome}</p>
                </div>

            </div>

            {/*Area Chart*/}
            <AreaChart />
        </div>
    )
}

export default AdminDashboard