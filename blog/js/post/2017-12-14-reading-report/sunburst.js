window.getScoreChart = function (domId) {
    var chart = echarts.init(document.getElementById(domId));


    var colors = ['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555'];
    var bgColor = '#2E2733';

    var itemStyle = {
        star5: {
            normal: {
                color: colors[0]
            }
        },
        star4: {
            normal: {
                color: colors[1]
            }
        },
        star3: {
            normal: {
                color: colors[2]
            }
        },
        star2: {
            normal: {
                color: colors[3]
            }
        }
    };

    var data = [{
        name: '虚构',
        itemStyle: {
            normal: {
                color: colors[1]
            }
        },
        children: [{
            name: '小说',
            children: [{
                name: '5☆',
                children: [{
                    name: '疼'
                }, {
                    name: '慈悲'
                }, {
                    name: '楼下的房客'
                }]
            }, {
                name: '4☆',
                children: [{
                    name: '虚无的十字架'
                }, {
                    name: '无声告白'
                }, {
                    name: '童年的终结'
                }]
            }, {
                name: '3☆',
                children: [{
                    name: '疯癫老人日记'
                }]
            }]
        }, {
            name: '绘本',
            children: [{
                name: '5☆',
                children: [{
                    name: '设计诗'
                }]
            }, {
                name: '4☆',
                children: [{
                    name: '假如生活糊弄了你'
                }, {
                    name: '博物学家的神秘动物图鉴'
                }]
            }, {
                name: '3☆',
                children: [{
                    name: '方向'
                }]
            }]
        }]
    }, {
        name: '非虚构',
        itemStyle: {
            normal: {
                color: colors[2]
            }
        },
        children: [{
            name: '设计',
            children: [{
                name: '5☆',
                children: [{
                    name: '无界面交互'
                }]
            }, {
                name: '4☆',
                children: [{
                    name: '数字绘图的光照与渲染技术'
                }, {
                    name: '日本建筑解剖书'
                }]
            }, {
                name: '3☆',
                children: [{
                    name: '奇幻世界艺术\n&RPG地图绘制讲座'
                }]
            }]
        }, {
            name: '社科',
            children: [{
                name: '5☆',
                children: [{
                    name: '痛点'
                }]
            }, {
                name: '4☆',
                children: [{
                    name: '卓有成效的管理者'
                }, {
                    name: '进化'
                }, {
                    name: '后物欲时代的来临',
                }]
            }, {
                name: '3☆',
                children: [{
                    name: '疯癫与文明'
                }]
            }]
        }, {
            name: '心理',
            children: [{
                name: '4☆',
                children: [{
                    name: '皮格马利翁效应'
                }, {
                    name: '受伤的人'
                }]
            }, {
                name: '3☆',
            }, {
                name: '2☆',
                children: [{
                    name: '迷恋'
                }]
            }]
        }, {
            name: '家居',
            children: [{
                name: '4☆',
                children: [{
                    name: '把房子住成家'
                }, {
                    name: '只过必要生活'
                }, {
                    name: '北欧简约风格'
                }]
            }]
        }, {
            name: '哲学',
            children: [{
                name: '4☆',
                children: [{
                    name: '人生的智慧'
                }]
            }]
        }, {
            name: '技术',
            children: [{
                name: '5☆',
                children: [{
                    name: '代码整洁之道'
                }]
            }, {
                name: '4☆',
                children: [{
                    name: 'Three.js 开发指南'
                }]
            }]
        }]
    }];

    for (var j = 0; j < data.length; ++j) {
        var level1 = data[j].children;
        for (var i = 0; i < level1.length; ++i) {
            var block = level1[i].children;
            var bookScore = [];
            var bookScoreId;
            for (var star = 0; star < block.length; ++star) {
                var style = (function (name) {
                    switch (name) {
                        case '5☆':
                            bookScoreId = 0;
                            return itemStyle.star5;
                        case '4☆':
                            bookScoreId = 1;
                            return itemStyle.star4;
                        case '3☆':
                            bookScoreId = 2;
                            return itemStyle.star3;
                        case '2☆':
                            bookScoreId = 3;
                            return itemStyle.star2;
                    }
                })(block[star].name);

                block[star].label = {
                    normal: {
                        color: style.normal.color
                    },
                    downplay: {
                        opacity: 0.5
                    }
                };

                if (block[star].children) {
                    style = {
                        normal: {
                            opacity: 1,
                            color: style.normal.color
                        }
                    };
                    block[star].children.forEach(function (book) {
                        book.value = 1;
                        book.itemStyle = style;

                        book.label = {
                            normal: {
                                color: style.normal.color
                            }
                        };

                        var value = 1;
                        if (bookScoreId === 0 || bookScoreId === 3) {
                            value = 5;
                        }

                        if (bookScore[bookScoreId]) {
                            bookScore[bookScoreId].value += value;
                        }
                        else {
                            bookScore[bookScoreId] = {
                                color: colors[bookScoreId],
                                value: value
                            };
                        }
                    });
                }
            }

            level1[i].itemStyle = {
                normal: {
                    color: data[j].itemStyle.normal.color
                }
            };
        }
    }

    chart.setOption({
        backgroundColor: bgColor,
        color: colors,
        title: [{
            text: 'Ovilia 2017 读书记录',
            bottom: 20,
            right: 20,
            textStyle: {
                color: colors[0]
            }
        }, {
            text: '买书花费',
            left: '8%',
            top: 510,
            textStyle: {
                color: colors[0],
                fontSize: 12
            }
        }],
        series: [{
            type: 'sunburst',
            center: ['50%', '52%'],
            nodeClick: false,
            data: data,
            sort: function (a, b) {
                if (a.depth === 1) {
                    return b.getValue() - a.getValue();
                }
                else {
                    return a.dataIndex - b.dataIndex;
                }
            },
            label: {
                normal: {
                    rotate: 'radial',
                    color: bgColor
                }
            },
            itemStyle: {
                normal: {
                    borderColor: bgColor,
                    borderWidth: 2
                }
            },
            levels: [{}, {
                r0: 0,
                r: 40,
                label: {
                    normal: {
                        rotate: 'none'
                    }
                }
            }, {
                r0: 40,
                r: 105
            }, {
                r0: 115,
                r: 140,
                itemStyle: {
                    normal: {
                        shadowBlur: 2,
                        shadowColor: colors[2],
                        color: 'transparent'
                    }
                },
                label: {
                    normal: {
                        rotate: 'tangential',
                        fontSize: 10,
                        color: colors[0]
                    }
                }
            }, {
                r0: 140,
                r: 145,
                itemStyle: {
                    normal: {
                        shadowBlur: 80,
                        shadowColor: colors[0]
                    }
                },
                label: {
                    normal: {
                        position: 'outside',
                        textShadowBlur: 5,
                        textShadowColor: '#333'
                    },
                    downplay: {
                        opacity: 0.5
                    }
                }
            }]
        }, {
            type: 'pie',
            center: ['15%', 80],
            radius: [0, 20],
            data: [{
                name: '5☆',
                value: 7
            }, {
                name: '4☆',
                value: 17
            }, {
                name: '3☆',
                value: 4
            }, {
                name: '2☆',
                value: 1
            }],
            label: {
                normal: {
                    formatter: '{b}: {c}本'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 2,
                    borderColor: bgColor
                }
            }
        }, {
            type: 'pie',
            center: ['84%', 70],
            radius: [0, 20],
            data: [{
                name: '电子书',
                value: 16,
                itemStyle: {
                    normal: {
                        color: colors[1]
                    }
                }
            }, {
                name: '实体书',
                value: 13,
                itemStyle: {
                    normal: {
                        color: colors[2]
                    }
                }
            }],
            label: {
                normal: {
                    formatter: '{b}: {c}本'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 2,
                    borderColor: bgColor
                }
            }
        }, {
            type: 'bar',
            data: [{
                value: 2101,
                name: '2016',
                itemStyle: {
                    normal: {
                        color: colors[1]
                    }
                }
            }, {
                value: 1445,
                name: '2017',
                itemStyle: {
                    normal: {
                        color: colors[2]
                    }
                }
            }],
            label: {
                normal: {
                    show: true,
                    position: 'insideRight',
                    color: bgColor,
                    formatter: '{c}元'
                }
            }
        }],
        xAxis: {
            show: false,
            splitLine: {
                show: false
            }
        },
        yAxis: {
            data: ['2016', '2017'],
            inverse: true,
            axisLabel: {
                color: function (value, index) {
                    return [colors[1], colors[2]][index];
                }
            }
        },
        grid: {
            left: '8%',
            top: 530,
            height: 40,
            width: '15%'
        }
    });

    return chart;
};
