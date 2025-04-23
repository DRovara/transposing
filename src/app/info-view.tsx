import React from 'react';

interface InfoViewProps {
    children: React.ReactNode;
}

const InfoView: React.FC<InfoViewProps> = ({ children }) => {
    return (
        <div className="border-2 border-black rounded-lg p-8 inline-block w-[28vw] h-[26vw] flex items-center justify-center place-items-center">
            {children}
        </div>
    );
};

export default InfoView;