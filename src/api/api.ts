import axios, {AxiosRequestConfig} from 'axios';
import { getData, postData } from '.';
import { OriginalReview, ProductAnalysisInfo, ProductPreview, ProjectListItem } from '../model/commonResponse';

const HOST = 'http://localhost:8000';
// const HOST = 'http://20.39.194.161';

const enum ProcessStatus {
    BEFORE_START,
    ON_CRAWLING,
    ON_TOPICMODELING,
    ON_DTM,
    ON_TREND,
    END,
    ERROR,
};

// const heartbeat = async (clientID: string) => {
//     const { data: data } = await getData(`${HOST}/users/heartbeat`, {
//         params: { client_id: clientID },
//     });
//     console.log('hb', data, clientID);
//     if (data.success) return data.status;
//     else return 6;
// };

// const deleteUser = async (clientID: string) => {
//     const { data: data } = await axios.get(`${HOST}/users/deleteuser`, {
//         params: { client_id: clientID },
//     });
//     if (data.success) return data.status;
//     else return -1;
// };

// const addUser = async (clientID: string) => {
//     const { data: data } = await axios.get(`${HOST}/users/adduser`, {
//         params: { client_id: clientID },
//     });
//     console.log('add', clientID);
//     if (data.success) return 1;
//     else return -1;
// };

const getProjectList = async () => {
    const res = await getData<ProjectListItem[]>(`/data/getlist`);
    if (res.success) {
        return res.data;
    } else {
        throw Error('get projectlist fail');
    }
};

const getAnalysisResult = async (productID: string) => {
    const res = await getData<ProductAnalysisInfo>(`/data/getdata`, {
        params: { product_id: productID },
    });
    if (res.success) {
        return res.data;
    } else {
        throw Error('get analysis info fail');
    }
};

const getOriginalReview = async (productID: string, word: string) => {
    const res = await getData<OriginalReview[]>(`/data/getoriginalreview`, {
        params: { product_id: productID, word: word },
    });
    if (res.success) {
        return res.data;
    } else {
        throw Error('get original review fail');
    }
};

const getWordTrend = async (productID: number, word: string) => {
    const { data: data } = await getData(`${HOST}/data/getwordtrend`, {
        params: { product_id: productID, word: word },
    });

    return data;
};

const startAnalysis = async (url: string, project_name: string, product_name: string, category: string) => {
    const res = await postData<number>(`/start`, {
        url: url,
        project_name: project_name,
        product_name: product_name,
        category: category,
    });

    return res;
};

const downloadCsv = async (filename: string) => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `${HOST}/downloadcsv/?filename=${filename}`,
        responseType: 'blob',
    };
    const res = await axios(config);
    if (res != null) {
        const blob = new Blob([res.data]);
        return window.URL.createObjectURL(blob);
    }

    return null;
};

const crawlProductBasicInfo = async (url: string) => {
    const res = await getData<ProductPreview>(`/data/basicinfo/?url=${url}`);
    // console.log(data);
    if (res.success) {
        return res.data;
    } else {
        throw Error('get product info fail');
    }
};

const getProjectStatus = async () => {
    const res = await getData<{[project_name: string]: ProcessStatus}>(`/data/project_status`);
    if (res.success) {
        return res.data;
    }
    return {};
};

export {
    // addUser,
    startAnalysis,
    downloadCsv,
    ProcessStatus,
    getProjectList,
    getAnalysisResult,
    getOriginalReview,
    getWordTrend,
    // heartbeat,
    // deleteUser,
    crawlProductBasicInfo,
    getProjectStatus,
};