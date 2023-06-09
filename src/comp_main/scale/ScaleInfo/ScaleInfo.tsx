import './ScaleInfo.scss'
import { ChordTable } from './ChordTable/ChordTable'
import { ScaleNotes } from './ScaleNotes/ScaleNotes'
import { ChordPatterns } from './ChordPatterns/ChordPatterns'

interface ScaleInfoProps {
    scaleInfo: ScaleInfo
    highlightState: HighlightState
    highlightCtrl: HighlightCtrl
}
/**
 * Displays information about the scale, specifically notes and chords.
 */
export function ScaleInfo({ scaleInfo, highlightState, highlightCtrl }: ScaleInfoProps) {
    function toggleHighlightNote(noteIndex: number) {
        if (highlightState.notes[noteIndex]) {
            highlightCtrl.unhighlightNote(noteIndex)
        } else {
            highlightCtrl.highlightNote(noteIndex)
        }
    }
    function toggleHighlightChord(chordIndex: number, includeSeventh?: boolean) {
        if (highlightState.chords[chordIndex]) {
            highlightCtrl.unhighlightChord(chordIndex)
            scaleInfo.chords[chordIndex].num.forEach((note, index) => {
                if (index !== 3 || includeSeventh) {
                    highlightCtrl.unhighlightNote(scaleInfo.scale.num.indexOf(note))
                }
            })
        } else {
            highlightCtrl.highlightChord(chordIndex)
            scaleInfo.chords[chordIndex].num.forEach((note, index) => {
                if (index !== 3 || includeSeventh) {
                    highlightCtrl.highlightNote(scaleInfo.scale.num.indexOf(note))
                }
            })
        }
    }

    return (
        <div className="section scaleinfo-container">
            <div className="responsive-switch-container">
                <div className="switch-col-1">
                    <div className="scale-summary">
                        <div className="scale-name">
                            {scaleInfo.tonic.let} {scaleInfo.mode.name}
                        </div>
                        <ScaleNotes
                            scaleInfo={scaleInfo}
                            highlightState={highlightState}
                            toggleHighlightNote={toggleHighlightNote}
                        />
                    </div>

                    <ChordTable
                        scaleInfo={scaleInfo}
                        highlightState={highlightState}
                        toggleHighlightNote={toggleHighlightNote}
                        toggleHighlightChord={toggleHighlightChord}
                    />
                </div>
                <div className="switch-col-2">
                    <ChordPatterns
                        scaleInfo={scaleInfo}
                        highlightState={highlightState}
                        toggleHighlightNote={toggleHighlightNote}
                        toggleHighlightChord={toggleHighlightChord}
                    />
                </div>
            </div>
        </div>
    )
}
