import { useState } from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import { startAnalysis, crawlProductBasicInfo } from '../api/api.ts';
import { ProductPreview } from '../model/commonResponse.ts';

const enum LOAD_CHECK {
    INIT,
    LOADING,
    END,
    ERROR,
};

const Home = () => {
    const [url, setUrl] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [projectName, setProjectName] = useState<string>('');
    const [productBasicInfo, setProductBasicInfo] = useState<ProductPreview>();
    const [chosenKeywordIdx, setChosenKeywordIdx] = useState<number>(-1);
    const [chosenCategoryIdx, setChosenCategoryIdx] = useState<number>(-1);
    const [loadingStatus, setLoadingStatus] = useState<LOAD_CHECK>(LOAD_CHECK.INIT);

    const onChangeUrl = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoadingStatus(LOAD_CHECK.LOADING);
        if (e.target.value === '') {
            setLoadingStatus(LOAD_CHECK.INIT);
        }
        setUrl(e.target.value);
        try {
            const data = await crawlProductBasicInfo(e.target.value);
            setProductBasicInfo(data);
            console.log(data);
            setLoadingStatus(LOAD_CHECK.END);
            
        } catch (err) {
            console.log(err);
            setLoadingStatus(LOAD_CHECK.ERROR);
        }
    };

    const onChangeProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(e.target.value);
    };

    const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    };

    const onChangeProjectName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(e.target.value);
    };

    const handleStartAnalysis = async () => {
        const data = await startAnalysis(url, projectName, productName, category);
        console.log(data);
        if (data.success) {
            alert('분석이 성공적으로 시작되었습니다.');
        } else {
            alert(data.message);
        }
    };

    const changeChosenKeywordIdx = (idx: number, word: string) => {
        setChosenKeywordIdx(idx);
        setProductName(word);
    };

    const changeChosenCategoryIdx = (idx: number, word: string) => {
        setChosenCategoryIdx(idx);
        setCategory(word);
    };

    return (
        <>
            <FullWrapper>
                <NavBar chosenIdx={0} />
                <LeftContainer>
                    <TitleText>리뷰를 수집할 상품 링크를 입력해주세요</TitleText>
                    <ul>
                        <SmallList>
                            네이버 스마트스토어 링크만 가능해요 (smartstore.naver.com,
                            brand.naver.com)
                        </SmallList>
                        <SmallList>링크가 'https://'로 시작하도록 해주세요</SmallList>
                        <SmallList>현재 여러 사정으로 새로운 상품을 분석하기는 어렵습니다.(네이버 쇼핑 크롤링 방지 방안 강화/상세 path 변경/현재 AI 모델을 서빙할 수준의 서버 구축 어려움)</SmallList>
                    </ul>
                    <WhiteContainer>
                        <LinkInput onChange={onChangeUrl} value={url} placeholder="링크 입력" />
                        {loadingStatus === LOAD_CHECK.END ? (
                            <ProductInfoWrapper
                                available={productBasicInfo !== undefined}
                            >
                                <div style={{ display: 'flex' }}>
                                    <ProductImg src={productBasicInfo!.img_url} />
                                    <div>
                                        <ProductName>{productBasicInfo!.product_name}</ProductName>
                                        <ProductName>
                                            리뷰 개수: {productBasicInfo!.review_cnt}개{' '}
                                            <span style={{ fontSize: '1rem' }}>
                                                (최대 20,000개까지 수집)
                                            </span>
                                        </ProductName>
                                        {productBasicInfo!.review_cnt < 1000 ? (
                                            <WarningText>
                                                * 리뷰 개수가 부족하여 일부 분석 결과의 신뢰도가
                                                떨어질 수 있습니다.{' '}
                                            </WarningText>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                                <NameText>프로젝트 제목을 적어주세요</NameText>
                                <NameInput
                                    onChange={onChangeProjectName}
                                    value={projectName}
                                    placeholder="프로젝트 이름"
                                />
                                <NameText>트렌드 파악에 활용될 상품 키워드를 적어주세요</NameText>
                                <NameInput
                                    onChange={onChangeProductName}
                                    value={productName}
                                    placeholder="상품 이름"
                                />
                                <SmallText>추천 키워드</SmallText>
                                <div
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        overflowX: 'auto',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {productBasicInfo !== undefined ? (
                                        [
                                            productBasicInfo.model_name,
                                            ...productBasicInfo.word_list,
                                        ].map((word, idx) => {
                                            if (word != undefined) {
                                                return (
                                                    <WordContainer
                                                        key={idx}
                                                        chosen={idx === chosenKeywordIdx}
                                                        onClick={() =>
                                                            changeChosenKeywordIdx(idx, word)
                                                        }
                                                    >
                                                        {word}
                                                    </WordContainer>
                                                );
                                            } else return <></>;
                                        })
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <NameText>트렌드 파악에 활용될 2차 키워드를 적어주세요</NameText>
                                <NameInput
                                    onChange={onChangeCategory}
                                    value={category}
                                    placeholder="2차 키워드"
                                />
                                <SmallText>추천 키워드(카테고리/브랜드 추천)</SmallText>
                                <div style={{ display: 'flex', overflowX: 'auto' }}>
                                    {productBasicInfo !== undefined ? (
                                        [
                                            productBasicInfo.brand_name,
                                            ...productBasicInfo.category_list,
                                        ].map((word, idx) => {
                                            return (
                                                <WordContainer
                                                    key={idx}
                                                    chosen={idx === chosenCategoryIdx}
                                                    onClick={() =>
                                                        changeChosenCategoryIdx(idx, word)
                                                    }
                                                >
                                                    {word}
                                                </WordContainer>
                                            );
                                        })
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <StartBtn
                                    available={true}
                                    onClick={handleStartAnalysis}
                                >
                                    시작하기
                                </StartBtn>
                            </ProductInfoWrapper>
                        ) : (
                            <Loading>
                                {loadingStatus === LOAD_CHECK.INIT
                                    ? '링크를 입력하세요'
                                    : loadingStatus === LOAD_CHECK.LOADING
                                    ? '로딩중...'
                                    : <>
                                    <div>링크에서 정보를 불러올 수 없습니다.</div>
                                    </>}
                            </Loading>
                        )}
                    </WhiteContainer>
                </LeftContainer>
            </FullWrapper>
        </>
    );
};

const FullWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #f9f9f9;
    display: flex;
`;

const LeftContainer = styled.div`
    width: 80%;
    margin-left: calc(280px + 3%);
`;

const TitleText = styled.div`
    font-size: 2rem;
    font-weight: bold;
    margin-top: 50px;
`;

const SmallList = styled.li`
    &::marker {
        color: #7f7f7f;
    }
    color: #7f7f7f;
`;

const SmallText = styled.div`
    color: #7f7f7f;
    margin-top: 10px;
`;


const WhiteContainer = styled.div`
    width: calc(100% - 50px);
    height: 70vh;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
`;

const LinkInput = styled.input`
    width: 90%;
    height: 70px;
    margin-left: 5%;
    margin-top: 40px;
    background-color: #eeeff3;
    border-radius: 20px;
    outline: none;
    border: none;
    font-size: 1.5rem;
    padding-left: 15px;
    font-weight: 100;
    &:focus {
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }
`;

const NameText = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 30px;
`;

const NameInput = styled.input`
    width: 200px;
    height: 30px;
    margin-top: 10px;
    background-color: #eeeff3;
    border-radius: 10px;
    outline: none;
    border: none;
    font-size: 1rem;
    padding-left: 15px;
    font-weight: 100;
    &:focus {
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }
`;

const StartBtn = styled.button<{available: boolean}>`
    width: 150px;
    height: 50px;
    margin-left: calc(100% - 130px);
    color: white;
    background-color: ${(props) => (props.available ? '#7C3EF2' : 'grey')};
    border-radius: 10px;
    font-size: 1.2rem;
    margin-bottom: 20px;
`;

const ProductInfoWrapper = styled.div<{available: boolean}>`
    display: ${(props) => (props.available ? 'block' : 'none')};
    width: 90%;
    margin-left: 5%;
    margin-top: 20px;
`;

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

const WordContainer = styled.div<{chosen: boolean}>`
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 5px;
    /* line-height: 18px; */
    margin-top: 5px;
    background-color: ${(props) => (props.chosen ? 'rgba(0, 0, 0, 0.1)' : '#FFFFFF')};
    margin-right: 10px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    font-size: min(1vw, 1rem);
`;

const Loading = styled.div`
    width: 100%;
    height: 40vh;
    text-align: center;
    line-height: 40vh;
    font-size: 1.7rem;
    color: rgba(0, 0, 0, 0.3);
`;

export default Home;
