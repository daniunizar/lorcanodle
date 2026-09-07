export function compareCards(selectedCard, solutionCard) {
    console.log(solutionCard)
    return {
        card: selectedCard,

        result: {
            name: compareYesNo(
                selectedCard.Name,
                solutionCard.Name
            ),

            color: comparePartials(
                selectedCard.Color,
                solutionCard.Color
            ),

            cost: compareHigherLower(
                selectedCard.Cost,
                solutionCard.Cost
            ),

            classifications: comparePartials(
                selectedCard.Classifications,
                solutionCard.Classifications
            ),

            willpower: compareHigherLower(
                selectedCard.Willpower,
                solutionCard.Willpower
            ),

            strength: compareHigherLower(
                selectedCard.Strength,
                solutionCard.Strength
            ),

            lore: compareHigherLower(
                selectedCard.Lore,
                solutionCard.Lore
            )
        },

        solved: compareYesNo(
            selectedCard.Name,
            solutionCard.Name
        )
    };
}


function compareYesNo(selectedValue, solutionValue) {
    console.log(selectedValue)
    console.log(solutionValue)
    if (selectedValue == solutionValue) {
        return 'correct';
    }
    return 'incorrect';
}


function compareHigherLower(selectedValue, solutionValue) {
    if (selectedValue == solutionValue) {
        return 'equals';
    } else if (selectedValue > solutionValue) {
        return 'greater';
    }
    return 'lower';
}


function comparePartials(selectedValue, solutionValue) {
    const selectedValues = selectedValue
        .split(",")
        .map(value => value.trim());

    const solutionValues = solutionValue
        .split(",")
        .map(value => value.trim());

    const allMatch =
        selectedValues.length === solutionValues.length &&
        selectedValues.every(value =>
            solutionValues.includes(value)
        );

    if (allMatch) {
        return 'correct';
    }

    const hasPartialMatch = selectedValues.some(value =>
        solutionValues.includes(value)
    );

    if (hasPartialMatch) {
        return 'partial';
    }

    return 'incorrect';
}