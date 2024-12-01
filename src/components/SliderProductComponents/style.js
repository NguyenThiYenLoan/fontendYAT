import styled from 'styled-components';

export const SliderContainer = styled.div`
    position: relative;
    width: 75%;
    overflow: hidden;
    margin: 20px auto;
    border-radius: 10px;
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
`;

export const WrapperProducts = styled.div`
    display: flex;
    transition: transform 0.5s ease-in-out;
    width: 80%;
    
`;

export const SliderButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    z-index: 10;

    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }

    &:first-of-type {
        left: 0%;
    }

    &:last-of-type {
        right: 1.2%;
    }
`;
