import { Table } from 'antd'
import Loading from 'components/Loading'
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CustomModal from '../components/CustomModal'
import {
    deleteAEnquiry,
    getEnquiries,
    resetState,
    updateAEnquiry
} from '../features/enquiry/enquirySlice'

const columns = [
    {
        title: 'SNo',
        dataIndex: 'key'
    },
    {
        title: 'Name',
        dataIndex: 'name'
    },
    {
        title: 'Email',
        dataIndex: 'email'
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile'
    },
    {
        title: 'Staus',
        dataIndex: 'status'
    },

    {
        title: 'Action',
        dataIndex: 'action'
    }
]

const Enquiries = () => {
    const enqState = useSelector((state) => state.enquiry.enquiries)
    const isLoading = useSelector((state) => state.enquiry.isLoading)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [enqId, setenqId] = useState('')

    useEffect(() => {
        dispatch(resetState())
        dispatch(getEnquiries())
    }, [])

    //Handle
    const showModal = (e) => {
        setOpen(true)
        setenqId(e)
    }
    const hideModal = () => setOpen(false)
    const data1 = []

    for (let i = 0; i < enqState.length; i++) {
        data1.push({
            key: i + 1,
            name: enqState[i].name,
            email: enqState[i].email,
            mobile: enqState[i].mobile,
            status: (
                <>
                    <select
                        name=''
                        defaultValue={enqState[i].status ? enqState[i].status : 'Submitted'}
                        className='form-control form-select'
                        id=''
                        onChange={(e) => setEnquiryStatus(e.target.value, enqState[i]._id)}
                    >
                        <option value='Submitted'>Submitted</option>
                        <option value='Contacted'>Contacted</option>
                        <option value='In Progress'>In Progress</option>
                        <option value='Resolved'>Resolved</option>
                    </select>
                </>
            ),

            action: (
                <>
                    <Link
                        className='ms-3 fs-3 text-danger'
                        to={`/admin/enquiries/${enqState[i]._id}`}
                    >
                        <AiOutlineEye />
                    </Link>
                    <button
                        className='ms-3 fs-3 text-danger bg-transparent border-0'
                        onClick={() => showModal(enqState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            )
        })
    }

    const setEnquiryStatus = (e, i) => {
        console.log(e, i)
        const data = { id: i, enqData: e }
        dispatch(updateAEnquiry(data))
    }

    const deleteEnq = (e) => {
        dispatch(deleteAEnquiry(e))
        setOpen(false)
        setTimeout(() => {
            dispatch(getEnquiries())
        }, 100)
    }

    return (
        <div>
            <h3 className='mb-4 title'>Enquiries</h3>
            <div>{isLoading ? <Loading /> : <Table columns={columns} dataSource={data1} />}</div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteEnq(enqId)
                }}
                title='Are you sure you want to delete this enquiry?'
            />
        </div>
    )
}

export default Enquiries
