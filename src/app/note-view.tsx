import Note from "../model/note";

enum ViewStyle {
    TrebleClef = "TrebleClef",
    Text = "Text",
}

function noteToString(note: Note, useB: boolean = false): string {
    switch (note.id) {
        case 0:
            return "C";
        case 1:
            return useB? "Db" : "C#";
        case 2:
            return "D";
        case 3:
            return useB? "Eb" : "D#";
        case 4:
            return "E";
        case 5:
            return "F";
        case 6:
            return useB? "Gb" : "F#";
        case 7:
            return "G";
        case 8:
            return useB? "Ab" : "G#";
        case 9:
            return "A";
        case 10:
            return useB? "Bb" : "A#";
        case 11:
            return "B";
        default:
            return "Unknown";
    }
}

function NoteView({
  viewStyle,
  note,
}: Readonly<{
  viewStyle: ViewStyle;
  note: Note;
}>) {
  return (
    <div className="">
        {
        viewStyle === ViewStyle.TrebleClef ? (
            <p className="text-4xl font-bold font-sans">{noteToString(note)}</p>
        ) : (
            <p className="text-4xl font-bold font-sans">{noteToString(note)}</p>
        )
        }
    </div>
  );
}

export { NoteView, ViewStyle, noteToString };