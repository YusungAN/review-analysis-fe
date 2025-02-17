import styled from "styled-components";

const ProductProfile = (props: {imgUrl: string, productName: string, reviewCount: number}) => {
    const {imgUrl, productName, reviewCount} = props;
    return <div style={{ display: 'flex' }}>
        <ProductImg src={imgUrl} />
        <div>
            <ProductName>{productName}</ProductName>
            <ProductName>
                리뷰 개수: {reviewCount}개{' '}
                <span style={{ fontSize: '1rem' }}>
                    (최대 20,000개까지 수집)
                </span>
            </ProductName>
            {reviewCount < 1000 ? (
                <WarningText>
                    * 리뷰 개수가 부족하여 일부 분석 결과의 신뢰도가
                    떨어질 수 있습니다.{' '}
                </WarningText>
            ) : (
                <></>
            )}
        </div>
    </div>;
}

const ProductImg = styled.img`
    width: 200px;
    height: 200px;
`;

const ProductName = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: 10px;
`;

const WarningText = styled.div`
    font-size: 1rem;
    color: rgba(255, 0, 0, 0.5);
    margin-left: 10px;
`;

export default ProductProfile;