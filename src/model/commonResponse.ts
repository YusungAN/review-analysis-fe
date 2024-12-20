
export interface APIResponse<T> {
    success: boolean;
    message: string | undefined;
    data: T;
}

export interface ProjectListItem {
    id: number;
    project_name: string;
}

export interface ProductAnalysisInfo {
    p_data: ProductData;
    dtm_result: DTMItemMonth[];
    decomposed_trend: number[];
    decomposed_seasonal: number[];
    seasonality_score: number;
    period: number;
}

export interface ProductData {
    id: number;
    product_name: string;
    project_name: string;
    pros: string[][];
    cons: string[][];
    csvname: string;
    trend: number[];
    trend_start_date: string;
    trend_end_date: string;
    trend_warning: boolean;
    trend_keyword1: string;
    trend_keyword2: string;
}

export interface DTMItemMonth {
    id: number;
    topic: number;
    month: string;
    words: string;
    product_id: number;
}

export interface OriginalReview {
    document: string;
    tokens: string;
}

export interface ProductPreview {
    product_name: string;
    category_list: string[];
    review_cnt: number;
    brand_name: string;
    model_name: string;
    word_list: string[];
    img_url: string;
}