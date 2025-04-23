import React, { useState } from 'react';

interface MenuProps {
    onStart: (selectedKeys: string[][]) => void;
    lastScore?: number;
}

const Menu: React.FC<MenuProps> = ({ onStart, lastScore }) => {
    const [selectedKeys, setSelectedKeys] = useState<string[][]>([['C'], ['Eb']]); // Default selected keys

    const toggleKey = (side: number, key: string) => {
        setSelectedKeys((prev) =>
            prev[side].includes(key) ? prev.map((s, si) => si == side ? s.filter((k) => k !== key) : s) : [side == 0 ? [...prev[0], key] : prev[0], side == 1 ? [...prev[1], key] : prev[1]]
        );
    };

    const handleStart = () => {
        if(!selectedKeys[0].length || !selectedKeys[1].length) {
            alert("Please select at least one from/to key.");
            return;
        }
        if(selectedKeys[0].length == 1 && selectedKeys[1].length == 1 && selectedKeys[0][0] === selectedKeys[1][0]) {
            alert("Please select different keys.");
            return;
        }
        onStart(selectedKeys);
    };

    return (
        <div className="flex flex-col items-center justify-evenly h-[100vh]">
            {
                lastScore !== -1 && lastScore !== undefined && ( 
                <div className="text-4xl mb-5">
                    Score: {lastScore}
                </div>
                )
            }
            <button
                onClick={handleStart}
                className="border-2 border-black px-5 py-2 mb-5 cursor-pointer text-4xl rounded-lg"
            >
                START
            </button>
            <div className="flex flex-row justify-evenly w-[100vw]">
                <div className="flex flex-col gap-2.5 text-4xl">
                    <span className="text-center">from:</span>
                    {['C', 'Eb', 'Bb', 'F'].map((key) => (
                        <button
                            key={key}
                            onClick={() => toggleKey(0, key)}
                            className={`px-4 py-2 rounded-lg border-2 ${
                                selectedKeys[0].includes(key)
                                    ? 'bg-orange-500 text-white border-orange-500'
                                    : 'bg-white text-black border-black'
                            }`}
                        >
                            {key}
                        </button>
                    ))}
                </div>
                <div className="flex flex-col gap-2.5 text-4xl">
                    <span className="text-center">to:</span>
                    {['C', 'Eb', 'Bb', 'F'].map((key) => (
                        <button
                            key={key}
                            onClick={() => toggleKey(1, key)}
                            className={`px-4 py-2 rounded-lg border-2 ${
                                selectedKeys[1].includes(key)
                                    ? 'bg-orange-500 text-white border-orange-500'
                                    : 'bg-white text-black border-black'
                            }`}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Menu;
