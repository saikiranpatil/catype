interface TypingSummaryProps {
    typedText: string;
    actualText: string;
    typedTime: number[];
}
const TypingSummary = ({ typedText, actualText, typedTime }: TypingSummaryProps) => {
    const wordsData = actualText.split(" ").length;
    const timeData = typedTime.length ? typedTime[typedTime.length - 1] / 1000 : -1;
    const accuracyCount = [...Array(wordsData)].reduce((count, _, idx) => (typedText[idx] === actualText[idx]) ? count + 1 : count, 0);
    const accuracyData = accuracyCount * 100 / wordsData;
    const speedData = (accuracyCount * 60) / timeData;

    const typingSummaryData = [
        {
            title: "time",
            value: `${timeData.toFixed(1)} s`
        },
        {
            title: "words",
            value: `${wordsData.toFixed(0)}`
        },
        {
            title: "accuarcy",
            value: `${accuracyData.toFixed(0)} %`
        },
        {
            title: "speed",
            value: `${speedData.toFixed(0)} wpm`
        },
    ]
    return (
        <div className="flex justify-center items-center">
            {typingSummaryData.map(data => (
                <div className="flex flex-1 items-center">
                    <span>
                        <span className="text-2xl">{data.title}</span>
                        <h1 className="text-4xl text-main">{data.value}</h1>
                    </span>
                </div>
            ))}
        </div>
    )
}

export default TypingSummary