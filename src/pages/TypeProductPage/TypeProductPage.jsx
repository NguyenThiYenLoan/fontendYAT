import React, { useEffect, useState } from 'react'
import { Col, Pagination, Row, Image } from 'antd'
import CardComponents from '../../components/CardComponents/CardComponents'
import { WrapperProducts, WrapperNavbar, WrapperContener, WrapperRow, WrapperCol, WrapperTypeProduct, ProductItem } from './style'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import Loading from '../../components/loadingComponents/Loading'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'
import { useMediaQuery } from 'react-responsive';
import bongtai from '../../assets/images/bongtai.jpg'
import hatcharm from '../../assets/images/hatcharm.jpg'
import lactay from '../../assets/images/lactay.jpg'
import matdaychuyen from '../../assets/images/matdaychuyen.jpg'
import nhan from '../../assets/images/nhan1.jpg'
import vongco from '../../assets/images/vongco1.jpg'
import vongtay from '../../assets/images/vongtay1.jpg'
import MenuDropdown from './MenuDropdown';
import { useNavigate } from 'react-router-dom'
import TypeProduct from '../../components/TypeProduct/TypeProduct'

const TypeProductPage = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 740px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 740px) and (max-width: 1030px)' });
    const navigate = useNavigate()

    // để có thể search đx
    // ở đây ta sẽ dùng --useSelector-- để lấy dữ liệu trong --ProductSlide từ store.js--
    const searchProduct = useSelector((state) => state.product?.search)
    // này dùng để gọi tới --hooks-- để điều chỉnh thời gian --delay-- cho thanh tìm kím
    const searchDebounce = useDebounce(searchProduct, 1000)

    // nhận --state-- tức là cái --type-- từ --typeProduct.jsx--
    const { state } = useLocation()

    // tạo ra cái nhận dữ liệu
    const [products, setProducts] = useState([])
    const [isPending, setIsPending] = useState(false)
    const [sortType, setSortType] = useState('');
    const [typeProducts, setTypeProducts] = useState([])

    // xử lý phần phân trang trong type
    const [panigate, setPanigate] = useState({
        // số trang đang đứng
        page: 0,
        // tổng số sản phẩm hiện trên 1 trang
        limit: isMobile ? 6 : 5,
        total: 1,
    })

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }

    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    const arr = typeProducts

    // tạo ra cái hàm để lấy dữ liệu
    const fetchProductType = async (state, page, limit) => {
        setIsPending(true)
        const res = await ProductService.getProductType(state, page, limit)
        // console.log('resres', res)
        if (res?.status === 'OK') {
            setIsPending(false)
            setProducts(res?.data)
            // bắt đầu làm phân trang
            setPanigate({ ...panigate, total: res?.totalPage, limit: panigate.limit })
        } else {
            setIsPending(false)
            // console.log("lỗi ở trang TypeProductPage.jsx ")
        }
        // console.log('res', res)
    }

    useEffect(() => {
        if (state) {
            // ta sẽ chuyền --state là type--, 
            fetchProductType(state, panigate.page, panigate.limit)
        }
    }, [state, panigate.page, panigate.limit])


    // current: là trang hiện đang đứng
    // pageSize: là cái --limit--
    const onChange = (current, pageSize) => {
        // console.log({ current, pageSize })
        setPanigate({ ...panigate, page: current - 1 })
    }

    const onChange1 = () => {
        // console.log({ current, pageSize })
        setPanigate({ page: 0, limit: 2, total: 1, })
    }


    useEffect(() => {
        // Reset page to 0 when type changes
        setPanigate(prevPanigate => ({ ...prevPanigate, page: 0 }));

        if (state) {
            fetchProductType(state, 0, panigate.limit); // Reset page to 0 when type changes
        }
    }, [state]); // Only trigger when state changes


    const handleSort = (products, type) => {
        switch (type) {
            case 'Giá từ thấp đến cao':
                return products.sort((a, b) => a.price - b.price);
            case 'Giá từ cao đến thấp':
                return products.sort((a, b) => b.price - a.price);
            case 'Sản phẩm bán chạy':
                return products.sort((a, b) => b.selled - a.selled);
            case 'Sản phẩm mới':
                return products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            default:
                return products;
        }
    };

    // console.log("productsproducts", products)

    return (
        <Loading isPending={isPending}>
            {isMobile || isTablet ? null :
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return (
                            // in ra các thành phần của trang web như là các loại sản phẩm 
                            // gọi đến trang --TypeProduct.jsx-- rồi truyền biến --name={item}-- vào để bên kia xử lý in ra
                            <ProductItem key={item}>
                                <TypeProduct name={item}/>
                            </ProductItem>
                        )
                    })}
                </WrapperTypeProduct>
            }
            <WrapperContener>
                <WrapperRow>
                    <WrapperCol span={24}>
                        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <h1 style={{ justifyContent: 'center', display: 'flex' }} ><p style={{ color: '#ccc', cursor: 'pointer' }} onClick={() => navigate('/')}>Trang chủ / </p>&nbsp; {state}</h1>
                                {state === 'Bông Tai' ? (
                                    <img src={bongtai} width="100%" height={isMobile ? "200px" : "450px"} style={{ padding: '0px 0px 10px 0px' }} />
                                ) : state === 'Hạt Charm' ? (
                                    <img src={hatcharm} width="100%" height={isMobile ? "200px" : "450px"} style={{ padding: '0px 0px 10px 0px' }} />
                                ) : state === 'Lắc Tay' ? (
                                    <img src={lactay} width="100%" height={isMobile ? "200px" : "450px"} style={{ padding: '0px 0px 10px 0px' }} />
                                ) : state === 'Nhẫn' ? (
                                    <img src={nhan} width="100%" height={isMobile ? "200px" : "450px"} style={{ padding: '0px 0px 10px 0px' }} />
                                ) : state === 'Mặt Dây Chuyền' ? (
                                    <img src={matdaychuyen} width="100%" height={isMobile ? "200px" : "450px"} style={{ padding: '0px 0px 10px 0px' }} />
                                ) : state === 'Vòng Cổ' ? (
                                    <img src={vongco} width="100%" height={isMobile ? "200px" : "450px"} style={{ padding: '0px 0px 10px 0px' }} />
                                ) : state === 'Vòng Tay' ? (
                                    <img src={vongtay} width="100%" height={isMobile ? "200px" : "450px"} style={{ padding: '0px 0px 10px 0px' }} />
                                ): null}
                                
                                <MenuDropdown menuItems={['Giá từ thấp đến cao', 'Giá từ cao đến thấp', 'Sản phẩm bán chạy', 'Sản phẩm mới']} setSortType={setSortType} />

                                <WrapperProducts>
                                    {handleSort(products.filter((pro) => {
                                        if (searchDebounce === '') {
                                            return pro;
                                        } else if (pro?.name?.toLowerCase()?.includes(searchDebounce?.toLocaleLowerCase())) {
                                            return pro;
                                        }
                                    }), sortType).map((product) => {
                                        return (
                                            <CardComponents
                                                key={product._id}
                                                countInStock={product.countInStock}
                                                description={product.description}
                                                image={product.image}
                                                name={product.name}
                                                price={product.price}
                                                rating={product.rating}
                                                type={product.type}
                                                discount={product.discount}
                                                selled={product.selled}
                                                id={product._id}
                                            />
                                        )
                                    })}
                                </WrapperProducts>
                            </div>
                        </Col>
                        <Col span={24} style={{padding: '20px 0px'}}>
                            <Pagination defaultCurrent={panigate?.page + 1} total={panigate?.total} pageSize={1} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px' }} />
                        </Col>
                    </WrapperCol>

                </WrapperRow>
            </WrapperContener>
        </Loading>
    )
}

export default TypeProductPage