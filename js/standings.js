
// displays the drivers standings for the given season
showStandings = (year) => {

    const response = fetch('http://ergast.com/api/f1/'+year+'/driverStandings.json')
        .then(response => response.json())
        .then(data => {
            const array = data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'];
            let standingsTable = '<table class="table"><tr><th>Name</th><th>Wins</th><th>Points</th></tr>';
            
            for (let i = 0; i < array.length; i++){
                const name = array[i]['Driver']['givenName'] + ' <b>' + array[i]['Driver']['familyName']+'</b>';
                const points = array[i]['points'];
                const wins = array[i]['wins'];
                standingsTable += '<tr><td>'+name+'</td><td>'+wins+'</td><td>'+points+'</td></tr>';
            }

            standingsTable += '</table>';
            document.getElementById('drivers-standings').innerHTML += standingsTable;
        });
        

    const teamResponse = fetch('http://ergast.com/api/f1/'+year+'/constructorStandings.json')
        .then(teamResponse => teamResponse.json())
        .then(data => {
            const array = data['MRData']['StandingsTable']['StandingsLists'][0]['ConstructorStandings'];
            let standingsTable = '<table class="table"><tr><th>Team</th><th>Wins</th><th>Points</th></tr>';

            for (let i = 0; i < array.length; i++){
                const name = array[i]['Constructor']['name'];
                const wins = array[i]['wins'];
                const points = array[i]['points']
                standingsTable += '<tr><td><b>'+name+'</b></td><td>'+wins+'</td><td>'+points+'</td></tr>';
            }

            standingsTable += '</table>';
            document.getElementById('constructors-standings').innerHTML += standingsTable;
        });
}