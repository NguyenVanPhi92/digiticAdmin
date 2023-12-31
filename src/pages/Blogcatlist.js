import TableEl from 'components/Table'
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CustomModal from '../components/CustomModal'
import { deleteABlogCat, getCategories, resetState } from '../features/bcategory/bcategorySlice'

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
        title: 'Action',
        dataIndex: 'action'
    }
]

const Blogcatlist = () => {
    const bCatState = useSelector((state) => state.bCategory.bCategories)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [blogCatId, setblogCatId] = useState('')

    useEffect(() => {
        dispatch(getCategories())
        dispatch(resetState())
    }, [])

    // handle
    const showModal = (e) => {
        setOpen(true)
        setblogCatId(e)
    }

    const hideModal = () => {
        setOpen(false)
    }

    const data1 = []
    for (let i = 0; i < bCatState.length; i++) {
        data1.push({
            key: i + 1,
            name: bCatState[i].title,
            action: (
                <>
                    <Link
                        to={`/admin/blog-category/${bCatState[i]._id}`}
                        className=' fs-3 text-danger'
                    >
                        <BiEdit />
                    </Link>
                    <button
                        className='ms-3 fs-3 text-danger bg-transparent border-0'
                        onClick={() => showModal(bCatState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            )
        })
    }
    const deleteBlogCategory = (e) => {
        dispatch(deleteABlogCat(e))
        setOpen(false)
        setTimeout(() => {
            dispatch(getCategories())
        }, 100)
    }
    return (
        <div>
            <h3 className='mb-4 title'>Blog Categories</h3>
            <div>
                <TableEl columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteBlogCategory(blogCatId)
                }}
                title='Are you sure you want to delete this blog category?'
            />
        </div>
    )
}

export default Blogcatlist
