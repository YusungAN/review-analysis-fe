import { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar/NavBar';
import { getProjectList, getProjectStatus } from '../api/api';
import { Link } from 'react-router-dom';
import RefreshIcon from '../assets/refresh.svg?react';
import { ProjectListItem } from '../model/commonResponse';
import { useProcessStore } from '../util/store.ts';

const List = () => {

    const { status, update } = useProcessStore();

    const [projectList, setProjectList] = useState<ProjectListItem[] | undefined>(undefined);
    const [updateSec, setUpdateSec] = useState<number>(0);

    const messages = [
        '리뷰를 크롤링하고 있어요 (1/4)',
        '토픽 모델링을 진행하고 있어요 (2/4)',
        'DTM을 진행하고 있어요 (3/4)',
        '트렌드를 예측하고 있어요 (4/4)',
        '분석이 완료되었습니다.',
        '문제가 발생했습니다.',
    ];

    const handleGetLists = async () => {
        setUpdateSec(0);
        try {
            const data = await getProjectList();
            setProjectList(data);
        } catch (err) {
            console.log(err);
        }

        try {
            const status_list = await getProjectStatus();
            update(status_list);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleGetLists();

        const hb = setInterval(() => {
            setUpdateSec((prev) => prev + 1);
        }, 1000);

        return () => {
            clearInterval(hb);
        };
    }, []);

    return (
        <>
            <FullWrapper>
                <NavBar chosenIdx={1} />
                <LeftContainer>
                    <TitleText>프로젝트의 분석 결과를 확인하세요</TitleText>
                    <WhiteContainer>
                        <TableTitleWrapper>
                            <ID>id</ID>
                            <ProjectName>프로젝트 이름</ProjectName>
                        </TableTitleWrapper>
                        {projectList == undefined ? (
                            <LoadingText>로딩중..</LoadingText>
                        ) : (
                            projectList.map((info, idx) => {
                                return (
                                    <ItemWrapper key={idx} to={`/analysis/${info.id}`}>
                                        <ID>{info.id}</ID>
                                        <ProjectName>{info.project_name}</ProjectName>
                                    </ItemWrapper>
                                );
                            })
                        )}
                    </WhiteContainer>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TitleText>분석 진행중인 프로젝트의 상태를 확인하세요</TitleText>
                        <RefreshIcon
                            width={30}
                            height={30}
                            style={{ cursor: 'pointer', marginTop: '80px', marginLeft: '10px' }}
                            onClick={handleGetLists}
                        />
                        <div style={{ marginTop: '85px', marginLeft: '10px' }}>
                            마지막 업데이트: <span>{updateSec}</span>초 전
                        </div>
                    </div>
                    <WhiteContainer>
                        <TableTitleWrapper>
                            <ID>프로젝트 이름</ID>
                            <ProjectName>상태</ProjectName>
                        </TableTitleWrapper>
                        {Object.keys(status).length === 0 ? (
                            // <LoadingText />
                            <></>
                        ) : (
                            Object.keys(status).map((name, idx) => {
                                return (
                                    <ItemWrapper key={idx} to={`/analysis/${name}`}>
                                        <ID>{name}</ID>
                                        <ProjectName>{messages[status[name] - 1]}</ProjectName>
                                    </ItemWrapper>
                                );
                            })
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
    margin-left: 50px;
    margin-left: calc(280px + 3%);
`;

const TitleText = styled.div`
    font-size: 2rem;
    font-weight: bold;
    margin-top: 100px;
    margin-bottom: 20px;
`;

const WhiteContainer = styled.div`
    width: calc(100% - 50px);
    /* height: 400px; */
    background-color: white;
    border-radius: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoadingText = styled.div`
    width: 100%;
    height: 50px;
    font-size: 1.2rem;
    font-weight: bold;
    color:rgb(125, 125, 125);
    text-align: center;
    line-height: 50px;
`;

const TableTitleWrapper = styled.div`
    width: 95%;
    height: 30px;
    font-size: 1.1rem;
    font-weight: bold;
    display: flex;
    border-bottom: 2px solid black;
`;

const ItemWrapper = styled(Link)`
    width: 95%;
    height: 50px;
    line-height: 50px;
    font-size: 1rem;
    color: black;
    display: flex;
    border-bottom: 1px solid black;
    &:hover {
        background-color: #f9f9f9;
    }
`;

const ID = styled.div`
    width: 30%;
    text-align: center;
`;

const ProjectName = styled.div`
    width: 70%;
    text-align: center;
`;

export default List;
