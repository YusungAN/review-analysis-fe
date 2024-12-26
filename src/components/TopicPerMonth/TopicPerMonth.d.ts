interface TopicPerMonthProps {
    month: string;
    topicObj: {
        [month: string]: string[];
    };
    onChange: (word: string, topic: number, month: string) => void;
    chosenWord: string;
    chosenTopic: number;
    chosenMonth: string;
}
declare const TopicPerMonth: (props: TopicPerMonthProps) => import("react/jsx-runtime").JSX.Element;
export default TopicPerMonth;
