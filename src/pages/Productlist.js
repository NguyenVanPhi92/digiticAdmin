import { Table } from 'antd'
import Loading from 'components/Loading'
import React, { useEffect } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts } from '../features/product/productSlice'
const columns = [
    {
        title: 'SNo',
        dataIndex: 'key'
    },
    {
        title: 'Title',
        dataIndex: 'title',
        sorter: (a, b) => a.title.length - b.title.length
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        sorter: (a, b) => a.brand.length - b.brand.length
    },
    {
        title: 'Category',
        dataIndex: 'category',
        sorter: (a, b) => a.category.length - b.category.length
    },
    {
        title: 'Color',
        dataIndex: 'color'
    },
    {
        title: 'Price',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price
    },
    {
        title: 'Action',
        dataIndex: 'action'
    }
]

const Productlist = () => {
    const productState = useSelector((state) => state.product.products)
    const isLoading = useSelector((state) => state.product.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    const data1 = []
    for (let i = 0; i < productState.length; i++) {
        data1.push({
            key: i + 1,
            title: productState[i].title,
            brand: productState[i].brand,
            category: productState[i].category,
            color: productState[i].color,
            price: `${productState[i].price}`,
            action: (
                <>
                    <Link to='/' className=' fs-3 text-danger'>
                        <BiEdit />
                    </Link>
                    <Link className='ms-3 fs-3 text-danger' to='/'>
                        <AiFillDelete />
                    </Link>
                </>
            )
        })
    }
    return (
        <div>
            <h3 className='mb-4 title'>Products</h3>
            <div>{isLoading ? <Loading /> : <Table columns={columns} dataSource={data1} />}</div>
        </div>
    )
}

export default Productlist
