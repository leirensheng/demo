<template>
  <div class="json-demo">
    <div class="left">
      <json-editor v-model="json"></json-editor>

    </div>
    <div class="right">
       <pre>{{JSON.stringify(json,null,4)}}</pre>

    </div>

  </div>

</template>

<script>
import jsonEditor from '@/components/jsonEditor/index.vue'

export default {
  components: { jsonEditor },
  data () {
    return {
      json: {
        title: {
          subtext: '数据来自 GitHub ID: lisachristina1234',
          x: 'center'
        },
        backgroundColor: '#FFFFFF',
        series: [
          {
            type: 'sankey',
            left: 50,
            top: 20,
            right: 150,
            bottom: 25,
            data: [
              {
                name: 'GBP',
                itemStyle: {
                  normal: {
                    color: '#C32D2E',
                    borderColor: '#C32D2E'
                  }
                }
              },
              {
                name: 'Paderborn',
                itemStyle: {
                  normal: {
                    color: '#F0C42E',
                    borderColor: '#F0C42E'
                  }
                }
              },
              {
                name: 'Dunkerque',
                itemStyle: {
                  normal: {
                    color: '#881798',
                    borderColor: '#881798'
                  }
                }
              },
              {
                name: 'Colomiers',
                itemStyle: {
                  normal: {
                    color: '#efa835',
                    borderColor: '#efa835'
                  }
                }
              },
              {
                name: 'Grevenbroich',
                itemStyle: {
                  normal: {
                    color: '#FFA836',
                    borderColor: '#FFA836'
                  }
                }
              },
              {
                name: 'Distinguish',
                itemStyle: {
                  normal: {
                    color: 'rgba(159,65,62,255)',
                    borderColor: 'rgba(159,65,62,255)'
                  }
                }
              },
              {
                name: 'Cheltenham',
                itemStyle: {
                  normal: {
                    color: '#FF6551',
                    borderColor: '#FF6551'
                  }
                }
              },
              {
                name: 'Reading',
                itemStyle: {
                  normal: {
                    color: '#72A376',
                    borderColor: '#72A376'
                  }
                }
              },
              {
                name: 'Pantin',
                itemStyle: {
                  normal: {
                    color: '#69797E',
                    borderColor: '#69797E'
                  }
                }
              },
              {
                name: 'Kassel',
                itemStyle: {
                  normal: {
                    color: '#e65e20',
                    borderColor: '#e65e20'
                  }
                }
              },
              {
                name: 'Orly',
                itemStyle: {
                  normal: {
                    color: '#6E6A68',
                    borderColor: '#6E6A68'
                  }
                }
              },
              {
                name: 'FRF',
                itemStyle: {
                  normal: {
                    color: '#5ba33b',
                    borderColor: '#5ba33b'
                  }
                }
              },
              {
                name: 'Cergy',
                itemStyle: {
                  normal: {
                    color: '#B4009E',
                    borderColor: '#B4009E'
                  }
                }
              },
              {
                name: 'Paris',
                itemStyle: {
                  normal: {
                    color: '#666666',
                    borderColor: '#666666'
                  }
                }
              }
            ],
            links: [
              {
                source: 'FRF',
                target: 'Colomiers',
                value: 357.8399963378906
              },
              {
                source: 'SuperiorCard',
                target: 'FRF',
                value: 894.5999908447266
              },
              {
                source: 'DEM',
                target: 'München',
                value: 178.9199981689453
              },
              {
                source: 'GBP',
                target: 'Reading',
                value: 188.52999836206436
              },
              {
                source: 'CAD',
                target: 'Shawnee',
                value: 2346.919983509928
              },
              {
                source: 'GBP',
                target: 'Kirkby',
                value: 753.4000000059605
              },
              {
                source: 'FRF',
                target: 'Roncq',
                value: 178.9199981689453
              },
              {
                source: 'GBP',
                target: 'Peterborough',
                value: 999.159998036921
              },
              {
                source: 'DEM',
                target: 'Frankfurt am Main',
                value: 536.7599945068359
              },
              {
                source: 'GBP',
                target: 'Oxford',
                value: 1831.3799968883395
              },
              {
                source: 'Vista',
                target: 'FRF',
                value: 1789.1999816894531
              },
              {
                source: 'CAD',
                target: 'Langley',
                value: 1274.8199949413538
              },
              {
                source: 'DEM',
                target: 'Offenbach',
                value: 357.8399963378906
              },
              {
                source: 'FRF',
                target: "Villeneuve-d'Ascq",
                value: 178.9199981689453
              },
              {
                source: 'FRF',
                target: 'Dunkerque',
                value: 357.8399963378906
              },
              {
                source: 'DEM',
                target: 'Eilenburg',
                value: 178.9199981689453
              },
              {
                source: 'FRF',
                target: 'Paris',
                value: 1073.5199890136719
              },
              {
                source: 'GBP',
                target: 'Maidenhead',
                value: 549.8400026857853
              },
              {
                source: 'CAD',
                target: 'Sooke',
                value: 1764.499989286065
              },
              {
                source: 'CAD',
                target: 'Vancouver',
                value: 1528.580000281334
              },
              {
                source: 'DEM',
                target: 'Hamburg',
                value: 357.8399963378906
              },
              {
                source: 'GBP',
                target: 'London',
                value: 8619.309983983636
              },
              {
                source: 'CAD',
                target: 'Oak Bay',
                value: 1565.109990529716
              },
              {
                source: 'Distinguish',
                target: 'FRF',
                value: 2683.7999725341797
              },
              {
                source: 'DEM',
                target: 'Neunkirchen',
                value: 178.9199981689453
              },
              {
                source: 'FRF',
                target: 'Cergy',
                value: 178.9199981689453
              },
              {
                source: 'DEM',
                target: 'Hof',
                value: 357.8399963378906
              },
              {
                source: 'FRF',
                target: 'Paris La Defense',
                value: 178.9199981689453
              },
              {
                source: 'CAD',
                target: 'Westminster',
                value: 1149.7999994903803
              },
              {
                source: 'DEM',
                target: 'Ingolstadt',
                value: 536.7599945068359
              },
              {
                source: 'GBP',
                target: 'Saint Ouen',
                value: 0.5899999737739563
              },
              {
                source: 'FRF',
                target: 'Lille',
                value: 357.8399963378906
              },
              {
                source: 'GBP',
                target: 'Leeds',
                value: 1356.6899970173836
              },
              {
                source: 'FRF',
                target: 'Morangis',
                value: 357.8399963378906
              },
              {
                source: 'GBP',
                target: 'Orly',
                value: 0.5899999737739563
              },
              {
                source: 'SuperiorCard',
                target: 'DEM',
                value: 1431.3599853515625
              },
              {
                source: 'Vista',
                target: 'CAD',
                value: 5369.929964579642
              },
              {
                source: 'GBP',
                target: 'Paris',
                value: 0.6399999856948853
              },
              {
                source: 'GBP',
                target: 'Liverpool',
                value: 857.1999968588352
              },
              {
                source: 'GBP',
                target: 'Stoke-on-Trent',
                value: 1131.7099939212203
              },
              {
                source: 'Distinguish',
                target: 'DEM',
                value: 2504.8799743652344
              },
              {
                source: 'CAD',
                target: 'Langford',
                value: 2343.4599857851863
              },
              {
                source: 'DEM',
                target: 'Kassel',
                value: 536.7599945068359
              },
              {
                source: 'GBP',
                target: 'High Wycombe',
                value: 216.83999809622765
              },
              {
                source: 'CAD',
                target: 'Port Hammond',
                value: 1711.1399984136224
              },
              {
                source: 'DEM',
                target: 'Duesseldorf',
                value: 178.9199981689453
              },
              {
                source: 'GBP',
                target: 'Gloucestershire',
                value: 422.28999888151884
              },
              {
                source: 'Distinguish',
                target: 'GBP',
                value: 10384.949975416064
              },
              {
                source: 'FRF',
                target: 'Roissy en Brie',
                value: 178.9199981689453
              },
              {
                source: 'GBP',
                target: 'West Sussex',
                value: 592.1700052022934
              },
              {
                source: 'CAD',
                target: 'Cliffside',
                value: 2906.2699892893434
              },
              {
                source: 'GBP',
                target: 'Newcastle upon Tyne',
                value: 1448.2899911925197
              },
              {
                source: 'GBP',
                target: 'Runcorn',
                value: 1120.4800013303757
              },
              {
                source: 'GBP',
                target: 'W. York',
                value: 612.1199932694435
              },
              {
                source: 'DEM',
                target: 'Kiel',
                value: 178.9199981689453
              },
              {
                source: 'GBP',
                target: 'Woolston',
                value: 833.3199937939644
              },
              {
                source: 'Distinguish',
                target: 'CAD',
                value: 6950.059956334531
              },
              {
                source: 'DEM',
                target: 'Frankfurt',
                value: 715.6799926757812
              },
              {
                source: 'CAD',
                target: 'Colma',
                value: 0.2199999988079071
              },
              {
                source: 'DEM',
                target: 'Essen',
                value: 178.9199981689453
              },
              {
                source: 'FRF',
                target: 'Chatou',
                value: 178.9199981689453
              },
              {
                source: 'GBP',
                target: 'Cheltenham',
                value: 573.0499979257584
              },
              {
                source: 'SuperiorCard',
                target: 'GBP',
                value: 8228.39999615401
              },
              {
                source: 'CAD',
                target: 'Haney',
                value: 2310.4499812424183
              },
              {
                source: 'FRF',
                target: 'Saint Ouen',
                value: 178.9199981689453
              },
              {
                source: 'CAD',
                target: 'Chalk Riber',
                value: 0.9200000166893005
              },
              {
                source: 'DEM',
                target: 'Salzgitter',
                value: 178.9199981689453
              },
              {
                source: 'ColonialVoice',
                target: 'FRF',
                value: 1610.2799835205078
              },
              {
                source: 'DEM',
                target: 'Stuttgart',
                value: 357.8399963378906
              },
              {
                source: 'FRF',
                target: 'Saint-Denis',
                value: 178.9199981689453
              },
              {
                source: 'CAD',
                target: 'Royal Oak',
                value: 2128.459992274642
              },
              {
                source: 'FRF',
                target: 'Les Ulis',
                value: 715.6799926757812
              },
              {
                source: 'FRF',
                target: 'Drancy',
                value: 178.9199981689453
              },
              {
                source: 'GBP',
                target: 'Esher-Molesey',
                value: 911.4700058028102
              },
              {
                source: 'SuperiorCard',
                target: 'CAD',
                value: 7388.099954992533
              },
              {
                source: 'GBP',
                target: 'Bury',
                value: 903.9400005489588
              },
              {
                source: 'GBP',
                target: 'Watford',
                value: 1326.5300009772182
              },
              {
                source: 'CAD',
                target: 'Victoria',
                value: 827.3899968340993
              },
              {
                source: 'DEM',
                target: 'Saarbrücken',
                value: 178.9199981689453
              },
              {
                source: 'GBP',
                target: 'Lancaster',
                value: 685.6899967193604
              },
              {
                source: 'FRF',
                target: 'Pantin',
                value: 178.9199981689453
              },
              {
                source: 'CAD',
                target: 'Newton',
                value: 1781.909985654056
              },
              {
                source: 'GBP',
                target: 'Oxon',
                value: 493.6499986946583
              },
              {
                source: 'CAD',
                target: 'Calgary',
                value: 361.3899962902069
              },
              {
                source: 'DEM',
                target: 'Münster',
                value: 715.6799926757812
              },
              {
                source: 'DEM',
                target: 'Grevenbroich',
                value: 536.7599945068359
              },
              {
                source: 'DEM',
                target: 'Paderborn',
                value: 357.8399963378906
              },
              {
                source: 'GBP',
                target: 'York',
                value: 3172.9999914616346
              },
              {
                source: 'CAD',
                target: 'Metchosin',
                value: 1750.7899813987315
              },
              {
                source: 'FRF',
                target: 'Suresnes',
                value: 357.8399963378906
              },
              {
                source: 'FRF',
                target: 'Versailles',
                value: 894.5999908447266
              },
              {
                source: 'DEM',
                target: 'Erlangen',
                value: 536.7599945068359
              },
              {
                source: 'CAD',
                target: 'Lebanon',
                value: 0.8700000047683716
              },
              {
                source: 'GBP',
                target: 'Wokingham',
                value: 812.6600027084351
              },
              {
                source: 'GBP',
                target: 'Cambridge',
                value: 500.36999743431807
              },
              {
                source: 'ColonialVoice',
                target: 'GBP',
                value: 8040.7799860313535
              },
              {
                source: 'FRF',
                target: 'Saint Germain en Laye',
                value: 178.9199981689453
              },
              {
                source: 'FRF',
                target: 'Metz',
                value: 178.9199981689453
              },
              {
                source: 'FRF',
                target: 'Orleans',
                value: 357.8399963378906
              },
              {
                source: 'GBP',
                target: 'Milton Keynes',
                value: 1648.2200061008334
              },
              {
                source: 'GBP',
                target: 'Warrington',
                value: 2162.8300000429153
              },
              {
                source: 'CAD',
                target: 'N. Vancouver',
                value: 1862.4599857926369
              },
              {
                source: 'DEM',
                target: 'Hannover',
                value: 178.9199981689453
              },
              {
                source: 'Vista',
                target: 'GBP',
                value: 9497.539981640875
              },
              {
                source: 'DEM',
                target: 'Werne',
                value: 178.9199981689453
              },
              {
                source: 'ColonialVoice',
                target: 'DEM',
                value: 1789.1999816894531
              },
              {
                source: 'ColonialVoice',
                target: 'CAD',
                value: 7907.36997512728
              },
              {
                source: 'GBP',
                target: 'Gateshead',
                value: 1425.7099913656712
              },
              {
                source: 'Vista',
                target: 'DEM',
                value: 1968.1199798583984
              }
            ],
            lineStyle: {
              normal: {
                color: 'source',
                curveness: 0.5
              }
            },
            itemStyle: {
              normal: {
                color: '#1f77b4',
                borderColor: '#1f77b4'
              }
            },
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(0,0,0,0.7)',
                  fontFamily: 'Arial',
                  fontSize: 10
                }
              }
            }
          }
        ],
        tooltip: {
          trigger: 'item'
        }
      }
    }
  },
  // watch: {
  //   json: {
  //     deep: true,
  //     handler (val) {
  //       console.log(JSON.stringify(val, null, 4))
  //     }
  //   }
  // },
  mounted () {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.json-demo {
  display: flex;
  .left {
    flex: 1;
    min-height: 90vh;
  }
  .right {
    overflow: scroll;
    max-height: 90vh;
    flex: 1;
  }
}
</style>
