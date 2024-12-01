import React, { useState, useEffect } from 'react';
import { WrapperProducts, SliderContainer, SliderButton } from './style';
import CardComponents from '../../components/CardComponents/CardComponents';
import {
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';

const SliderProducts = ({ products }) => {
    const products1 = products || [];
    // console.log('products1', products1);

    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 4; // Số sản phẩm hiển thị mỗi lần

    const nextSlide = () => {
        const newStartIndex = startIndex + 1;
        if (newStartIndex < products1.length - itemsPerPage) {
            setStartIndex(newStartIndex);
        } else {
            setStartIndex(0); // Quay lại đầu nếu đã đến cuối danh sách
        }
    };

    const prevSlide = () => {
        const newStartIndex = startIndex - 1;
        if (newStartIndex >= 0) {
            setStartIndex(newStartIndex);
        } else {
            setStartIndex(products1.length - itemsPerPage); // Quay lại cuối nếu đã ở đầu danh sách
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Thay đổi slide mỗi 3 giây

        return () => clearInterval(interval);
    }, [startIndex]); // Sử dụng startIndex làm dependency để khi có thay đổi nó sẽ thực hiện lại useEffect

    return (
        <SliderContainer>
            <WrapperProducts style={{ transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)`}}>
                {products1.map((product, index) => (
                    <div key={product._id} style={{ flex: `0 0 ${100 / itemsPerPage}%`, maxWidth: `${100 / itemsPerPage}%` }}>
                        <CardComponents
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
                    </div>
                ))}
            </WrapperProducts>
            <SliderButton onClick={prevSlide}><LeftOutlined /></SliderButton>
            <SliderButton onClick={nextSlide}><RightOutlined /></SliderButton>
        </SliderContainer>
    );
};

export default SliderProducts;
