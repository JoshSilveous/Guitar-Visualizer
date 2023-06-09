import { getLet } from '../../../scale/scale'
import { generateString } from '../../guitar'

interface FretboardProps {
    scaleInfo: ScaleInfo
    highlightState: HighlightState
    highlightCtrl: HighlightCtrl
    guitarSettings: GuitarSettings
}
export function Fretboard({ scaleInfo, highlightState, highlightCtrl, guitarSettings }: FretboardProps) {
    const strings = guitarSettings.stringOpens.map((openNote) => {
        return generateString(openNote, guitarSettings.stringLength + 1)
    })

    const stringDisplay = strings.reverse().map((string, stringIndex) => {
        const noteDisplay = string.map((note, noteIndex) => {
            const isHighlighted = highlightState.notes[scaleInfo.scale.num.indexOf(note)]
            const isInScale = scaleInfo.scale.num.includes(note)
            const isSignificant = scaleInfo.mode.significantNotes
                ? scaleInfo.scale.num[scaleInfo.mode.significantNotes[0]] === note
                : false
            const noChordsAreHighlighted = highlightState.chords.every((val) => val === false)
            const letterNote = getLet(note, scaleInfo.isSharp)

            let className = 'note'
            let titleText = ''
            if (noteIndex === 0) {
                className += ' open-note'
                if (!isInScale) {
                    titleText = `The note ${letterNote} is not in the scale of ${scaleInfo.tonic.let} ${scaleInfo.mode.name}, and should be avoided.`
                }
            }
            if (
                (noChordsAreHighlighted && note === scaleInfo.tonic.num) ||
                (!noChordsAreHighlighted && note === highlightState.special.tonic)
            ) {
                className += ' focused-tonic'
            }
            if (isHighlighted) {
                className += ' highlighted'
            }
            if (isSignificant && noChordsAreHighlighted) {
                className += ' significant'
            }
            if (!isInScale) {
                className += ' not-in-scale'
            }

            function toggleHighlight() {
                if (isHighlighted) {
                    highlightCtrl.unhighlightNote(scaleInfo.scale.num.indexOf(note))
                } else {
                    highlightCtrl.highlightNote(scaleInfo.scale.num.indexOf(note))
                }
            }

            return (
                <div className="note-container" key={noteIndex}>
                    <div className={className} onClick={toggleHighlight} title={titleText}>
                        <div className="note-text">{letterNote}</div>
                    </div>

                    <div className="note-string-display"></div>
                </div>
            )
        })
        return (
            <div className="string" key={stringIndex}>
                {noteDisplay}
            </div>
        )
    })

    let fretLabelsArray = ['open']
    for (let i = 1; i <= guitarSettings.stringLength; i++) {
        fretLabelsArray.push(i.toString())
    }

    const fretLabelsDisplay = fretLabelsArray.map((item, index) => {
        return (
            <div className="label" key={index}>
                {item}
            </div>
        )
    })

    return (
        <div className="fretboard-container">
            <div className="fretboard">
                {stringDisplay}
                <div className="fret-labels">{fretLabelsDisplay}</div>
            </div>
        </div>
    )
}
