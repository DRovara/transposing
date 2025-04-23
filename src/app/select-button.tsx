import React, { ReactNode } from 'react';

interface SelectButtonProps {
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
}

const SelectButton: React.FC<SelectButtonProps> = ({ onClick, children, className }) => {
    return (
        <button 
            onClick={onClick} 
            className={`button w-[28vw] h-[26vw] p-8 bg-gray-200 rounded-lg cursor-pointer select-none
        active:translate-y-2  active:[box-shadow:0_0px_0_0_#bbbbbb]
        active:border-b-[0px]
        transition-all duration-75 [box-shadow:0_10px_0_0_#bbbbbb]
        border-b-[1px] border-gray-50 
         
      ` + (className? className : '')}
        >
            {children}
        </button>
    );
};

export default SelectButton;