import Loading from 'components/Loading'
import TableEl from 'components/Table'
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CustomModal from '../components/CustomModal'
import { deleteACoupon, getAllCoupon } from '../features/coupon/couponSlice'

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
        title: 'Discount',
        dataIndex: 'discount',
        sorter: (a, b) => a.discount - b.discount
    },
    {
        title: 'Expiry',
        dataIndex: 'expiry',
        sorter: (a, b) => a.name.length - b.name.length
    },
    {
        title: 'Action',
        dataIndex: 'action'
    }
]

const Couponlist = () => {
    const couponState = useSelector((state) => state.coupon.coupons)
    const isLoading = useSelector((state) => state.coupon.isLoading)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [couponId, setcouponId] = useState('')

    useEffect(() => {
        dispatch(getAllCoupon())
    }, [])

    // handle
    const showModal = (e) => {
        setOpen(true)
        setcouponId(e)
    }

    const hideModal = () => {
        setOpen(false)
    }

    const data1 = []
    for (let i = 0; i < couponState.length; i++) {
        data1.push({
            key: i + 1,
            name: couponState[i].name,
            discount: couponState[i].discount,
            expiry: new Date(couponState[i].expiry).toLocaleString(),
            action: (
                <>
                    <Link to={`/admin/coupon/${couponState[i]._id}`} className=' fs-3 text-danger'>
                        <BiEdit />
                    </Link>
                    <button
                        className='ms-3 fs-3 text-danger bg-transparent border-0'
                        onClick={() => showModal(couponState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            )
        })
    }
    const deleteCoupon = (e) => {
        dispatch(deleteACoupon(e))

        setOpen(false)
        setTimeout(() => {
            dispatch(getAllCoupon())
        }, 100)
    }
    return (
        <div>
            <h3 className='mb-4 title'>Coupons</h3>
            <div>{isLoading ? <Loading /> : <TableEl columns={columns} dataSource={data1} />}</div>

            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteCoupon(couponId)
                }}
                title='Are you sure you want to delete this Coupon?'
            />
        </div>
    )
}

export default Couponlist
