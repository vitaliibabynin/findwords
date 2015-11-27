var gameData = {
    //production
    facebookId: '473524332833935',
    //development
    //facebookId: '473533802832988',
    dialogs: {
        rateUsMaxShowCount: 10,
        requirePushShowPeriod: 5 * 1000
    },
    bonusCoins: {
        day1: 1,
        day2: 2,
        day3: 3,
        day4: 4,
        day5: 5,
        day6: 6,
        day7: 7
    },
    practiceRound: {
        en: {
            score: 999,
            coins: 999,
            time: 30,
            rows: 3,
            cols: 3,
            words: [
                {
                    letters: [
                        {x: 0, y: 0, letter: "e"},
                        {x: 0, y: 1, letter: "y"},
                        {x: 1, y: 1, letter: "e"}
                    ]
                },
                {
                    letters: [
                        {x: 1, y: 0, letter: "r"},
                        {x: 2, y: 0, letter: "e"},
                        {x: 2, y: 1, letter: "d"}
                    ]
                },
                {
                    letters: [
                        {x: 0, y: 2, letter: "p"},
                        {x: 1, y: 2, letter: "e"},
                        {x: 2, y: 2, letter: "n"}
                    ]
                }
            ]
        },
        ru: {
            score: 999,
            coins: 999,
            time: 30,
            rows: 3,
            cols: 3,
            words: [
                {
                    letters: [
                        {x: 0, y: 0, letter: "ч"},
                        {x: 0, y: 1, letter: "а"},
                        {x: 1, y: 1, letter: "й"}
                    ]
                },
                {
                    letters: [
                        {x: 1, y: 0, letter: "д"},
                        {x: 2, y: 0, letter: "у"},
                        {x: 2, y: 1, letter: "б"}
                    ]
                },
                {
                    letters: [
                        {x: 0, y: 2, letter: "с"},
                        {x: 1, y: 2, letter: "о"},
                        {x: 2, y: 2, letter: "н"}
                    ]
                }
            ]
        }
    },
    roundsBundles: {
        en: [
            {
                name: "Set #1 Gavryusha",
                numberOfRoundsRequired: 2,
                backgroundColor: "#d64541",
                rounds: [
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "m"},
                                    {x: 1, y: 0, letter: "a"},
                                    {x: 2, y: 0, letter: "y"},
                                    {x: 3, y: 0, letter: "h"},
                                    {x: 3, y: 1, letter: "e"},
                                    {x: 2, y: 1, letter: "m"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "t"},
                                    {x: 1, y: 1, letter: "h"},
                                    {x: 0, y: 1, letter: "i"},
                                    {x: 0, y: 2, letter: "r"},
                                    {x: 0, y: 3, letter: "s"},
                                    {x: 1, y: 3, letter: "t"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "p"},
                                    {x: 2, y: 2, letter: "y"},
                                    {x: 3, y: 2, letter: "k"},
                                    {x: 3, y: 3, letter: "e"}
                                ]
                            }
                        ]
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "м"},
                                    {x: 1, y: 0, letter: "о"},
                                    {x: 2, y: 0, letter: "л"},
                                    {x: 3, y: 0, letter: "о"},
                                    {x: 3, y: 1, letter: "к"},
                                    {x: 2, y: 1, letter: "о"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "м"},
                                    {x: 1, y: 1, letter: "о"},
                                    {x: 0, y: 1, letter: "м"},
                                    {x: 0, y: 2, letter: "е"},
                                    {x: 0, y: 3, letter: "н"},
                                    {x: 1, y: 3, letter: "т"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "п"},
                                    {x: 2, y: 2, letter: "а"},
                                    {x: 3, y: 2, letter: "р"},
                                    {x: 3, y: 3, letter: "а"}
                                ]
                            }
                        ]
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "к"},
                                    {x: 1, y: 0, letter: "а"},
                                    {x: 2, y: 0, letter: "р"},
                                    {x: 3, y: 0, letter: "е"},
                                    {x: 3, y: 1, letter: "т"},
                                    {x: 2, y: 1, letter: "а"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "п"},
                                    {x: 1, y: 1, letter: "о"},
                                    {x: 0, y: 1, letter: "б"},
                                    {x: 0, y: 2, letter: "е"},
                                    {x: 0, y: 3, letter: "д"},
                                    {x: 1, y: 3, letter: "а"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "п"},
                                    {x: 2, y: 2, letter: "а"},
                                    {x: 3, y: 2, letter: "р"},
                                    {x: 3, y: 3, letter: "к"}
                                ]
                            }
                        ]
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "к"},
                                    {x: 1, y: 0, letter: "о"},
                                    {x: 2, y: 0, letter: "с"},
                                    {x: 3, y: 0, letter: "м"},
                                    {x: 3, y: 1, letter: "о"},
                                    {x: 2, y: 1, letter: "с"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "ч"},
                                    {x: 1, y: 1, letter: "а"},
                                    {x: 0, y: 1, letter: "й"},
                                    {x: 0, y: 2, letter: "н"},
                                    {x: 0, y: 3, letter: "и"},
                                    {x: 1, y: 3, letter: "к"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "к"},
                                    {x: 2, y: 2, letter: "л"},
                                    {x: 3, y: 2, letter: "е"},
                                    {x: 3, y: 3, letter: "й"}
                                ]
                            }
                        ]
                    }
                ]
            }, {
                name: "Set #2 Gavryusha",
                numberOfRoundsRequired: 2,
                backgroundColor: "#0000ff",
                rounds: [
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
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
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "м"},
                                    {x: 1, y: 0, letter: "о"},
                                    {x: 2, y: 0, letter: "л"},
                                    {x: 3, y: 0, letter: "о"},
                                    {x: 3, y: 1, letter: "к"},
                                    {x: 2, y: 1, letter: "о"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "м"},
                                    {x: 1, y: 1, letter: "о"},
                                    {x: 0, y: 1, letter: "м"},
                                    {x: 0, y: 2, letter: "е"},
                                    {x: 0, y: 3, letter: "н"},
                                    {x: 1, y: 3, letter: "т"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "п"},
                                    {x: 2, y: 2, letter: "а"},
                                    {x: 3, y: 2, letter: "р"},
                                    {x: 3, y: 3, letter: "а"}
                                ]
                            }
                        ]
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "к"},
                                    {x: 1, y: 0, letter: "а"},
                                    {x: 2, y: 0, letter: "р"},
                                    {x: 3, y: 0, letter: "е"},
                                    {x: 3, y: 1, letter: "т"},
                                    {x: 2, y: 1, letter: "а"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "п"},
                                    {x: 1, y: 1, letter: "о"},
                                    {x: 0, y: 1, letter: "б"},
                                    {x: 0, y: 2, letter: "е"},
                                    {x: 0, y: 3, letter: "д"},
                                    {x: 1, y: 3, letter: "а"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "п"},
                                    {x: 2, y: 2, letter: "а"},
                                    {x: 3, y: 2, letter: "р"},
                                    {x: 3, y: 3, letter: "к"}
                                ]
                            }
                        ]
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "к"},
                                    {x: 1, y: 0, letter: "о"},
                                    {x: 2, y: 0, letter: "с"},
                                    {x: 3, y: 0, letter: "м"},
                                    {x: 3, y: 1, letter: "о"},
                                    {x: 2, y: 1, letter: "с"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "ч"},
                                    {x: 1, y: 1, letter: "а"},
                                    {x: 0, y: 1, letter: "й"},
                                    {x: 0, y: 2, letter: "н"},
                                    {x: 0, y: 3, letter: "и"},
                                    {x: 1, y: 3, letter: "к"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "к"},
                                    {x: 2, y: 2, letter: "л"},
                                    {x: 3, y: 2, letter: "е"},
                                    {x: 3, y: 3, letter: "й"}
                                ]
                            }
                        ]
                    }
                ]
            }, {
                name: "Set #3 Gavryusha",
                numberOfRoundsRequired: 2,
                backgroundColor: "#ff00ff",
                rounds: [
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
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
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "м"},
                                    {x: 1, y: 0, letter: "о"},
                                    {x: 2, y: 0, letter: "л"},
                                    {x: 3, y: 0, letter: "о"},
                                    {x: 3, y: 1, letter: "к"},
                                    {x: 2, y: 1, letter: "о"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "м"},
                                    {x: 1, y: 1, letter: "о"},
                                    {x: 0, y: 1, letter: "м"},
                                    {x: 0, y: 2, letter: "е"},
                                    {x: 0, y: 3, letter: "н"},
                                    {x: 1, y: 3, letter: "т"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "п"},
                                    {x: 2, y: 2, letter: "а"},
                                    {x: 3, y: 2, letter: "р"},
                                    {x: 3, y: 3, letter: "а"}
                                ]
                            }
                        ]
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "к"},
                                    {x: 1, y: 0, letter: "а"},
                                    {x: 2, y: 0, letter: "р"},
                                    {x: 3, y: 0, letter: "е"},
                                    {x: 3, y: 1, letter: "т"},
                                    {x: 2, y: 1, letter: "а"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "п"},
                                    {x: 1, y: 1, letter: "о"},
                                    {x: 0, y: 1, letter: "б"},
                                    {x: 0, y: 2, letter: "е"},
                                    {x: 0, y: 3, letter: "д"},
                                    {x: 1, y: 3, letter: "а"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "п"},
                                    {x: 2, y: 2, letter: "а"},
                                    {x: 3, y: 2, letter: "р"},
                                    {x: 3, y: 3, letter: "к"}
                                ]
                            }
                        ]
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "к"},
                                    {x: 1, y: 0, letter: "о"},
                                    {x: 2, y: 0, letter: "с"},
                                    {x: 3, y: 0, letter: "м"},
                                    {x: 3, y: 1, letter: "о"},
                                    {x: 2, y: 1, letter: "с"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "ч"},
                                    {x: 1, y: 1, letter: "а"},
                                    {x: 0, y: 1, letter: "й"},
                                    {x: 0, y: 2, letter: "н"},
                                    {x: 0, y: 3, letter: "и"},
                                    {x: 1, y: 3, letter: "к"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "к"},
                                    {x: 2, y: 2, letter: "л"},
                                    {x: 3, y: 2, letter: "е"},
                                    {x: 3, y: 3, letter: "й"}
                                ]
                            }
                        ]
                    }
                ]
            }, {
                name: "Set #4 Gavryusha",
                numberOfRoundsRequired: 2,
                backgroundColor: "#00ffff",
                rounds: [
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
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
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "м"},
                                    {x: 1, y: 0, letter: "о"},
                                    {x: 2, y: 0, letter: "л"},
                                    {x: 3, y: 0, letter: "о"},
                                    {x: 3, y: 1, letter: "к"},
                                    {x: 2, y: 1, letter: "о"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "м"},
                                    {x: 1, y: 1, letter: "о"},
                                    {x: 0, y: 1, letter: "м"},
                                    {x: 0, y: 2, letter: "е"},
                                    {x: 0, y: 3, letter: "н"},
                                    {x: 1, y: 3, letter: "т"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "п"},
                                    {x: 2, y: 2, letter: "а"},
                                    {x: 3, y: 2, letter: "р"},
                                    {x: 3, y: 3, letter: "а"}
                                ]
                            }
                        ]
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "к"},
                                    {x: 1, y: 0, letter: "а"},
                                    {x: 2, y: 0, letter: "р"},
                                    {x: 3, y: 0, letter: "е"},
                                    {x: 3, y: 1, letter: "т"},
                                    {x: 2, y: 1, letter: "а"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "п"},
                                    {x: 1, y: 1, letter: "о"},
                                    {x: 0, y: 1, letter: "б"},
                                    {x: 0, y: 2, letter: "е"},
                                    {x: 0, y: 3, letter: "д"},
                                    {x: 1, y: 3, letter: "а"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "п"},
                                    {x: 2, y: 2, letter: "а"},
                                    {x: 3, y: 2, letter: "р"},
                                    {x: 3, y: 3, letter: "к"}
                                ]
                            }
                        ]
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "к"},
                                    {x: 1, y: 0, letter: "о"},
                                    {x: 2, y: 0, letter: "с"},
                                    {x: 3, y: 0, letter: "м"},
                                    {x: 3, y: 1, letter: "о"},
                                    {x: 2, y: 1, letter: "с"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "ч"},
                                    {x: 1, y: 1, letter: "а"},
                                    {x: 0, y: 1, letter: "й"},
                                    {x: 0, y: 2, letter: "н"},
                                    {x: 0, y: 3, letter: "и"},
                                    {x: 1, y: 3, letter: "к"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "к"},
                                    {x: 2, y: 2, letter: "л"},
                                    {x: 3, y: 2, letter: "е"},
                                    {x: 3, y: 3, letter: "й"}
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        ru: [
            {
                name: "Комплект №1 Гаврюша",
                numberOfRoundsRequired: 2,
                backgroundColor: "#d64541",
                rounds: [
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
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
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "м"},
                                    {x: 1, y: 0, letter: "о"},
                                    {x: 2, y: 0, letter: "л"},
                                    {x: 3, y: 0, letter: "о"},
                                    {x: 3, y: 1, letter: "к"},
                                    {x: 2, y: 1, letter: "о"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "м"},
                                    {x: 1, y: 1, letter: "о"},
                                    {x: 0, y: 1, letter: "м"},
                                    {x: 0, y: 2, letter: "е"},
                                    {x: 0, y: 3, letter: "н"},
                                    {x: 1, y: 3, letter: "т"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "п"},
                                    {x: 2, y: 2, letter: "а"},
                                    {x: 3, y: 2, letter: "р"},
                                    {x: 3, y: 3, letter: "а"}
                                ]
                            }
                        ]
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "к"},
                                    {x: 1, y: 0, letter: "а"},
                                    {x: 2, y: 0, letter: "р"},
                                    {x: 3, y: 0, letter: "е"},
                                    {x: 3, y: 1, letter: "т"},
                                    {x: 2, y: 1, letter: "а"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "п"},
                                    {x: 1, y: 1, letter: "о"},
                                    {x: 0, y: 1, letter: "б"},
                                    {x: 0, y: 2, letter: "е"},
                                    {x: 0, y: 3, letter: "д"},
                                    {x: 1, y: 3, letter: "а"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "п"},
                                    {x: 2, y: 2, letter: "а"},
                                    {x: 3, y: 2, letter: "р"},
                                    {x: 3, y: 3, letter: "к"}
                                ]
                            }
                        ]
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "к"},
                                    {x: 1, y: 0, letter: "о"},
                                    {x: 2, y: 0, letter: "с"},
                                    {x: 3, y: 0, letter: "м"},
                                    {x: 3, y: 1, letter: "о"},
                                    {x: 2, y: 1, letter: "с"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "ч"},
                                    {x: 1, y: 1, letter: "а"},
                                    {x: 0, y: 1, letter: "й"},
                                    {x: 0, y: 2, letter: "н"},
                                    {x: 0, y: 3, letter: "и"},
                                    {x: 1, y: 3, letter: "к"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "к"},
                                    {x: 2, y: 2, letter: "л"},
                                    {x: 3, y: 2, letter: "е"},
                                    {x: 3, y: 3, letter: "й"}
                                ]
                            }
                        ]
                    }
                ]
            }, {
                name: "Комплект №2 Гаврюша",
                numberOfRoundsRequired: 2,
                backgroundColor: "#0000ff",
                rounds: [
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
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
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "м"},
                                    {x: 1, y: 0, letter: "о"},
                                    {x: 2, y: 0, letter: "л"},
                                    {x: 3, y: 0, letter: "о"},
                                    {x: 3, y: 1, letter: "к"},
                                    {x: 2, y: 1, letter: "о"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "м"},
                                    {x: 1, y: 1, letter: "о"},
                                    {x: 0, y: 1, letter: "м"},
                                    {x: 0, y: 2, letter: "е"},
                                    {x: 0, y: 3, letter: "н"},
                                    {x: 1, y: 3, letter: "т"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "п"},
                                    {x: 2, y: 2, letter: "а"},
                                    {x: 3, y: 2, letter: "р"},
                                    {x: 3, y: 3, letter: "а"}
                                ]
                            }
                        ]
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "к"},
                                    {x: 1, y: 0, letter: "а"},
                                    {x: 2, y: 0, letter: "р"},
                                    {x: 3, y: 0, letter: "е"},
                                    {x: 3, y: 1, letter: "т"},
                                    {x: 2, y: 1, letter: "а"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "п"},
                                    {x: 1, y: 1, letter: "о"},
                                    {x: 0, y: 1, letter: "б"},
                                    {x: 0, y: 2, letter: "е"},
                                    {x: 0, y: 3, letter: "д"},
                                    {x: 1, y: 3, letter: "а"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "п"},
                                    {x: 2, y: 2, letter: "а"},
                                    {x: 3, y: 2, letter: "р"},
                                    {x: 3, y: 3, letter: "к"}
                                ]
                            }
                        ]
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "к"},
                                    {x: 1, y: 0, letter: "о"},
                                    {x: 2, y: 0, letter: "с"},
                                    {x: 3, y: 0, letter: "м"},
                                    {x: 3, y: 1, letter: "о"},
                                    {x: 2, y: 1, letter: "с"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "ч"},
                                    {x: 1, y: 1, letter: "а"},
                                    {x: 0, y: 1, letter: "й"},
                                    {x: 0, y: 2, letter: "н"},
                                    {x: 0, y: 3, letter: "и"},
                                    {x: 1, y: 3, letter: "к"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "к"},
                                    {x: 2, y: 2, letter: "л"},
                                    {x: 3, y: 2, letter: "е"},
                                    {x: 3, y: 3, letter: "й"}
                                ]
                            }
                        ]
                    }
                ]
            }, {
                name: "Комплект №3 Гаврюша",
                numberOfRoundsRequired: 2,
                backgroundColor: "#ff00ff",
                rounds: [
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
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
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "м"},
                                    {x: 1, y: 0, letter: "о"},
                                    {x: 2, y: 0, letter: "л"},
                                    {x: 3, y: 0, letter: "о"},
                                    {x: 3, y: 1, letter: "к"},
                                    {x: 2, y: 1, letter: "о"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "м"},
                                    {x: 1, y: 1, letter: "о"},
                                    {x: 0, y: 1, letter: "м"},
                                    {x: 0, y: 2, letter: "е"},
                                    {x: 0, y: 3, letter: "н"},
                                    {x: 1, y: 3, letter: "т"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "п"},
                                    {x: 2, y: 2, letter: "а"},
                                    {x: 3, y: 2, letter: "р"},
                                    {x: 3, y: 3, letter: "а"}
                                ]
                            }
                        ]
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "к"},
                                    {x: 1, y: 0, letter: "а"},
                                    {x: 2, y: 0, letter: "р"},
                                    {x: 3, y: 0, letter: "е"},
                                    {x: 3, y: 1, letter: "т"},
                                    {x: 2, y: 1, letter: "а"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "п"},
                                    {x: 1, y: 1, letter: "о"},
                                    {x: 0, y: 1, letter: "б"},
                                    {x: 0, y: 2, letter: "е"},
                                    {x: 0, y: 3, letter: "д"},
                                    {x: 1, y: 3, letter: "а"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "п"},
                                    {x: 2, y: 2, letter: "а"},
                                    {x: 3, y: 2, letter: "р"},
                                    {x: 3, y: 3, letter: "к"}
                                ]
                            }
                        ]
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "к"},
                                    {x: 1, y: 0, letter: "о"},
                                    {x: 2, y: 0, letter: "с"},
                                    {x: 3, y: 0, letter: "м"},
                                    {x: 3, y: 1, letter: "о"},
                                    {x: 2, y: 1, letter: "с"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "ч"},
                                    {x: 1, y: 1, letter: "а"},
                                    {x: 0, y: 1, letter: "й"},
                                    {x: 0, y: 2, letter: "н"},
                                    {x: 0, y: 3, letter: "и"},
                                    {x: 1, y: 3, letter: "к"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "к"},
                                    {x: 2, y: 2, letter: "л"},
                                    {x: 3, y: 2, letter: "е"},
                                    {x: 3, y: 3, letter: "й"}
                                ]
                            }
                        ]
                    }
                ]
            }, {
                name: "Комплект №4 Гаврюша",
                numberOfRoundsRequired: 2,
                backgroundColor: "#00ffff",
                rounds: [
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
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
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "м"},
                                    {x: 1, y: 0, letter: "о"},
                                    {x: 2, y: 0, letter: "л"},
                                    {x: 3, y: 0, letter: "о"},
                                    {x: 3, y: 1, letter: "к"},
                                    {x: 2, y: 1, letter: "о"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "м"},
                                    {x: 1, y: 1, letter: "о"},
                                    {x: 0, y: 1, letter: "м"},
                                    {x: 0, y: 2, letter: "е"},
                                    {x: 0, y: 3, letter: "н"},
                                    {x: 1, y: 3, letter: "т"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "п"},
                                    {x: 2, y: 2, letter: "а"},
                                    {x: 3, y: 2, letter: "р"},
                                    {x: 3, y: 3, letter: "а"}
                                ]
                            }
                        ]
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "к"},
                                    {x: 1, y: 0, letter: "а"},
                                    {x: 2, y: 0, letter: "р"},
                                    {x: 3, y: 0, letter: "е"},
                                    {x: 3, y: 1, letter: "т"},
                                    {x: 2, y: 1, letter: "а"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "п"},
                                    {x: 1, y: 1, letter: "о"},
                                    {x: 0, y: 1, letter: "б"},
                                    {x: 0, y: 2, letter: "е"},
                                    {x: 0, y: 3, letter: "д"},
                                    {x: 1, y: 3, letter: "а"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "п"},
                                    {x: 2, y: 2, letter: "а"},
                                    {x: 3, y: 2, letter: "р"},
                                    {x: 3, y: 3, letter: "к"}
                                ]
                            }
                        ]
                    },
                    {
                        score: 999,
                        coins: 999,
                        time: 30,
                        rows: 4,
                        cols: 4,
                        words: [
                            {
                                letters: [
                                    {x: 0, y: 0, letter: "к"},
                                    {x: 1, y: 0, letter: "о"},
                                    {x: 2, y: 0, letter: "с"},
                                    {x: 3, y: 0, letter: "м"},
                                    {x: 3, y: 1, letter: "о"},
                                    {x: 2, y: 1, letter: "с"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 1, y: 2, letter: "ч"},
                                    {x: 1, y: 1, letter: "а"},
                                    {x: 0, y: 1, letter: "й"},
                                    {x: 0, y: 2, letter: "н"},
                                    {x: 0, y: 3, letter: "и"},
                                    {x: 1, y: 3, letter: "к"}
                                ]
                            },
                            {
                                letters: [
                                    {x: 2, y: 3, letter: "к"},
                                    {x: 2, y: 2, letter: "л"},
                                    {x: 3, y: 2, letter: "е"},
                                    {x: 3, y: 3, letter: "й"}
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};
module.exports = gameData;