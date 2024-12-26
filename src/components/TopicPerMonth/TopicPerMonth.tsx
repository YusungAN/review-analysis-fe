import styled from 'styled-components';

interface TopicPerMonthProps {
    month: string, 
    topicObj: {[month: string]: string[]}; 
    onChange: (word: string, topic: number, month: string) => void, 
    chosenWord: string, 
    chosenTopic: number, 
    chosenMonth: string
}

const TopicPerMonth = (props: TopicPerMonthProps) => {
    const { month, topicObj, onChange, chosenWord, chosenTopic, chosenMonth } = props;
    return (
        <>
            <MonthWrapper>
                <MonthTitle>{month}</MonthTitle>
                <KeywordsWrapper>
                    {month !== undefined ? (
                        topicObj[month].map((words: string, idx: number) => {
                            return (
                                <KeywordElement key={idx}>
                                    {words
                                        .split(', ')
                                        .slice(0, 5)
                                        .map((innerWord, idx2) => {
                                            if (innerWord !== '')
                                                return (
                                                    <WordContainer
                                                        key={idx2}
                                                        chosen={
                                                            innerWord == chosenWord &&
                                                            idx2 == chosenTopic &&
                                                            month == chosenMonth
                                                        }
                                                        onClick={() =>
                                                            onChange(innerWord, idx2, month)
                                                        }
                                                    >
                                                        {innerWord}
                                                    </WordContainer>
                                                );
                                        })}
                                </KeywordElement>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </KeywordsWrapper>
            </MonthWrapper>
        </>
    );
};

const MonthWrapper = styled.div`
    width: 80%;
    height: 100%;
    overflow-x: auto;
`;

const MonthTitle = styled.div`
    width: 100%;
    text-align: center;
    font-weight: bold;
    border-bottom: 2px solid black;
    font-size: 1.2rem;
    margin-top: 20px;
`;

const KeywordsWrapper = styled.div`
    width: 100%;
    height: 212px;
    display: flex;
    flex-wrap: nowrap;
    flex-grow: 0;
    flex-shrink: 0;
    flex-direction: column;
`;

const KeywordElement = styled.div`
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid black;
    height: 60px;
    padding-left: 10px;
    padding-right: 10px;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    align-items: center;
    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.1);
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.2);
    }
    &::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.4);
    }
    &::-webkit-scrollbar-thumb:active {
        background: rgba(0, 0, 0, 0.9);
    }
`;

const WordContainer = styled.div<{chosen: boolean}>`
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 5px;
    height: 18px;
    /* line-height: 18px; */
    margin-top: 5px;
    background-color: ${(props) =>
        props.chosen ? 'rgba(238, 230, 196, 1)' : 'rgba(238, 230, 196, 0.5)'};
    margin-right: 10px;
`;

export default TopicPerMonth;
