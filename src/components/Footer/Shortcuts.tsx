const Shortcuts = () => {
    return (
        <div className="flex gap-2 text-sm items-center justify-center p-2">
            <Keys>tab</Keys>
            <span>+</span>
            <Keys>enter</Keys>
            <span>-</span>
            <span>restart test</span>
        </div>
    )
}

const Keys = ({ children }: { children: React.ReactNode }) => {
    return (
        <span className="bg-sub text-bg px-1 rounded-sm text-xs">{children}</span>
    )
}

export default Shortcuts 