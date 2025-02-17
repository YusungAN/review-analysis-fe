import styled from "styled-components";

const WordSelector = (props: {wordList: string[], chosenIdx: number, onChangeChosenWord: (idx: number, word: string) => void}) => {
    const {wordList, chosenIdx, onChangeChosenWord} = props;
    
    return <>
        {
            wordList.map((word, idx) => {
                if (word !== undefined) {
                    <WordContainer
                        key={idx}
                        chosen={idx == chosenIdx}
                        onClick={() => onChangeChosenWord(idx, word)}
                    >{word}</WordContainer>
                } else return <></>;
            })
        }
    </>;
};

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

export default WordSelector;