import { useState } from 'react';
import styled from 'styled-components';

interface ShowBasicTopicsProps {
    prosList: string[][], 
    consList: string[][], 
}

const ShowBasicTopics = (props: ShowBasicTopicsProps) => {
    const {prosList, consList} = props;

    const [isPros, setIsPros] = useState(0);

    const changeIsPros = async (num: number) => {
        if (isPros == num) return;
        setIsPros(num);
    };

    return (
        <>
            <TopicWrapper>
                <TableTitle>토픽 모델링 결과</TableTitle>
                <ModeWrapper>
                    <InfoModeBtn chosen={isPros == 0} onClick={() => changeIsPros(0)}>
                        장점
                    </InfoModeBtn>
                    <InfoModeBtn chosen={isPros == 1} onClick={() => changeIsPros(1)}>
                        단점
                    </InfoModeBtn>
                </ModeWrapper>
                {isPros == 0 ? (
                    prosList.length == 0 ? (
                        <LoadingText>데이터 양이 적어 결과를 추출할 수 없습니다</LoadingText>
                    ) : (
                        prosList.map((keyword_list, idx) => {
                            return (
                                <InnerTopicWrapper>
                                    <TopicTitle>Topic{idx + 1}</TopicTitle>
                                    <TopicElement>{keyword_list.join(' ')}</TopicElement>
                                </InnerTopicWrapper>
                            );
                        })
                    )
                ) : consList.length == 0 ? (
                    <LoadingText>데이터 양이 적어 결과를 추출할 수 없습니다</LoadingText>
                ) : (
                    consList.map((keyword_list, idx) => {
                        return (
                            <InnerTopicWrapper>
                                <TopicTitle>Topic{idx + 1}</TopicTitle>
                                <TopicElement>{keyword_list.join(' ')}</TopicElement>
                            </InnerTopicWrapper>
                        );
                    })
                )}
            </TopicWrapper>
        </>
    );
};

const TableTitle = styled.div`
    font-weight: bold;
    font-size: 1.7em;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 20px;
`;

const TopicWrapper = styled.div`
    width: calc(100% - 50px);
    background-color: white;
    border-radius: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 20px;
`;

const InnerTopicWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
`;

const TopicElement = styled.div`
    width: 90%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    overflow-x: auto;
    font-size: 1.2rem;
`;

const TopicTitle = styled.div`
    width: 10%;
    height: 30px;
    text-align: center;
    border-right: 1px solid black;
    line-height: 30px;
    font-weight: bold;
`;

const ModeWrapper = styled.div`
    display: flex;
    margin-top: 10px;
    margin-left: 40px;
    margin-bottom: 20px;
`;

const InfoModeBtn = styled.div<{chosen: boolean}>`
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: ${(props) => (props.chosen ? 'white' : '#7C3EF2')};
    background-color: ${(props) => (props.chosen ? '#7C3EF2' : 'white')};
    border-radius: 8px;
    font-size: 0.8rem;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    margin-right: 10px;
    cursor: pointer;
`;

const LoadingText = styled.div`
    width: 100%;
    height: 180px;
    font-size: 1.2rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    line-height: 180px;
`;

export default ShowBasicTopics;
