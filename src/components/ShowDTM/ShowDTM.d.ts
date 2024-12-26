import { DTMItemMonth } from '../../model/commonResponse';
interface ShowDTMProps {
    productID: string;
    dtmResult: DTMItemMonth[];
}
declare const ShowDTM: (props: ShowDTMProps) => import("react/jsx-runtime").JSX.Element;
export default ShowDTM;
