import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
    startTime: Date;
    maxTime: number; // maxTime in milliseconds
    onEnd: () => void; // Callback when progress ends
}

const ProgressBar: React.FC<ProgressBarProps> = ({ startTime, maxTime, onEnd }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime.getTime();
            const newProgress = Math.max(0, 100 - (elapsedTime / maxTime) * 100);
            setProgress(newProgress);

            if (newProgress === 0) {
                clearInterval(interval);
                onEnd();
            }
        }, 100);

        return () => clearInterval(interval);
    }, [startTime, maxTime, onEnd]);

    return (
        <div className="w-full bg-gray-300 h-5">
            <div
            className="h-full bg-orange-300 transition-all duration-100"
            style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;