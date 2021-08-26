import { useEffect, useState } from "react";
import axios from 'axios'

type bpitype = {
    USD: {
        code: string;
        rate: number;
        description: string;
        rate_float: number;
    };
    THB: {
        code: string;
        rate: number;
        description: string;
        rate_float: number;
    };
}

type timetype = {
    updated: string;
    updatedISO: string;
    updateduk: string;
}

type datatype = {
    time: timetype;
    disclaimer: string;
    bpi: bpitype;
}

const Current = () => {
    const [data, setdata] = useState<datatype | null>(null)
    const [loading, setloading] = useState<boolean>(true)
    const [error, seterror] = useState<boolean>(false)

    useEffect(() => {
        axios.get('https://api.coindesk.com/v1/bpi/currentprice/thb.json')
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
                    <p className='text-2xl font-semibold'>Current price</p>
                    <p className='text-2xl'>Loading ...</p>
                </div>
            )
        }else if (error) {
            return (
            <div className='text-center space-y-3'>
                <p className='text-2xl font-semibold'>Current price</p>
                <p className='text-2xl text-red-500'>There was an error. Please try again later.</p>
            </div>
            )
        }else {
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Current price</p>
                    <p className='text-2xl'>{data?.bpi.THB.rate_float .toLocaleString()} THB</p>
                    <p> (Last updated {data?.time.updated}) </p>
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

export default Current