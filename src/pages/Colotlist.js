import Loading from 'components/Loading'
import TableEl from 'components/Table'
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CustomModal from '../components/CustomModal'
import { deleteAColor, getColors } from '../features/color/colorSlice'

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
        title: 'Action',
        dataIndex: 'action'
    }
]

const Colorlist = () => {
    const colorState = useSelector((state) => state.color.colors)
    const isLoading = useSelector((state) => state.color.isLoading)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [colorId, setcolorId] = useState('')

    useEffect(() => {
        dispatch(getColors())
    }, [])

    // handle
    const showModal = (e) => {
        setOpen(true)
        setcolorId(e)
    }

    const hideModal = () => {
        setOpen(false)
    }

    const data1 = []
    for (let i = 0; i < colorState.length; i++) {
        data1.push({
            key: i + 1,
            name: colorState[i].title,
            action: (
                <>
                    <Link to={`/admin/color/${colorState[i]._id}`} className=' fs-3 text-danger'>
                        <BiEdit />
                    </Link>
                    <button
                        className='ms-3 fs-3 text-danger bg-transparent border-0'
                        onClick={() => showModal(colorState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            )
        })
    }

    const deleteColor = (e) => {
        dispatch(deleteAColor(e))

        setOpen(false)
        setTimeout(() => {
            dispatch(getColors())
        }, 100)
    }

    return (
        <div>
            <h3 className='mb-4 title'>Colors</h3>
            <div>{isLoading ? <Loading /> : <TableEl columns={columns} dataSource={data1} />}</div>

            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteColor(colorId)
                }}
                title='Are you sure you want to delete this color?'
            />
        </div>
    )
}

export default Colorlist
