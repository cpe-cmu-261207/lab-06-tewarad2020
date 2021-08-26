import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route,  useLocation } from 'react-router-dom'
import axios from 'axios'


type datatype = {
    bpi: Record<string , number> | null;
    disclaimer: string;
    time: Record<string, string>;
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Historicalresult = () => {
    let query = useQuery();
    const start = query.get("start")
    const end = query.get("end")

    const [data, setdata] = useState<datatype | null>(null)
    const [loading, setloading] = useState<boolean>(true)
    const [error, seterror] = useState<boolean>(false)

    useEffect(() => {
        axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=${start}&end=${end}`)
        .then (resp => {
            setdata(resp.data)
            setloading(false)
        })
        .catch(err => {
            setloading(false)
            seterror(true)
        })
    },[])

    const showdata = () => {
        if (loading) {
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-2xl'>Loading ...</p>
                </div>
            )
        }else if (error){
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-2xl text-red-500'>There was an error. Please try again later.</p>
                </div>
            )
        }else {
            type dandptype = {
                key: string;
                value: number;
            }
            const dateandprice: dandptype[] = []
            console.log(data)
    
            if(data?.bpi) {
                for (const [key, value] of Object.entries(data?.bpi)) {
                    dateandprice.push({key,value})
                }
            }

            console.log(dateandprice)
            return (
                <div className='text-center space-y-3'>
                    <p className='text-xl font-semibold'> ( From {start} To {end})</p>
                    <ul>
                        {dateandprice.map((e) => <li className='text-xl' key={e.key}>{e.key} - {e.value.toLocaleString()} THB</li> )}
                    </ul>
                </div>
            )
        }
    }

    return (
        <div>
            {showdata()}
        </div>
    )

}

export default Historicalresult