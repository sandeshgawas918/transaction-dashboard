"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'

function TransactionDashboard() {
    const [allUsers, setallUsers] = useState([])
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    const [transactionArray, settransactionArray] = useState([])
    const [input, setinput] = useState('')
    const [tempArray, settempArray] = useState([])
    const [asc, setasc] = useState(false)
    const [pageNo, setpageNo] = useState(1)
    const [query, setquery] = useState('')

    const fetchAllUsers = async () => {
        try {
            setloading(true)
            let res = await axios.get('https://jsonplaceholder.typicode.com/users')
            setallUsers(res.data)
            console.log(res.data)
        } catch (error) {
            seterror(error.message)
            setloading(false)
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    const getRandomStatus = () => {
        let randomNum = Math.floor(Math.random() * 3)
        if (randomNum == 0) { return "success" }
        if (randomNum == 1) { return "failed" }
        if (randomNum == 2) { return "pending" }
    }

    const transformedArray = () => {
        const newArray = allUsers.map((user) => {
            return {
                id: user.id,
                merchant: user.company.name,
                amount: Math.round(Math.random() * 800) + 200,
                status: getRandomStatus(),
                date: new Date().toISOString()
            }
        })
        settransactionArray(newArray)
        settempArray(newArray)
        console.log("newArray", newArray)
    }

    // useEffect(() => {
    //     const newArray = transactionArray.filter((t) => {
    //         return t.merchant.toLowerCase().includes(input.toLowerCase())
    //     })
    //     settempArray(newArray)
    //     console.log(newArray)
    // }, [input])


    useEffect(() => {
        fetchAllUsers()
    }, [])

    const filterArray = (val) => {
        if (val === "success") {
            let newArray = transactionArray.filter((t) => {
                return t.status === "success"
            })
            settempArray(newArray)
        }
        else if (val == "failed") {
            let newArray = transactionArray.filter((t) => {
                return t.status == "failed"
            })
            settempArray(newArray)
        } else if (val == "pending") {
            let newArray = transactionArray.filter((t) => {
                return t.status == "pending"
            })
            settempArray(newArray)
        } else {
            settempArray(transactionArray)
            return
        }
    }

    const calculateSum = () => {
        const resultSum = transactionArray.filter((t) => {
            return t.status == "success"
        }).reduce((acc, curr) => acc + curr.amount, 0)
        return resultSum
    }

    const sortByAmount = () => {
        setasc(!asc)
        const newArray = [...transactionArray].sort((a, b) => {
            return asc ? a.amount - b.amount : b.amount - a.amount
        })
        settempArray(newArray)
        console.log('sorted')
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setquery(input)
        }, 1000);

        return () => {
            clearTimeout(timer)
        }
    }, [input])

    useEffect(() => {
        if (query) {
            const newArray = transactionArray.filter((t) => {
                return t.merchant.toLowerCase().includes(query.toLowerCase())
            })
            settempArray(newArray)
            console.log(newArray)
        } else if (!query) {
            settempArray(transactionArray)
        }
    },[query,transactionArray])

    let dataPerPage = 5
    let start = (dataPerPage * pageNo) - dataPerPage
    let end = dataPerPage * pageNo

    let paginatedData = tempArray.slice(start, end)

    return (
        <div className=' flex flex-col gap-4 border p-5 mt-5'>
            {
                error && <div><p className='text-red-500 text-xl font-semibold'>{error}</p></div>
            }
            <div>
                <button onClick={transformedArray} className='bg-amber-500 text-white px-3 p-2'>Transform</button>
            </div>
            <div>
                <input value={input} onChange={(e) => { setinput(e.target.value) }} type="text" className='border-2 p-3 w-full rounded' placeholder='search by merchant name' />
            </div>
            <div>
                <select onChange={(e) => { filterArray(e.target.value) }} className='border-2 p-2'>
                    <option value="all">All</option>
                    <option value="success">success</option>
                    <option value="failed">failed</option>
                    <option value="pending">pending</option>
                </select>
            </div>
            <div>
                Total tansaction : {tempArray.length}

                <br></br>
                sum of amounts for transactions with status SUCCESS : {calculateSum()}
            </div>

            {
                loading ?
                    <div>
                        <h1 className='text-3xl font-bold'>Loading...</h1>
                    </div>
                    :
                    <div className='w-full'>
                        <table className="border w-full">
                            <thead className="border">
                                <tr className="border">
                                    <th className="border p-3">Id</th>
                                    <th className="border">Merchant</th>
                                    <th className="border">
                                        <div className=' flex flex-row justify-between'>
                                            <span>Amount</span>
                                            <button onClick={sortByAmount} className='ms-2 text-blue-500 bg-gray-300 text-sm px-2 rounded-full'>Sort</button>
                                        </div>
                                    </th>
                                    <th className="border">status</th>
                                    <th className="border">date</th>
                                </tr>
                            </thead>
                            <tbody className="border">
                                {
                                    paginatedData && paginatedData.map((user) => {
                                        return (
                                            <tr key={user.id} className="border p-3">
                                                <td className="border p-2 px-3">{user.id}</td>
                                                <td className="border">{user.merchant}</td>
                                                <td className="border">{user.amount}</td>
                                                <td className="border">{user.status}</td>
                                                <td className="border">{user.date}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
            }

            <div className='flex flex-row justify-center items-center gap-4'>
                {
                    [...Array(2)].map((item, index) => {
                        return (
                            <button key={index} onClick={() => { setpageNo(index + 1) }} className='bg-gray-500 text-white font-semibold p-2 rounded-full px-4'>{index + 1}</button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TransactionDashboard