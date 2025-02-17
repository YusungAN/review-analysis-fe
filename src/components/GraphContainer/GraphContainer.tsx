import styled from 'styled-components';
import TrendChart from '../TrendChart';


const GraphContainer = (props: {trend: number[][], dateList: string[], forecastCheck: boolean}) => {
    const {trend, dateList, forecastCheck} = props;
    if (trend.length == 0)
        return <LoadingText>로딩중...</LoadingText>;
    else if (trend[0][0] == -1)
        return <LoadingText>트렌드 예측이 수행되지 않았습니다.</LoadingText>;
    else
        return <TrendChart
            frequency={trend}
            x={dateList}
            label="검색량 추이"
            forecastCheck={forecastCheck}
        />;
};

const LoadingText = styled.div`
    width: 100%;
    height: 240px;
    font-size: 1.2rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    line-height: 240px;
`;

export default GraphContainer;
