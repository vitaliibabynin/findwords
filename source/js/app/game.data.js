var gameData = {
    roundsBundles: [{
        name: {ru: "Комплект №1 Гаврюша", en: "Set #1 Gavryusha"},
        numberOfRoundsRequired: 2,
        backgroundColor: "#d64541",
        rounds: [
            {
                rows: 4,
                cols: 4,
                words: [
                    {
                        letters: [
                            {x: 0, y: 0, letter: "б"},
                            {x: 1, y: 0, letter: "а"},
                            {x: 2, y: 0, letter: "м"},
                            {x: 3, y: 0, letter: "б"},
                            {x: 3, y: 1, letter: "у"},
                            {x: 2, y: 1, letter: "к"}
                        ]
                    },
                    {
                        letters: [
                            {x: 1, y: 2, letter: "а"},
                            {x: 1, y: 1, letter: "н"},
                            {x: 0, y: 1, letter: "а"},
                            {x: 0, y: 2, letter: "н"},
                            {x: 0, y: 3, letter: "а"},
                            {x: 1, y: 3, letter: "с"}
                        ]
                    },
                    {
                        letters: [
                            {x: 2, y: 3, letter: "б"},
                            {x: 2, y: 2, letter: "а"},
                            {x: 3, y: 2, letter: "з"},
                            {x: 3, y: 3, letter: "а"}
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
        }]
};
module.exports = gameData;