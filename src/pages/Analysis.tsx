import { useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import NavBar from '../components/NavBar/NavBar';
import ShowBasicTopics from '../components/ShowBasicTopics/ShowBasicTopics';
import ShowDTM from '../components/ShowDTM/ShowDTM';
import { downloadCsv } from '../api/api';
import Checkbox from '@mui/material/Checkbox';
import GraphContainer from '../components/GraphContainer/GraphContainer';
import useAnalysisInfo from '../hooks/useAnalysisInfo';

const Analysis = () => {
    const params = useParams();

    const {productInfo, dateList} = useAnalysisInfo(params.productid!);
    const [forecastCheck, setForecastCheck] = useState<boolean>(false);


    const handleDownload = async (filename: string) => {
        console.log(filename);
        const fileObjectUrl = await downloadCsv(filename);
        if (fileObjectUrl == null) {
            alert('파일에 문제가 발생하여 다운로드할 수 없습니다.');
            return;
        }
        const link = document.createElement('a');
        link.href = fileObjectUrl;
        link.style.display = 'none';
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(fileObjectUrl);
    };

    const handleForecastCheck = () => {
        setForecastCheck(!forecastCheck);
    };

    return (
        <>
                <FullWrapper>
                <NavBar chosenIdx={1} />
                <LeftContainer>
                    <TitleText>'{productInfo?.p_data.product_name}' 상품의 분석 결과입니다.</TitleText>
                    <DownloadBtn onClick={() => handleDownload(productInfo?.p_data.csvname!)}>데이터 다운로드 (.csv)</DownloadBtn>
                    <ShowBasicTopics prosList={productInfo?.p_data.pros!} consList={productInfo?.p_data.cons!} />
                    <ShowDTM productID={params.productid!} dtmResult={productInfo?.dtm_result!} />
                    <GraphWrapper>
                        <GraphText>트렌드 예측 그래프</GraphText>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div>트렌드 예측 결과 포함</div>
                            <Checkbox checked={forecastCheck} onChange={handleForecastCheck} />
                        </div>
                        {productInfo?.p_data.trend_warning && <SmallLoadingText>
                            ※ 지난 3개년 간의 검색량이 부족하여 예측의 정확도가 매우 낮을 수
                            있습니다.
                        </SmallLoadingText>}
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                height: '80%',
                            }}
                        >
                            <GraphContainer trend={[productInfo?.p_data.trend!, productInfo?.decomposed_trend!, productInfo?.decomposed_seasonal!]} dateList={dateList} forecastCheck={forecastCheck} />
                        </div>
                    </GraphWrapper>
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
    overflow-y: auto;
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

const GraphText = styled.div`
    font-size: 1.75rem;
    font-weight: bold;
    margin-top: 50px;
    overflow-x: auto;
`;

const DownloadBtn = styled.button`
    width: 150px;
    height: 30px;
    margin-left: calc(100% - 200px);
    color: white;
    background-color: #7c3ef2;
    border-radius: 8px;
    font-size: 0.8rem;
`;

const GraphWrapper = styled.div`
    width: calc(100% - 50px);
    height: 650px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SmallLoadingText = styled.div`
    font-size: 1rem;
    color: rgba(255, 0, 0, 0.5);
    text-align: center;
`;

export default Analysis;
