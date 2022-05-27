# data in this local

showChart: true,
myData: {
labels: [],
datasets: [
{
label: "Clientes Novos",
backgroundColor: "rgba(00,141,54,0.2)",
data: [],
borderColor: "rgb(00,141,54)",
borderWidth: 2
}
]
},

# model

<vChart :chart-data="this.myData" :options="{ responsive: true, maintainAspectRatio: false }" v-if='showChart01 = false'/>

# types

Bar, HorizontalBar, Doughnut, Line, Pie, PolarArea, Radar, Bubble, Scatter
