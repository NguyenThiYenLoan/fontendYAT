import React from 'react'
import HeaderComponents from '../HeaderComponents/HeaderComponents'
import FooterComponents from '../FooterComponents/FooterComponents'
import MultiLevelMenu from '../MultiLevelMenu/MultiLevelMenu'
import { useMediaQuery } from 'react-responsive';
import {WrapperHeaderAo} from './style'

// trang này dùng để điều chỉnh hiển thị phần header cho những trang nào
const DefaultComponents = ({children}) => {
    const isMobile = useMediaQuery({ query: '(max-width: 740px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 740px) and (max-width: 1030px)' });
    return (
        <div>
            {/* nhận cái header vào xử lý */}
            <HeaderComponents/>
            {children}
            {isMobile || isTablet ? <MultiLevelMenu/> : null}
            
            <FooterComponents/>
            {isMobile || isTablet ? <WrapperHeaderAo></WrapperHeaderAo> : null}
            
        </div>
    )
}

export default DefaultComponents