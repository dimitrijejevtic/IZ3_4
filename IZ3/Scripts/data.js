function getData(param) {
    return $.ajax({
        type: 'GET',
        url: 'api/Data',
        dataType: 'json',
        contentType: 'application/json',
        data: param ? JSON.stringify(param) : null
    }).done(function (data) {
        wins = data['Win'];
        lost = data['Lost'];
    });

}
var wins = 0;
var lost = 0;
function drawChart(win, loss) {
    getData();
    alert(wins);
    var data = new google.visualization.arrayToDataTable([
        ['Win-Loss', 'Matches', { role: 'style' }],
        ['Wins', wins, 'color:#32CD32'],
        ['Lost', lost, 'color:red']
    ]);
    var options = {
        series: {
            0: { axis: 'MatchesAmm' }
        },
        axes: {
            y: {
                MatchesAmm: { label: 'Matches played' }
            }
        },
        width: 500,
        height: 400
    };
    var material = new google.charts.Bar(document.getElementById('myChart'));
    material.draw(data, options);
    var newdata = new google.visualization.arrayToDataTable([
                    ['Value', 'Matches'],
                    ['HS', 1],
                    ['VHS', 1]
    ]);
    var options = {
        width: 500,
        height: 400,
        animation: {
            "startup":true,
            duration: 700,
            easing: 'out',
        }
    };
    var material2 = new google.visualization.PieChart(document.getElementById('my2ndPie'));
    material2.draw(newdata, options);
    google.visualization.events.addListener(material, 'select', function () {
        var selectedItem = material.getSelection()[0];
        if (selectedItem) {
            var selectedText = data.getValue(selectedItem.row, 0);
            var selectedVal = data.getValue(selectedItem.row, 1);
            return $.ajax({
                type: 'GET',
                url: 'api/Data',
                dataType: 'json',
                contentType: 'application/json',
                data: 'param='+selectedText
            }).done(function (data) {               
                           
                newdata.setValue(0,1,data['Value1']);
                newdata.setValue(1,1,data['Value2']);
                material2.draw(newdata, options);
               
                map.panTo(new google.maps.LatLng(parseFloat(180 - data['Value3']), parseFloat(180 - data['Value4'])));
                var marker = new google.map.Marker(
                    {
                        position: { lat: parseFloat(180 - data['Value3']), lng: parseFloat(180 - data['Value4']) },
                        map: map,
                        title:'New Location'
                })
            });
        }
    });
}
