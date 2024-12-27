interface TypingSummaryProps {
    typedText: string;
    actualText: string;
}
const TypingSummary = ({ typedText, actualText }: TypingSummaryProps) => {
    return (
        <>
            <div>{typedText}</div>
            <div>{actualText}</div>
        </>
    )
}

export default TypingSummary