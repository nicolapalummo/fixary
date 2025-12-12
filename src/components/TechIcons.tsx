export const IconProps = {
    className: "w-full h-full fill-current"
};

export function IconCursor({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M4.5 4.5L10.5 20.5L13.5 13.5L20.5 10.5L4.5 4.5Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    )
}

export function IconWindsurf({ className }: { className?: string }) {
    // A wave/surf like shape for Windsurf/Codeium
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
    )
}

export function IconReplit({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M4 6H10V10H4V6Z" fill="currentColor" />
            <path d="M4 14H10V18H4V14Z" fill="currentColor" />
            <path d="M12 10H18V14H12V10Z" fill="currentColor" />
        </svg>
    )
}

export function IconCopilot({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM15.5 15.5L12 13.5L8.5 15.5L9.5 11.5L6.5 8.5H10.5L12 4.5L13.5 8.5H17.5L14.5 11.5L15.5 15.5Z" fill="currentColor" />
        </svg>
    )
}

export function IconClaude({ className }: { className?: string }) {
    // Anthropic-ish shape (often simple geometric or stylized A)
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

export function IconGemini({ className }: { className?: string }) {
    // Star/Sparkle shape
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
        </svg>
    )
}

export function IconChatGPT({ className }: { className?: string }) {
    // Swirl
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M12 4C13.5 4 14.8 4.4 15.9 5.2L14.5 7.6C13.8 7.2 12.9 7 12 7C9.2 7 7 9.2 7 12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12H14V10H20V12C20 16.4 16.4 20 12 20C7.6 20 4 16.4 4 12C4 7.6 7.6 4 12 4Z" fill="currentColor" />
        </svg>
    )
}
