// import { Button } from "antd"
import React from "react"
import { SearchOutlined } from '@ant-design/icons'
import InputComponents from "../InputComponents/InputComponents"
import ButtonComponents from "../ButtonComponents/ButtonComponents"
import { useNavigate } from "react-router-dom"

// trang này dùng để chỉnh css cho thanh tìm kiếm
const ButtonInputSearch = (props) => {
    const navigate = useNavigate()
    const {
        size, placeholder, textButton,
        bordered, backgroundColorInput = '#EDEDED',
        backgroundColorButton = '#EDEDED',
        colorButton = '#000',
        dulieu
    } = props

    const handleSearch = () => {
        navigate('/search-page', {state: {dulieu}})
    }
    

    return (
        <div style={{ display: 'flex' }}>
            {/* InputComponents nơi chứa input và button nhằm có thể tái sử dụng lại được  */}
            <InputComponents
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ backgroundColor: backgroundColorInput, borderRadius: '20px 0px 0px 20px' }}
                // rải ra để nhận cái dữ liệu trên thanh input
                {...props}

            />
            {/* InputComponents nơi chứa input và button nhằm có thể tái sử dụng lại được  */}
            <ButtonComponents
                size={size}
                styleButon={{ background: backgroundColorButton, border: !bordered && 'none', borderRadius: '0px 20px 20px 0px' }}
                icon={<SearchOutlined style={{ color: colorButton, marginRight: '0px' }} />}
                textButton={textButton}
                styleTextButon={{ color: colorButton }}
                onClick={handleSearch}
            />
        </div>
    )
}

export default ButtonInputSearch