import React from "react";

export function MyMessage({message, className}) {
    return (
        <div className="never-gonna">
            <span className={className}>{message}</span>
        </div>
    )
}