var gameData = {
    roundsBundles: [{
        name: {ru: "Комплект №1 Гаврюша", en: "Set #1 Gavryusha"},
        numberOfRoundsRequired: 2,
        backgroundColor: "#d64541",
        rounds: [
            {
                rows: 3,
                cols: 3,
                words: [
                    {
                        letters: [
                            {x: 0, y: 1, letter: "р"},
                            {x: 0, y: 0, letter: "о"},
                            {x: 1, y: 0, letter: "м"}
                        ]
                    },
                    {
                        letters: [
                            {x: 1, y: 1, letter: "л"},
                            {x: 1, y: 2, letter: "ё"},
                            {x: 0, y: 2, letter: "д"}
                        ]
                    },
                    {
                        letters: [
                            {x: 2, y: 0, letter: "д"},
                            {x: 2, y: 1, letter: "у"},
                            {x: 2, y: 2, letter: "б"}
                        ]
                    }
                ]
            }
        ]
    },
        {
            name: {ru: "Комплект №2 Гаврюша", en: "Set #2 Gavryusha"},
            numberOfRoundsRequired: 2,
            backgroundColor: "#0000ff",
            rounds: [
                {
                    word7: "word7"
                },
                {
                    word8: "word8",
                    word9: "word9"
                }
            ]
        }]
};
module.exports = gameData;