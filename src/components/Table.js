import { Table } from 'antd'
import React from 'react'

const TableEl = ({ columns, dataSource }) => {
    return (
        <Table
            pagination={false}
            // rowSelection={rowSelection}
            dataSource={dataSource}
            columns={columns}
            bordered
            style={{ cursor: 'pointer' }}
            scroll={{ y: 640 }}
            // loading={{
            //   indicator: <LoadingOutlined style={{ fontSize: 24 }} />,
            //   spinning: isLoading || isValidating
            // }}
            onRow={(el) => {
                return {
                    // onClick: () => {
                    //   route.push(`${route.pathname+"/"+el.id_product_att}`)
                    //   dispatch(setProduct(el))
                    // }, // click row
                    onDoubleClick: () => {}, // double click row
                    onContextMenu: () => {}, // right button click row
                    onMouseEnter: () => {}, // mouse enter row
                    onMouseLeave: () => {} // mouse leave row
                }
            }}
        />
    )
}

export default TableEl
