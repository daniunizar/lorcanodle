<template>
    <tr>
        <td class="position"> {{ position }} </td>

        <td class="card-thumbnail">
            <img
                v-bind:src="attempt.card.Image"
                alt=""
            >
        </td>

        <td :class="getClass(attempt.result.name)">
            {{ attempt.card.Name }}
        </td>

        <td :class="getClass(attempt.result.set_name)">
            {{ attempt.card.Set_Name }}
        </td>

        <td :class="getClass(attempt.result.rarity)">
            {{ attempt.card.Rarity }}
        </td>

        <td :class="getClass(attempt.result.color)">
            {{ attempt.card.Color }}
        </td>

        <td :class="getClass(attempt.result.cost)">
            {{
                attempt.result.cost === 'equals'
                    ? attempt.card.Cost
                    : attempt.result.cost === 'greater'
                        ? '<' + attempt.card.Cost
                        : '>' + attempt.card.Cost
            }}
        </td>

        <td :class="getClass(attempt.result.inkable)">
            {{ attempt.card.Inkable == true ? "Sí" : "No" }}
        </td>

        <td :class="getClass(attempt.result.classifications)">
            {{ attempt.card.Classifications }}
        </td>

        <td :class="getClass(attempt.result.strength)">
            {{
                attempt.result.strength === 'equals'
                    ? attempt.card.Strength
                    : attempt.result.strength === 'greater'
                        ? '<' + attempt.card.Strength
                        : '>' + attempt.card.Strength
            }}
        </td>

        <td :class="getClass(attempt.result.willpower)">
            {{
                attempt.result.willpower === 'equals'
                    ? attempt.card.Willpower
                    : attempt.result.willpower === 'greater'
                        ? '<' + attempt.card.Willpower
                        : '>' + attempt.card.Willpower
            }}
        </td>

        <td :class="getClass(attempt.result.lore)">
            {{
                attempt.result.lore === 'equals'
                    ? attempt.card.Lore
                    : attempt.result.lore === 'greater'
                        ? '<' + attempt.card.Lore
                        : '>' + attempt.card.Lore
            }}
        </td>
    </tr>
</template>

<script setup>
defineProps({
    attempt: {
        type: Object,
        required: true
    },
    position: {
        type: Number,
        required: true
    }
});

function getClass(result) {
    if (result === 'correct' || result === 'equals') {
        return 'green';
    }

    if (result === 'partial') {
        return 'yellow';
    }

    return 'red';
}
</script>

<style scoped lang="scss">
tr {
    border-bottom: 1px solid rgba(190, 175, 140, 0.4);

    &:last-child {
        border-bottom: 0;
    }
}

td {
    padding: 12px 8px;

    border-right: 1px solid rgba(190, 175, 140, 0.25);

    font-size: 13px;
    font-weight: 700;

    white-space: normal;
    overflow-wrap: break-word;

    &:last-child {
        border-right: 0;
    }
}

.position {
    color: #8b806b;
    font-weight: 800;
}

.card-thumbnail {
    width: 45px;
    padding: 5px;

    text-align: center;
}

.card-thumbnail img {
    display: block;

    width: 32px;
    height: 45px;

    margin: 0 auto;

    object-fit: cover;

    border-radius: 4px;

    box-shadow:
        0 2px 5px rgba(15, 22, 38, 0.20);
}

/* CORRECTO */

.green {
    background: var(--success-bg);
    color: #286c47;
}

/* PARCIAL */

.yellow {
    background: var(--partial-bg);
    color: #876619;
}

/* INCORRECTO */

.red {
    background: var(--error-bg);
    color: #873c37;
}

@media (max-width: 480px) {
    td {
        padding: 9px 5px;
        font-size: 11px;
    }

    .card-thumbnail {
        width: 38px;
        padding: 4px;
    }

    .card-thumbnail img {
        width: 26px;
        height: 36px;
    }
}
</style>