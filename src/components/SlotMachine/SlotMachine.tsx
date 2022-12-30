import { useEffect, useState } from "react";
import { useSlotMachineStyles } from "./SlotMachine.style"

type SlotsType = {
    y: string,
    durationSeconds: number,
    items: string[]
}[]

export const SlotMachine = () => {

    const styles = useSlotMachineStyles();

    const [slots, setSlots] = useState<SlotsType>([]);

    const [slotCount, setSlotCount] = useState<number>(3);
    const [itemCount, setItemCount] = useState<number>(64);

    const getRandomSlot = () => {
        return ["🍎", "👑", "🏹", "🎳", "🔥", "🍕"][(Math.floor(Math.random() * 6))];
    }

    const generateSlots = (slotCount: number, itemCount: number, slots: SlotsType = []) => {
        const generatedSlots: SlotsType = []

        for(let slot = 0; slot < slotCount; slot++) {
            generatedSlots.push({
                y: `${itemCount * 5 - 4 * 4 + 1}rem`,
                durationSeconds: 0,
                items: [],
            });

            for(let item = 0; item < itemCount; item++) {
                if(item < 3 && slots.length >= 3) {
                    const oldSlots = slots[slot].items;

                    generatedSlots[slot].items.push(oldSlots[oldSlots.length - 3 + item]);

                    continue;
                }

                const randomSlot = getRandomSlot();

                generatedSlots[slot].items.push(randomSlot);
            }
        }

        setSlots(generatedSlots);
    }

    const checkWin = () => {
        let previousSlot = slots[0];
        let win = true;
        
        slots.forEach((slot) => {
            if(slot.items[slot.items.length - 1] !== previousSlot.items[previousSlot.items.length - 1]) {
                win = false;
            }

            previousSlot = slot;
        });

        if(win) {
            alert();
        }
    }

    const spinReset = () => {
        slots.forEach((row) => {
            row.durationSeconds = 0;
        });

        generateSlots(slotCount, itemCount, slots);
    }

    const spin = () => {
        let maxDuration = 0;

        slots.forEach((row, index) => {
            row.y = "0";
            row.durationSeconds = 2 + index;

            if(row.durationSeconds > maxDuration) {
                maxDuration = row.durationSeconds
            }
        });

        setSlots([...slots]);

        setTimeout(() => {
            checkWin();
            spinReset();
        }, maxDuration * 1000);
    }

    // generate initial slots
    useEffect(() => {
        generateSlots(slotCount, itemCount);
    }, [])

    useEffect(() => {
        generateSlots(slotCount, itemCount);
    }, [slotCount, itemCount]);

    return <section css={styles.root}>

        <h1>React Slot Machine</h1>
        <span css={styles.subline}>Example by <a href="https://github.com/rex2go">@rex2go</a></span>

        <div css={styles.rowsContainer}>
            {
                slots.map((slot, slotIndex) => 
                    <div css={styles.slotsContainer}
                        key={slotIndex}
                        style={{
                            transform: `translateY(${slot.y})`,
                            transitionDuration: `${slot.durationSeconds}s`
                        }}>
                        {
                            slot.items.map((item, itemIndex) => 
                                <div key={`${slotIndex}:${itemIndex}`} css={styles.slotContainer}>{item}</div>
                            )
                        }
                    </div>
                )
            }
        </div>

        <button onClick={() => spin()}>Spin</button>

        <div css={styles.settingsContainer}>
            <label>
                <span>Slot Count ({slotCount})</span>
                <input type="range" min="1" max="9" value={slotCount} onChange={(event) => setSlotCount(parseInt(event.target.value))}></input>
            </label>

            <label>
                <span>Item Count ({itemCount})</span>
                <input type="range" min="16" max="256" value={itemCount} onChange={(event) => setItemCount(parseInt(event.target.value))}></input>
            </label>
        </div>
    </section>
}