export default {
    getTableData: () => {
        return {
            code: 200,
            data: {
                tableData: [
                    {
                        "name": "虞美人",
                        "todayBuy": 630,
                        "monthBuy": 500,
                        "totalBuy": 1541
                    },
                    {
                        "name": "蒲公英",
                        "todayBuy": 46,
                        "monthBuy": 851,
                        "totalBuy": 2568
                    },
                    {
                        "name": "向日葵",
                        "todayBuy": 6,
                        "monthBuy": 51,
                        "totalBuy": 257
                    },
                    {
                        "name": "玫瑰",
                        "todayBuy": 4,
                        "monthBuy": 32,
                        "totalBuy": 145
                    },
                    {
                        "name": "康乃馨",
                        "todayBuy": 3,
                        "monthBuy": 8,
                        "totalBuy": 46
                    },
                    {
                        "name": "兰花",
                        "todayBuy": 6,
                        "monthBuy": 43,
                        "totalBuy": 478
                    }
                ]
            }
        }
    },

    getCountData: () => {
        return {
            code: 200,
            data: [
                {
                    name: "今日支付订单",
                    value: 1886,
                    icon: "SuccessFilled",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 150,
                    icon: "StarFilled",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 524,
                    icon: "GoodsFilled",
                    color: "#0873d7",
                },
                {
                    name: "本月支付订单",
                    value: 863,
                    icon: "SuccessFilled",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 369,
                    icon: "StarFilled",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 263,
                    icon: "GoodsFilled",
                    color: "#0873d7",
                },
            ],

        };
    },

    getChartData: () => {
        return {
            code: 200,
            data: {
                orderData: {
                    date: [
                        "2025-04-24",
                        "2025-04-25",
                        "2025-04-26",
                        "2025-04-27",
                        "2025-04-28",
                        "2025-04-29",
                        "2025-04-30",
                    ],
                    data: [
                        {
                            虞美人: 420,
                            蒲公英: 156,
                            向日葵: 269,
                            玫瑰: 364,
                            康乃馨: 467,
                            兰花: 632,

                        },
                        {
                            虞美人: 160,
                            蒲公英: 136,
                            向日葵: 349,
                            玫瑰: 564,
                            康乃馨: 367,
                            兰花: 639,

                        },
                        {
                            虞美人: 560,
                            蒲公英: 436,
                            向日葵: 599,
                            玫瑰: 756,
                            康乃馨: 560,
                            兰花: 196,

                        },
                        {
                            虞美人: 558,
                            蒲公英: 469,
                            向日葵: 685,
                            玫瑰: 469,
                            康乃馨: 279,
                            兰花: 597,
                        },
                        {
                            虞美人: 468,
                            蒲公英: 789,
                            向日葵: 295,
                            玫瑰: 467,
                            康乃馨: 799,
                            兰花: 427,
                        },
                        {
                            虞美人: 398,
                            蒲公英: 489,
                            向日葵: 695,
                            玫瑰: 577,
                            康乃馨: 99,
                            兰花: 366,
                        },
                        {
                            虞美人: 168,
                            蒲公英: 579,
                            向日葵: 46,
                            玫瑰: 367,
                            康乃馨: 267,
                            兰花: 435,
                        },

                    ],

                },
                videoData: [
                    { name: "虞美人", value: 168 },
                     { name: "向日葵", value: 46 },
                    { name: "蒲公英", value: 60 },
                    { name: "玫瑰", value: 367 },
                    { name: "康乃馨", value: 267 },
                    { name: "兰花", value: 435 },
                ],
                userData: [
                    { date: "周一", new: 5, active: 200 },
                    { date: "周二", new: 20, active: 100 },
                    { date: "周三", new: 36, active: 300 },
                    { date: "周四", new: 10, active: 400 },
                    { date: "周五", new: 60, active: 500 },
                    { date: "周六", new: 100, active: 600 },
                    { date: "周日", new: 100, active: 700 },
                ],
            },
        };
    },
}