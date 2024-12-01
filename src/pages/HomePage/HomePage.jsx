import { Image } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { WrapperTypeProduct, ProductItem, WrapperButtonMore, WrapperProducts, ProductItem1, WrapperProducts1 } from './style'

import SliderComponent from '../../components/SliderComponents/SliderComponents'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import CardComponents from '../../components/CardComponents/CardComponents'
import CardComponentsMobile from '../../components/CardComponentsMobile/CardComponents'
import SliderProducts from '../../components/SliderProductComponents/SliderProductComponents'
import Loading from '../../components/loadingComponents/Loading'

import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';

import * as ProductService from '../../services/ProductService'
import * as SliderService from '../../services/SliderService'

import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import slider4 from '../../assets/images/slider4.webp'
import bongtai from '../../assets/images/bongtai.jpg'
import hatcharm from '../../assets/images/hatcharm.jpg'
import lactay from '../../assets/images/lactay.jpg'
import matdaychuyen from '../../assets/images/matdaychuyen.jpg'
import nhan from '../../assets/images/nhan1.jpg'
import vongco from '../../assets/images/vongco1.jpg'
import vongtay from '../../assets/images/vongtay1.jpg'
import { useSelector } from 'react-redux'
import io from 'socket.io-client';
import axios from 'axios';
import { createNumberOfVisits } from '../../services/VisitService'
import { useMutationHooks } from '../../hooks/useMutationHooks'
export const axiosJWT = axios.create()

const socket = io(`${process.env.REACT_APP_API_URL}`);

socket.on('connection', () => {
    console.log('Kết nối thành công');
});

const HomePage = () => {
    // Lượng truy cập -------------------------------------
    const [duration, setDuration] = useState(0); // Thời gian ở lại trang (giây)
    const startTime = useRef(new Date().getTime()); // Thời gian bắt đầu

    const mutation = useMutationHooks(async (data) => {
        const { userAgent, startTime, endTime, duration } = data;
        return await createNumberOfVisits({ userAgent, startTime, endTime, duration });
    });

    const { data: truycap, error, isLoading } = mutation;
    console.log('truycap', truycap);

    const onFinish = async () => {
        const endTime = new Date().getTime();
        const visitDuration = (endTime - startTime.current) / 1000;

        const newVisit = {
            userAgent: navigator.userAgent,
            startTime: startTime.current,
            endTime,
            duration: visitDuration,
        };

        try {
            await mutation.mutateAsync(newVisit);
        } catch (error) {
            console.error("Error creating visit:", error);
        }
    };

    useEffect(() => {
        window.addEventListener("beforeunload", onFinish);

        return () => {
            window.removeEventListener("beforeunload", onFinish);
        };
    }, []);


    // Lượng truy cập -------------------------------------


    // chat------------------------------------------------
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const chatContainerRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const createConversationId = (userId1, userId2) => {
        return `${userId1}-${userId2}`;
    };

    // loard dữ liệu tin nhắn raa
    useEffect(() => {
        if (user.id !== '') {
            const conversationId = createConversationId(user?.id, '667bd81d154e1e180031bb5e');
            // Gửi sự kiện 'register' cùng với tên người dùng
            socket.emit('register', user?.name);
            // gửi id của mesage qua server
            socket.emit('GetMessagesDetail', conversationId);
            // nhận dữ liệu từ server gửi về
            socket.on('DL_Tin_Nhan', (DL_Tin_Nhan) => {
                setMessages(Array.isArray(DL_Tin_Nhan) ? DL_Tin_Nhan : DL_Tin_Nhan);
            });
        }
    }, [user.id, setMessages]);

    const handleSend = async () => {
        if (input.trim()) {
            const newMessage = {
                conversationId: user?.isAdmin === false
                    ? createConversationId(user?.id, '667bd81d154e1e180031bb5e')
                    : createConversationId('667bd81d154e1e180031bb5e', user?.id),
                senderId: user?.id,
                senderName: user?.name,
                senderImage: user?.avatar,
                isAdmin: user?.isAdmin,
                messageContent: input,
            };
            // Gửi sự kiện 'register' cùng với tên người dùng
            socket.emit('registeridUser', newMessage.conversationId);
            // gửi dữ liệu đến server
            socket.emit('sendMessage', newMessage);
            // nhận dữ liệu từ server gửi về
            socket.on('newMessage1', (TinNhanTuServerGuiVe) => {
                setMessages([...messages, TinNhanTuServerGuiVe]);
            });
            // nhắn xong reset cái input về rỗng
            setInput('');
        }
    };

    socket.on('newMessage1', (TinNhanTuServerGuiVe) => {
        console.log('dlmoi11', TinNhanTuServerGuiVe);
        setMessages([...messages, TinNhanTuServerGuiVe]);
    });

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Cuộn tự động đến tin nhắn cuối cùng khi tin nhắn thay đổi
    useEffect(() => {
        if (chatContainerRef.current) {
            const lastMessage = chatContainerRef.current.lastElementChild;
            if (lastMessage) {
                lastMessage.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [isOpen]); // Mỗi khi messages thay đổi
    // chat------------------------------------------------

    const isMobile = useMediaQuery({ query: '(max-width: 740px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 740px) and (max-width: 1030px)' });

    const [typeProducts, setTypeProducts] = useState([])

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }
    useEffect(() => {
        fetchAllTypeProduct()
    }, [setTypeProducts])
    const arr = typeProducts


    const handleNavigateType = (type) => {
        // normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_'): dùng để bỏ đi cái tiếng việt khi kik vào --type--
        // {state: type}: nhận cái --type-- tiếng việt để tìm kiếm --type--
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: type })
    }

    // hàm dùng để loard dữ liệu lên trên client phía admin
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    }
    const getAllProducts = async () => {
        const res = await SliderService.getAllSlider()
        return res
    }
    const getSellingProduct1 = async () => {
        const res = await ProductService.getSellingProducts()
        return res
    }
    const getNewProduct1 = async () => {
        const res = await ProductService.getNewProducts()
        return res
    }
    const getHighestPricedProduct1 = async () => {
        const res = await ProductService.getHighestPricedProducts()
        return res
    }
    const getLowestPricedProduct1 = async () => {
        const res = await ProductService.getLowestPricedProducts()
        return res
    }
    const getRandomProduct1 = async () => {
        const res = await ProductService.getRandomProduct()
        return res
    }

    // queryKey: là mảng chứa các khóa query.
    // queryFn: là hàm thực hiện truy vấn.
    // config: là một đối tượng chứa các cấu hình bổ sung, trong trường hợp này là cấu hình liên quan đến việc thử lại.
    const { data: products } = useQuery({ queryKey: ['products'], queryFn: fetchProductAll, keepPreviousData: true });
    const queryProduct = useQuery({ queryKey: ['dataProduct'], queryFn: getAllProducts })
    const querySellingProduct2 = useQuery({ queryKey: ['dataSellingProducts'], queryFn: getSellingProduct1 })
    const queryNewProduct2 = useQuery({ queryKey: ['dataNewProducts'], queryFn: getNewProduct1 })
    const queryHighestPricedProduct2 = useQuery({ queryKey: ['dataHighestPricedProducts'], queryFn: getHighestPricedProduct1 })
    const queryLowestPricedProduct2 = useQuery({ queryKey: ['dataLowestPricedProducts'], queryFn: getLowestPricedProduct1 })
    const queryRandomProduct2 = useQuery({ queryKey: ['dataRandomProduct'], queryFn: getRandomProduct1 })

    const { data: dataProduct } = queryProduct
    const { isPending, data: dataSellingProducts } = querySellingProduct2
    const { data: dataNewProducts } = queryNewProduct2
    const { data: dataHighestPricedProducts } = queryHighestPricedProduct2
    const { data: dataLowestPricedProducts } = queryLowestPricedProduct2
    const { data: dataRandomProduct } = queryRandomProduct2

    let arrImage = []
    {
        dataProduct ? (
            arrImage = dataProduct.data.map(item => item.image)
        ) : (
            arrImage = []
        )
    }

    const filterProductsByType = (type, number) => {
        if (!products || !products.data || !Array.isArray(products.data)) {
            return [];
        }
        const filteredProducts = products?.data?.filter(product => product.type === type);
        return filteredProducts.slice(0, number);
    };

    const bongtai1 = filterProductsByType('Bông Tai', 8);
    const daychuyen1 = filterProductsByType('Vòng Cổ', 8);
    const hatcharm1 = filterProductsByType('Hạt Charm', 8);
    const lactay1 = filterProductsByType('Lắc Tay', 8);
    const matdaychuyen1 = filterProductsByType('Mặt Dây Chuyền', 8);
    const nhan1 = filterProductsByType('Nhẫn', 8);
    const vongtay1 = filterProductsByType('Vòng Tay', 8);

    let bongtai2
    let daychuyen2
    let hatcharm2
    let lactay2
    let matdaychuyen2
    let nhan2
    let vongtay2

    if (isTablet) {
        bongtai2 = filterProductsByType('Bông Tai', 6);
        daychuyen2 = filterProductsByType('Vòng Cổ', 6);
        hatcharm2 = filterProductsByType('Hạt Charm', 6);
        lactay2 = filterProductsByType('Lắc Tay', 6);
        matdaychuyen2 = filterProductsByType('Mặt Dây Chuyền', 6);
        nhan2 = filterProductsByType('Nhẫn', 6);
        vongtay2 = filterProductsByType('Vòng Tay', 6);
    } else if (isMobile) {
        bongtai2 = filterProductsByType('Bông Tai', 4);
        daychuyen2 = filterProductsByType('Vòng Cổ', 4);
        hatcharm2 = filterProductsByType('Hạt Charm', 4);
        lactay2 = filterProductsByType('Lắc Tay', 4);
        matdaychuyen2 = filterProductsByType('Mặt Dây Chuyền', 4);
        nhan2 = filterProductsByType('Nhẫn', 4);
        vongtay2 = filterProductsByType('Vòng Tay', 4);
    }


    return (
        <Loading isPending={isPending}>
            {isMobile || isTablet ? null :
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return (
                            // in ra các thành phần của trang web như là các loại sản phẩm 
                            // gọi đến trang --TypeProduct.jsx-- rồi truyền biến --name={item}-- vào để bên kia xử lý in ra
                            <ProductItem1 key={item}>
                                <TypeProduct name={item} />
                            </ProductItem1>
                        )
                    })}
                </WrapperTypeProduct>
            }


            <div className='body' style={{ width: '100%', backgroundColor: '#efefef' }}>
                <div id="container" style={{ height: '100%', width: '100%', margin: '0 auto' }}>
                    {/* cho 3 cái ảnh vào mảng | rồi hiển thị ra cái slider */}
                    {/* gọi tới trang --SliderComponents.jsx--  */}
                    <SliderComponent arrImage={arrImage} />

                    {isMobile
                        ?
                        <div>
                            <Image onClick={() => handleNavigateType(arr[2])} key={slider2} src={slider2} alt="slider2" preview={false} width="32.4%" height="120px" style={{ marginTop: '5%', cursor: 'pointer' }} />
                            <Image onClick={() => handleNavigateType(arr[3])} key={slider3} src={slider3} alt="slider3" preview={false} width="32.5%" height="120px" style={{ marginLeft: '4%', marginTop: '5%', cursor: 'pointer' }} />
                            <Image onClick={() => handleNavigateType(arr[5])} key={slider4} src={slider4} alt="slider5" preview={false} width="32.4%" height="120px" style={{ marginLeft: '8%', marginTop: '5%', cursor: 'pointer' }} />
                        </div>

                        :
                        <div>
                            <Image onClick={() => handleNavigateType(arr[2])} key={slider2} src={slider2} alt="slider2" preview={false} width="32.4%" height="230px" style={{ marginTop: '5%', cursor: 'pointer' }} />
                            <Image onClick={() => handleNavigateType(arr[3])} key={slider3} src={slider3} alt="slider3" preview={false} width="32.5%" height="230px" style={{ marginLeft: '4%', marginTop: '5%', cursor: 'pointer' }} />
                            <Image onClick={() => handleNavigateType(arr[5])} key={slider4} src={slider4} alt="slider5" preview={false} width="32.4%" height="230px" style={{ marginLeft: '8%', marginTop: '5%', cursor: 'pointer' }} />
                            <br /><br /><br />
                        </div>
                    }


                    {isMobile || isTablet
                        ?
                        <div>
                            <div style={{ justifyContent: 'center', display: 'flex' }}>
                                <div style={{ width: '100%', borderBottom: '4px solid #fff', margin: '20px 0px 15px 0px' }}></div>
                            </div>
                            <div style={{ width: '100%', justifyContent: 'center', display: 'flex', padding: '0px 0px 15px 0px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                                    <div style={{ color: '#003868', fontSize: '1.2em', fontWeight: 'bold' }}>Sản phẩm bán chạy</div>
                                    <div onClick={() => navigate('/entire-product')} style={{ cursor: 'pointer', color: '#707070', fontSize: '16px', textDecoration: 'underline' }}>Xem thêm ...</div>
                                </div>
                            </div>
                            <WrapperProducts>
                                {dataSellingProducts?.data?.map((product) => (
                                    <ProductItem key={product._id}>
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
                                    </ProductItem>
                                ))}
                            </WrapperProducts>

                            <div style={{ justifyContent: 'center', display: 'flex' }}>
                                <div style={{ width: '100%', borderBottom: '4px solid #fff', margin: '30px 0px 15px 0px' }}></div>
                            </div>
                            <div style={{ width: '100%', justifyContent: 'center', display: 'flex', padding: '0px 0px 15px 0px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                                    <div style={{ color: '#003868', fontSize: '1.2em', fontWeight: 'bold' }}>Sản phẩm mới</div>
                                    <div onClick={() => navigate('/entire-product')} style={{ cursor: 'pointer', color: '#707070', fontSize: '16px', textDecoration: 'underline' }}>Xem thêm ...</div>
                                </div>
                            </div>
                            <WrapperProducts>
                                {dataNewProducts?.data?.map((product) => (
                                    <ProductItem key={product._id}>
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
                                    </ProductItem>
                                ))}
                            </WrapperProducts>

                            <div style={{ justifyContent: 'center', display: 'flex' }}>
                                <div style={{ width: '100%', borderBottom: '4px solid #fff', margin: '30px 0px 15px 0px' }}></div>
                            </div>
                            <div style={{ width: '100%', justifyContent: 'center', display: 'flex', padding: '0px 0px 15px 0px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                                    <div style={{ color: '#003868', fontSize: '1.2em', fontWeight: 'bold' }}>Sản phẩm có giá cao nhất</div>
                                    <div onClick={() => navigate('/entire-product')} style={{ cursor: 'pointer', color: '#707070', fontSize: '16px', textDecoration: 'underline' }}>Xem thêm ...</div>
                                </div>
                            </div>
                            <WrapperProducts>
                                {dataHighestPricedProducts?.data?.map((product) => (
                                    <ProductItem key={product._id}>
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
                                    </ProductItem>
                                ))}
                            </WrapperProducts>

                            <div style={{ justifyContent: 'center', display: 'flex' }}>
                                <div style={{ width: '100%', borderBottom: '4px solid #fff', margin: '30px 0px 15px 0px' }}></div>
                            </div>
                            <div style={{ width: '100%', justifyContent: 'center', display: 'flex', padding: '0px 0px 15px 0px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                                    <div style={{ color: '#003868', fontSize: '1.2em', fontWeight: 'bold' }}>Sản phẩm có giá thấp nhất</div>
                                    <div onClick={() => navigate('/entire-product')} style={{ cursor: 'pointer', color: '#707070', fontSize: '16px', textDecoration: 'underline' }}>Xem thêm ...</div>
                                </div>
                            </div>
                            <WrapperProducts>
                                {dataLowestPricedProducts?.data?.map((product) => (
                                    <ProductItem key={product._id}>
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
                                    </ProductItem>
                                ))}
                            </WrapperProducts>



                            <div>
                                <div>
                                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                                        <div style={{ width: '100%', borderBottom: '4px solid #fff', margin: '30px 0px 0px 0px' }}></div>
                                    </div>
                                    <Image src={bongtai} alt="bongtai" preview={false} width="100%" height="200px" style={{ textAlign: 'center', cursor: 'pointer' }} />
                                    <h1 style={{ padding: '30px 0px 0px 0px', textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', color: '#003868' }}>Bông Tai</h1>
                                    <WrapperProducts1>
                                        {bongtai2.map((product) => {
                                            return (
                                                <CardComponentsMobile
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
                                                    // cái id dùng để phân biệt sản phẩm nào
                                                    id={product._id}
                                                />
                                            )
                                        })}
                                    </WrapperProducts1>


                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <WrapperButtonMore
                                            textButton="Xem Thêm" type="outline" styleButon={{
                                                border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
                                                width: '120px', height: '38px', borderRadius: '4px', marginTop: '30px'
                                            }}

                                            styleTextButon={{ fontWeight: 500 }}
                                            onClick={() => handleNavigateType(bongtai2[0]?.type)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                                        <div style={{ width: '100%', borderBottom: '4px solid #fff', margin: '30px 0px 0px 0px' }}></div>
                                    </div>
                                    <Image src={lactay} alt="lacchan" preview={false} width="100%" height="200px" style={{ textAlign: 'center', cursor: 'pointer' }} />
                                    <h1 style={{ padding: '30px 0px 0px 0px', textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', color: '#003868' }}>Lắc Tay</h1>
                                    <WrapperProducts1>
                                        {lactay2.map((product) => {
                                            return (
                                                <CardComponentsMobile
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
                                                    // cái id dùng để phân biệt sản phẩm nào
                                                    id={product._id}
                                                />
                                            )
                                        })}
                                    </WrapperProducts1>

                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <WrapperButtonMore
                                            textButton="Xem Thêm" type="outline" styleButon={{
                                                border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
                                                width: '120px', height: '38px', borderRadius: '4px', marginTop: '30px'
                                            }}

                                            styleTextButon={{ fontWeight: 500 }}
                                            onClick={() => handleNavigateType(lactay2[0]?.type)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                                        <div style={{ width: '100%', borderBottom: '4px solid #fff', margin: '30px 0px 0px 0px' }}></div>
                                    </div>
                                    <Image src={vongtay} alt="bonutrang" preview={false} width="100%" height="200px" style={{ textAlign: 'center', cursor: 'pointer' }} />
                                    <h1 style={{ padding: '30px 0px 0px 0px', textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', color: '#003868' }}>Vòng Tay</h1>
                                    <WrapperProducts1>
                                        {vongtay2.map((product) => {
                                            return (
                                                <CardComponentsMobile
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
                                                    // cái id dùng để phân biệt sản phẩm nào
                                                    id={product._id}
                                                />
                                            )
                                        })}
                                    </WrapperProducts1>


                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <WrapperButtonMore
                                            textButton="Xem Thêm" type="outline" styleButon={{
                                                border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
                                                width: '120px', height: '38px', borderRadius: '4px', marginTop: '30px'
                                            }}

                                            styleTextButon={{ fontWeight: 500 }}
                                            onClick={() => handleNavigateType(matdaychuyen2[0]?.type)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                                        <div style={{ width: '100%', borderBottom: '4px solid #fff', margin: '30px 0px 0px 0px' }}></div>
                                    </div>
                                    <Image src={vongco} alt="nhan" preview={false} width="100%" height="200px" style={{ textAlign: 'center', cursor: 'pointer' }} />
                                    <h1 style={{ padding: '30px 0px 0px 0px', textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', color: '#003868' }}>Dây Chuyền</h1>
                                    <WrapperProducts1>
                                        {daychuyen2.map((product) => {
                                            return (
                                                <CardComponentsMobile
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
                                                    // cái id dùng để phân biệt sản phẩm nào
                                                    id={product._id}
                                                />
                                            )
                                        })}
                                    </WrapperProducts1>

                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <WrapperButtonMore
                                            textButton="Xem Thêm" type="outline" styleButon={{
                                                border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
                                                width: '120px', height: '38px', borderRadius: '4px', marginTop: '30px'
                                            }}

                                            styleTextButon={{ fontWeight: 500 }}
                                            onClick={() => handleNavigateType(daychuyen2[0]?.type)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                                        <div style={{ width: '100%', borderBottom: '4px solid #fff', margin: '30px 0px 0px 0px' }}></div>
                                    </div>
                                    <Image src={hatcharm} alt="vongco" preview={false} width="100%" height="200px" style={{ textAlign: 'center', cursor: 'pointer' }} />
                                    <h1 style={{ padding: '30px 0px 0px 0px', textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', color: '#003868' }}>Hạt Charm</h1>
                                    <WrapperProducts1>
                                        {hatcharm2.map((product) => {
                                            return (
                                                <CardComponentsMobile
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
                                                    // cái id dùng để phân biệt sản phẩm nào
                                                    id={product._id}
                                                />
                                            )
                                        })}
                                    </WrapperProducts1>

                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <WrapperButtonMore
                                            textButton="Xem Thêm" type="outline" styleButon={{
                                                border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
                                                width: '120px', height: '38px', borderRadius: '4px', marginTop: '30px'
                                            }}

                                            styleTextButon={{ fontWeight: 500 }}
                                            onClick={() => handleNavigateType(hatcharm2[0]?.type)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                                        <div style={{ width: '100%', borderBottom: '4px solid #fff', margin: '30px 0px 0px 0px' }}></div>
                                    </div>
                                    <Image src={matdaychuyen} alt="vongtay" preview={false} width="100%" height="200px" style={{ textAlign: 'center', cursor: 'pointer' }} />
                                    <h1 style={{ padding: '30px 0px 0px 0px', textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', color: '#003868' }}>Mặt Dây Chuyền</h1>
                                    <WrapperProducts1>
                                        {matdaychuyen2.map((product) => {
                                            return (
                                                <CardComponentsMobile
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
                                                    // cái id dùng để phân biệt sản phẩm nào
                                                    id={product._id}
                                                />
                                            )
                                        })}
                                    </WrapperProducts1>

                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <WrapperButtonMore
                                            textButton="Xem Thêm" type="outline" styleButon={{
                                                border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
                                                width: '120px', height: '38px', borderRadius: '4px', marginTop: '30px'
                                            }}

                                            styleTextButon={{ fontWeight: 500 }}
                                            onClick={() => handleNavigateType(matdaychuyen2[0]?.type)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                                        <div style={{ width: '100%', borderBottom: '4px solid #fff', margin: '30px 0px 0px 0px' }}></div>
                                    </div>
                                    <Image src={nhan} alt="dongho" preview={false} width="100%" height="200px" style={{ textAlign: 'center', cursor: 'pointer' }} />
                                    <h1 style={{ padding: '30px 0px 0px 0px', textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', color: '#003868' }}>Nhẫn</h1>
                                    <WrapperProducts1>
                                        {nhan2.map((product) => {
                                            return (
                                                <CardComponentsMobile
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
                                                    // cái id dùng để phân biệt sản phẩm nào
                                                    id={product._id}
                                                />
                                            )
                                        })}
                                    </WrapperProducts1>

                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <WrapperButtonMore
                                            textButton="Xem Thêm" type="outline" styleButon={{
                                                border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
                                                width: '120px', height: '38px', borderRadius: '4px', marginTop: '30px'
                                            }}

                                            styleTextButon={{ fontWeight: 500 }}
                                            onClick={() => handleNavigateType(nhan2[0]?.type)}
                                        />
                                    </div>
                                </div>

                                <div style={{ justifyContent: 'center', display: 'flex' }}>
                                    <div style={{ width: '100%', borderBottom: '4px solid #fff', margin: '30px 0px 15px 0px' }}></div>
                                </div>
                                <div style={{ width: '100%', justifyContent: 'center', display: 'flex', padding: '60px 0px 30px 0px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', width: '95%' }}>
                                        <div style={{ color: '#003868', fontSize: '1.2em', fontWeight: 'bold' }}>Có thể bạn sẽ thích</div>
                                    </div>
                                </div>
                                <WrapperProducts>
                                    {dataRandomProduct?.data?.map((product) => (
                                        <ProductItem key={product._id}>
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
                                        </ProductItem>
                                    ))}
                                </WrapperProducts>
                                <br />


                            </div>

                        </div>
                        :
                        <div>
                            <div style={{ justifyContent: 'center', display: 'flex' }}>
                                <div style={{ width: '73%', borderBottom: '4px solid #fff', margin: '20px 0px' }}></div>
                            </div>

                            <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '73%' }}>
                                    <div style={{ color: '#003868', fontSize: '1.2em', fontWeight: 'bold' }}>Sản phẩm bán chạy</div>
                                    <div onClick={() => navigate('/entire-product')} style={{ cursor: 'pointer', color: '#707070', fontSize: '16px', textDecoration: 'underline' }}>Xem thêm ...</div>
                                </div>
                            </div>
                            <SliderProducts products={dataSellingProducts?.data} />

                            <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '73%' }}>
                                    <div style={{ color: '#003868', fontSize: '1.2em', fontWeight: 'bold' }}>Sản phẩm mới</div>
                                    <div onClick={() => navigate('/entire-product')} style={{ cursor: 'pointer', color: '#707070', fontSize: '16px', textDecoration: 'underline' }}>Xem thêm ...</div>
                                </div>
                            </div>
                            <SliderProducts products={dataNewProducts?.data} />

                            <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '73%' }}>
                                    <div style={{ color: '#003868', fontSize: '1.2em', fontWeight: 'bold' }}>Sản phẩm có giá cao nhất</div>
                                    <div onClick={() => navigate('/entire-product')} style={{ cursor: 'pointer', color: '#707070', fontSize: '16px', textDecoration: 'underline' }}>Xem thêm ...</div>
                                </div>
                            </div>
                            <SliderProducts products={dataHighestPricedProducts?.data} />

                            <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '73%' }}>
                                    <div style={{ color: '#003868', fontSize: '1.2em', fontWeight: 'bold' }}>Sản phẩm có giá thấp nhất</div>
                                    <div onClick={() => navigate('/entire-product')} style={{ cursor: 'pointer', color: '#707070', fontSize: '16px', textDecoration: 'underline' }}>Xem thêm ...</div>
                                </div>
                            </div>
                            <SliderProducts products={dataLowestPricedProducts?.data} />

                            <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '73%' }}>
                                    <div style={{ color: '#003868', fontSize: '1.2em', fontWeight: 'bold' }}>Có thể bạn sẽ thích</div>
                                    <div onClick={() => navigate('/entire-product')} style={{ cursor: 'pointer', color: '#707070', fontSize: '16px', textDecoration: 'underline' }}>Xem thêm ...</div>
                                </div>
                            </div>
                            <SliderProducts products={dataRandomProduct?.data} />

                            <div>
                                <div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Image src={bongtai} alt="bongtai" preview={false} width="74%" height="300px" style={{ textAlign: 'center', cursor: 'pointer' }} />
                                        <h1 style={{ padding: '20px 0px', fontSize: '20px' }}>Bông Tai</h1>
                                    </div>
                                    <SliderProducts products={bongtai1} />

                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <WrapperButtonMore
                                            textButton="Xem Thêm" type="outline" styleButon={{
                                                border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
                                                width: '240px', height: '38px', borderRadius: '4px', marginBottom: '50px', marginTop: '30px'
                                            }}

                                            styleTextButon={{ fontWeight: 500 }}
                                            onClick={() => handleNavigateType(bongtai1[0]?.type)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Image src={lactay} alt="lacchan" preview={false} width="74%" height="300px" style={{ textAlign: 'center', cursor: 'pointer' }} />
                                        <h1 style={{ padding: '20px 0px', fontSize: '20px' }}>Lắc Tay</h1>
                                    </div>
                                    <SliderProducts products={lactay1} />

                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <WrapperButtonMore
                                            textButton="Xem Thêm" type="outline" styleButon={{
                                                border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
                                                width: '240px', height: '38px', borderRadius: '4px', marginBottom: '50px', marginTop: '30px'
                                            }}

                                            styleTextButon={{ fontWeight: 500 }}
                                            onClick={() => handleNavigateType(lactay1[0]?.type)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Image src={vongtay} alt="bonutrang" preview={false} width="74%" height="300px" style={{ textAlign: 'center', cursor: 'pointer' }} />
                                        <h1 style={{ padding: '20px 0px', fontSize: '20px' }}>Vòng Tay</h1>
                                    </div>
                                    <SliderProducts products={vongtay1} />

                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <WrapperButtonMore
                                            textButton="Xem Thêm" type="outline" styleButon={{
                                                border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
                                                width: '240px', height: '38px', borderRadius: '4px', marginBottom: '50px', marginTop: '30px'
                                            }}

                                            styleTextButon={{ fontWeight: 500 }}
                                            onClick={() => handleNavigateType(matdaychuyen1[0]?.type)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Image src={vongco} alt="nhan" preview={false} width="74%" height="300px" style={{ textAlign: 'center', cursor: 'pointer' }} />
                                        <h1 style={{ padding: '20px 0px', fontSize: '20px' }}>Dây Chuyền</h1>
                                    </div>
                                    <SliderProducts products={daychuyen1} />

                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <WrapperButtonMore
                                            textButton="Xem Thêm" type="outline" styleButon={{
                                                border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
                                                width: '240px', height: '38px', borderRadius: '4px', marginBottom: '50px', marginTop: '30px'
                                            }}

                                            styleTextButon={{ fontWeight: 500 }}
                                            onClick={() => handleNavigateType(daychuyen1[0]?.type)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Image src={hatcharm} alt="vongco" preview={false} width="74%" height="300px" style={{ textAlign: 'center', cursor: 'pointer' }} />
                                        <h1 style={{ padding: '20px 0px', fontSize: '20px' }}>Hạt Charm</h1>
                                    </div>
                                    <SliderProducts products={hatcharm1} />

                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <WrapperButtonMore
                                            textButton="Xem Thêm" type="outline" styleButon={{
                                                border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
                                                width: '240px', height: '38px', borderRadius: '4px', marginBottom: '50px', marginTop: '30px'
                                            }}

                                            styleTextButon={{ fontWeight: 500 }}
                                            onClick={() => handleNavigateType(hatcharm1[0]?.type)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Image src={matdaychuyen} alt="vongtay" preview={false} width="74%" height="300px" style={{ textAlign: 'center', cursor: 'pointer' }} />
                                        <h1 style={{ padding: '20px 0px', fontSize: '20px' }}>Mặt Dây Chuyền</h1>
                                    </div>
                                    <SliderProducts products={matdaychuyen1} />

                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <WrapperButtonMore
                                            textButton="Xem Thêm" type="outline" styleButon={{
                                                border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
                                                width: '240px', height: '38px', borderRadius: '4px', marginBottom: '50px', marginTop: '30px'
                                            }}

                                            styleTextButon={{ fontWeight: 500 }}
                                            onClick={() => handleNavigateType(matdaychuyen1[0]?.type)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Image src={nhan} alt="dongho" preview={false} width="74%" height="300px" style={{ textAlign: 'center', cursor: 'pointer' }} />
                                        <h1 style={{ padding: '20px 0px', fontSize: '20px' }}>Nhẫn</h1>
                                    </div>
                                    <SliderProducts products={nhan1} />

                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <WrapperButtonMore
                                            textButton="Xem Thêm" type="outline" styleButon={{
                                                border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
                                                width: '240px', height: '38px', borderRadius: '4px', marginBottom: '50px', marginTop: '30px'
                                            }}

                                            styleTextButon={{ fontWeight: 500 }}
                                            onClick={() => handleNavigateType(nhan1[0]?.type)}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    }

                </div>

                <div style={styles.chatWidgetContainer}>
                    {!isOpen && (
                        user.isAdmin !== '' && (
                            <button onClick={() => (user.isAdmin ? navigate('/chat-admin') : setIsOpen(true))} style={styles.chatButton}>
                                Chat
                            </button>
                        )
                    )}

                    {isOpen && (
                        <div style={styles.chatBox}>
                            <div style={styles.header}>
                                <span>{user?.name}</span>
                                <button onClick={() => setIsOpen(false)} style={styles.closeButton}>X</button>
                            </div>
                            <div ref={chatContainerRef} style={styles.chatContainer}>
                                {Array.isArray(messages) && messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            ...styles.chatMessage,
                                            ...(msg.isAdmin === false ? styles.myMessage : styles.otherMessage)
                                        }}
                                        onMouseEnter={(e) => {

                                            // Kiểm tra nếu tooltip đã tồn tại, xóa trước khi thêm mới
                                            let tooltip = document.getElementById(`tooltip-${index}`);
                                            if (tooltip) {
                                                tooltip.remove();
                                            }

                                            // Tạo tooltip mới
                                            tooltip = document.createElement("div");
                                            tooltip.innerText = new Date(msg.createdAt).toLocaleString(); // Hiển thị ngày
                                            tooltip.style.position = "absolute";
                                            tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; // Màu nền đen
                                            tooltip.style.color = "#fff"; // Chữ trắng
                                            tooltip.style.padding = "5px";
                                            tooltip.style.borderRadius = "4px";
                                            tooltip.style.fontSize = "12px";
                                            tooltip.style.pointerEvents = "none";
                                            tooltip.style.zIndex = "9999";

                                            // Cập nhật tọa độ hiển thị
                                            tooltip.style.top = `${window.scrollY + e.clientY + 10}px`;
                                            tooltip.style.left = `${window.scrollX + e.clientX + 10}px`;
                                            tooltip.setAttribute("id", `tooltip-${index}`); // Dùng index để tạo id duy nhất cho mỗi tooltip

                                            // Thêm tooltip vào body
                                            document.body.appendChild(tooltip);
                                        }}
                                        onMouseLeave={() => {
                                            // Xóa tooltip khi rời khỏi tin nhắn
                                            const tooltip = document.getElementById(`tooltip-${index}`);
                                            if (tooltip) {
                                                tooltip.remove();
                                            }
                                        }}
                                    >
                                        <img src={msg.senderImage} alt="Avatar" style={styles.avatar} />
                                        <div style={msg.isAdmin === true ? styles.messageContent : styles.messageContentAdmin}>
                                            <div style={{ ...styles.messageText, ...(msg.isAdmin === false ? styles.myMessageText : {}) }}>
                                                {msg.isReaction ? <span role="img" aria-label="reaction">{msg.messageContent}</span> : msg.messageContent}
                                            </div>
                                        </div>
                                    </div>
                                ))}


                                <div style={styles.encryptionNotice}>
                                    Messenger upgraded the security of this chat. New messages and calls are secured with end-to-end encryption.
                                </div>
                            </div>
                            <div style={styles.inputContainer}>
                                <input
                                    type="text"
                                    placeholder="Aa"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown} // Thêm sự kiện onKeyDown
                                    style={styles.input}
                                />
                                <button onClick={handleSend} style={styles.sendButton}>Gửi</button>
                            </div>
                        </div>
                    )}
                </div>

            </div>



        </Loading>
    )
}

const styles = {
    chatWidgetContainer: {
        position: 'fixed',
        bottom: '15px',
        right: '10px',
        zIndex: 1000,
    },
    chatButton: {
        padding: '18px 10px 18px 9.5px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#0084ff',
        color: '#fff',
        border: 'none',
        borderRadius: '26px',
        fontWeight: 'bold'
    },
    chatBox: {
        width: '360px',
        height: '500px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        marginTop: '10px'
    },
    header: {
        padding: '15px',
        backgroundColor: '#0084ff',
        color: '#fff',
        fontSize: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer'
    },
    chatContainer: {
        padding: '10px',
        backgroundColor: '#f0f2f5',
        height: '100%',
        overflowY: 'auto',
        fontFamily: 'Arial, sans-serif',
        flexGrow: 1
    },
    chatMessage: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    myMessage: {
        flexDirection: 'row-reverse'
    },
    otherMessage: {},
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        margin: '0 10px'
    },
    messageContent: {
        maxWidth: '200px',
        padding: '8px 12px',
        borderRadius: '18px',
        backgroundColor: '#e4e6eb',
        position: 'relative'
    },
    messageContentAdmin: {
        maxWidth: '200px',
        padding: '8px 0px',
        borderRadius: '18px',
        position: 'relative',
    },
    messageText: {
        fontSize: '14px',
        color: '#050505',
    },
    myMessageText: {
        backgroundColor: '#0084ff',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '18px',
    },
    encryptionNotice: {
        fontSize: '12px',
        color: 'gray',
        marginTop: '20px',
        textAlign: 'center'
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderTop: '1px solid #ddd'
    },
    input: {
        flexGrow: 1,
        padding: '10px',
        fontSize: '14px',
        borderRadius: '18px',
        border: '1px solid #ddd',
        marginRight: '10px'
    },
    sendButton: {
        backgroundColor: '#0084ff',
        color: '#fff',
        border: 'none',
        borderRadius: '18px',
        padding: '8px 16px',
        cursor: 'pointer'
    }
};
export default HomePage