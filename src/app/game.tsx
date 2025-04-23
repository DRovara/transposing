"use client";

import React from 'react';
import InfoView from './info-view';
import { noteToString, NoteView, ViewStyle } from './note-view';
import SelectButton from './select-button';
import { GameState } from '@/model/game-state';
import Note from '@/model/note';
import ProgressBar from './progress-bar';

interface GameProps {
    gameState: GameState;
    onEnd: () => void;
}

const Game: React.FC<GameProps> = ({ gameState, onEnd }) => {
    const [isCorrect, setIsCorrect] = React.useState(false);
    const [isWrong, setIsWrong] = React.useState(false);

    const setCorrectWrong = (correct: boolean) => {
        setIsCorrect(correct);
        setIsWrong(!correct);
        setTimeout(() => {
            setIsCorrect(false);
            setIsWrong(false);
        }, 500); // Wait for 1 second before resetting

    }

    if (!gameState) {
        return <div>Loading...</div>; // or some loading indicator
    }

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <ProgressBar startTime={gameState.startTime} maxTime={30000} onEnd={() => onEnd()}/>
            <div className={"flex-2 flex items-center justify-center transition-colors duration-1000" + (isCorrect ? " bg-blue-300" : isWrong ? " bg-red-500" : " bg-white")}>	
                <InfoView>
                    <NoteView viewStyle={ViewStyle.Text} note={gameState.currentNote} />
                </InfoView>
            </div>
            <div className="flex items-center justify-between bg-white">
                <span className="flex-1 text-center bg-black text-white font-bold text-4xl">{noteToString(new Note(gameState.currentFrom), true)}</span>
                <div className='w-0 h-0 border-t-[20px] border-b-[20px] border-w-[50px] border-l-[25px] border-t-transparent border-b-transparent border-black bg-gray-500 -ml-10 -mr-5 z-10'></div>
                <span className="flex-1 text-center bg-gray-500 text-white font-bold text-4xl">{noteToString(new Note(gameState.currentTo), true)}</span>
            </div>
            <div className="flex-3 grid grid-cols-2 grid-rows-2 gap-4 items-center justify-center p-10 place-items-center">
                <SelectButton onClick={() => { setCorrectWrong(gameState.check(gameState.alternativeNotes[0])); }}>
                    <NoteView viewStyle={ViewStyle.Text} note={gameState.alternativeNotes[0]} />
                </SelectButton>
                <SelectButton onClick={() => { setCorrectWrong(gameState.check(gameState.alternativeNotes[1])); }}>
                    <NoteView viewStyle={ViewStyle.Text} note={gameState.alternativeNotes[1]} />
                </SelectButton>
                <SelectButton onClick={() => { setCorrectWrong(gameState.check(gameState.alternativeNotes[2])); }}>
                    <NoteView viewStyle={ViewStyle.Text} note={gameState.alternativeNotes[2]} />
                </SelectButton>
                <SelectButton onClick={() => { setCorrectWrong(gameState.check(gameState.alternativeNotes[3])); }}>
                    <NoteView viewStyle={ViewStyle.Text} note={gameState.alternativeNotes[3]} />
                </SelectButton>
            </div>
        </div>
    );
};

export default Game;
