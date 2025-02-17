import { useState, useEffect } from "react";
import { ProductAnalysisInfo } from "../model/commonResponse";
import { getAnalysisResult } from "../api/api";

const useAnalysisInfo = (productid: string | null) => {

    const [productInfo, setProductInfo] = useState<ProductAnalysisInfo>({
        p_data: {
            id: 0,
            product_name: '---',
            project_name: '---',
            pros: [[]],
            cons: [[]],
            csvname: 'string',
            trend: [],
            trend_start_date: '',
            trend_end_date: 'string',
            trend_warning: false,
            trend_keyword1: '',
            trend_keyword2: '',
        },
        dtm_result: [],
        decomposed_trend: [],
        decomposed_seasonal: [],
        seasonality_score: 0,
        period: 0,
    });
    
    const [dateList, setDateList] = useState<string[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const handleGetAnalysusResult = async (productid: string | null) => {
        try {
            const data = await getAnalysisResult(productid!);

            console.log(data);
            setProductInfo(data);

            const startDateStr = data.p_data.trend_start_date;
            const startDate = new Date(
                Number(startDateStr.slice(0, 4)),
                Number(startDateStr.slice(4, 6)),
                Number(startDateStr.slice(6, 8))
            );

            let dateListTemp = [];
            let i = 0;
            while (i < data.p_data.trend.length) {
                dateListTemp.push(
                    `${startDate.getFullYear()}. ${
                        startDate.getMonth() + 1
                    }. ${startDate.getDate()}.`
                );
                startDate.setDate(startDate.getDate() + 7);
                i += 1;
            }
            setDateList(dateListTemp);
        } catch (err) {
            console.log(err);
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetAnalysusResult(productid);
    }, []);

    return {productInfo, dateList, loading, error, refetch: handleGetAnalysusResult};
};

export default useAnalysisInfo;