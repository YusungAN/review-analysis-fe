import { OriginalReview, ProductAnalysisInfo, ProductPreview, ProjectListItem } from '../model/commonResponse';
declare const enum ProcessStatus {
    BEFORE_START = 0,
    ON_CRAWLING = 1,
    ON_TOPICMODELING = 2,
    ON_DTM = 3,
    ON_TREND = 4,
    END = 5,
    ERROR = 6
}
declare const getProjectList: () => Promise<ProjectListItem[]>;
declare const getAnalysisResult: (productID: string) => Promise<ProductAnalysisInfo>;
declare const getOriginalReview: (productID: string, word: string) => Promise<OriginalReview[]>;
declare const getWordTrend: (productID: number, word: string) => Promise<unknown>;
declare const startAnalysis: (url: string, project_name: string, product_name: string, category: string) => Promise<import("../model/commonResponse").APIResponse<number>>;
declare const downloadCsv: (filename: string) => Promise<string | null>;
declare const crawlProductBasicInfo: (url: string) => Promise<ProductPreview>;
declare const getProjectStatus: () => Promise<{
    [project_name: string]: ProcessStatus;
}>;
export { startAnalysis, downloadCsv, ProcessStatus, getProjectList, getAnalysisResult, getOriginalReview, getWordTrend, crawlProductBasicInfo, getProjectStatus, };
