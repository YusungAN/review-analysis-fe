import styled from 'styled-components';
import MainIcon from '../../assets/main.svg?react';
import AnalysisIcon from '../../assets/analysis.svg?react';
import { Link } from 'react-router-dom';


const NavBar = (props: {chosenIdx: number}) => {
    const {chosenIdx} = props;

    return (
        <>
            <NavWrapper>
               {/* <LinkItem to="/">  */}
                    <NavItem chosen={chosenIdx == 0} to="/">
                        <MainIcon width={25} height={25} fill={chosenIdx == 0 ? 'blue' : 'white'} />
                        데이터 수집
                    </NavItem>
                {/* </LinkItem> */}
                {/* <LinkItem to="/analysis"> */}
                    <NavItem chosen={chosenIdx == 1} to="/list">
                        <AnalysisIcon width={25} height={25} fill={chosenIdx == 1 ? 'blue' : 'white'} />
                        상품 분석
                    </NavItem>
                {/* </LinkItem> */}
            </NavWrapper>
        </>
    );
}

const NavWrapper = styled.div`
    width: 280px;
    height: 100vh;
    max-width: 280px;
    background-color: #7C3EF2;
    display: flex;
    flex-direction: column;
    padding-top: 100px;
    align-items: center;
    position: fixed;
`;

const NavItem = styled(Link)<{chosen: boolean}>`
    width: 80%;
    height: 50px;
    text-decoration: none;
    background-color: ${props => props.chosen ? 'white' : '#7C3EF2'};
    color: ${props => !props.chosen ? 'white' : '#7C3EF2'};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.2rem;
    border-radius: 15px;
    &:hover { 
        color: ${props => !props.chosen ? 'white' : '#7C3EF2'};
    }
`;

export default NavBar;