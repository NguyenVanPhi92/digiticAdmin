import { Table } from 'antd'
import Loading from 'components/Loading'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../features/cutomers/customerSlice'
const columns = [
    {
        title: 'SNo',
        dataIndex: 'key'
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length
    },
    {
        title: 'Email',
        dataIndex: 'email'
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile'
    }
]

const Customers = () => {
    // use useSelector to retrieve(truy xuat) customers in Redux store
    const customerstate = useSelector((state) => state.customer.customers)
    const isLoading = useSelector((state) => state.customer.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    const data1 = []
    for (let i = 0; i < customerstate.length; i++) {
        if (customerstate[i].role !== 'admin') {
            data1.push({
                key: i + 1,
                name: customerstate[i].firstname + ' ' + customerstate[i].lastname,
                email: customerstate[i].email,
                mobile: customerstate[i].mobile
            })
        }
    }

    return (
        <div>
            <h3 className='mb-4 title'>Customers</h3>
            <div>{isLoading ? <Loading /> : <Table columns={columns} dataSource={data1} />}</div>
        </div>
    )
}

export default Customers
