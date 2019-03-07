
// displays the drivers standings for the given season
showStandings = (year) => {

    const response = fetch('http://ergast.com/api/f1/'+year+'/driverStandings.json')
        .then(response => response.json())
        .then(data => {
            const array = data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'];

            let standingsTable = '<table class="table"><tr><th>Name</th><th>Points</th></tr>';

            for (let i = 0; i < 10; i++){
                const name = array[i]['Driver']['givenName'] + ' <b>' + array[i]['Driver']['familyName']+'</b>';
                const points = array[i]['points'];
                standingsTable += '<tr><td>'+name+'</td><td>'+points+'</td></tr>';
            }

            standingsTable += '</table>';

            document.getElementById('dr-standings').innerHTML += standingsTable;
        });

    const teamResponse = fetch('http://ergast.com/api/f1/'+year+'/constructorStandings.json')
        .then(teamResponse => teamResponse.json())
        .then(data => {
            const array = data['MRData']['StandingsTable']['StandingsLists'][0]['ConstructorStandings'];
            let standingsTable = '<table class="table"><tr><th>Team</th><th>Points</th></tr>';

            for (let i = 0; i < array.length; i++){
                const name = array[i]['Constructor']['name'];
                const points = array[i]['points']
                standingsTable += '<tr><td><b>'+name+'</b></td><td>'+points+'</td></tr>';
            }

            standingsTable += '</table>';
            document.getElementById('con-standings').innerHTML += standingsTable;
        });
    

}


getRace = (year, round) => {

    const response = fetch('http://ergast.com/api/f1/'+year+'/'+round+'.json')
        .then(response => response.json())
        .then(data => {
            const array = data['MRData']['RaceTable']['Races'][0];
            const name = array.raceName;
            const date = array.date;
            const time = array.time;
            const trackName = array['Circuit']['circuitName'];
            const location = array['Circuit']['Location']['locality'] + ', ' + array['Circuit']['Location']['country'];

            // calculates days until the next race
            const today = new Date();
            const target = new Date(date);
            var diff = new Date(target - today);
            var days = Math.round((diff)/(1000*60*60*24))

            document.getElementById('next-race').innerHTML += '<br><h4>'+date+'</h4>';
            document.getElementById('next-race').innerHTML += '<a target="_blank" href="'+array['url']+'">'+name +'</a>';
            document.getElementById('next-race').innerHTML += '<br><em>'+trackName+'</em>';
            document.getElementById('next-race').innerHTML += '<br>'+location;
            document.getElementById('next-race').innerHTML += '<br><br><h4>'+time.substring(0, 5)+'</h4>';
            document.getElementById('next-race').innerHTML += '<em>'+days+' days to go...</em>';
        });

}


getPreviousRace = () => {

    const response = fetch('http://ergast.com/api/f1/current/last/results.json')
        .then(response => response.json())
        .then(data => {
            const array = data['MRData']['RaceTable']['Races'][0];

            const name = array.raceName;
            const date = array.date
            const first = array['Results'][0]['Driver'].givenName +' <b>'+ array['Results'][0]['Driver'].familyName+'</b>';
            const second = array['Results'][1]['Driver'].givenName +' <b>'+ array['Results'][1]['Driver'].familyName+'</b>';
            const third = array['Results'][2]['Driver'].givenName +' <b>'+ array['Results'][2]['Driver'].familyName+'</b>';
            
            document.getElementById('previous-race').innerHTML += '<br><h4>'+date+'</h4>';
            document.getElementById('previous-race').innerHTML += '<a target="_blank" href="'+array['url']+'">'+name+'</a>';
            document.getElementById('previous-race').innerHTML += '<br><br><b>1<sup>st</sup>: &nbsp;</b>'+first;
            document.getElementById('previous-race').innerHTML += '<br><b>2<sup>nd</sup>: &nbsp;</b>'+second;
            document.getElementById('previous-race').innerHTML += '<br><b>3<sup>rd</sup>: &nbsp;</b>'+third;
        });

}


getSchedule = () => {

    const response = fetch('http://ergast.com/api/f1/current.json')
        .then(response => response.json())
        .then(data => {
            const array = data['MRData']['RaceTable']['Races'];
            console.log(array);

            const season = array[0]['season'];
            document.getElementById('raceSeason').innerHTML = season + ' Race Schedule';

            for (let i = 0; i < array.length; i++){
                console.log(array[i]);

                const round = array[i]['round'];
                const raceName = array[i]['Circuit']['Location']['country'];
                const date = array[i]['date'];
                const time = array[i]['time'];
                const url = array[i]['url'];

                
                document.getElementById('race-schedule').innerHTML += '<div class="race"><h2 class="raceNo">'+round+'</h2><div class="raceInfo"><h3 class="raceName"><a href="'+url+'" target="_blank">'+raceName+'</a></h3><h5 class="raceDate">'+date+'</h5><h5 class="raceTime">'+time.substring(0, 5)+'</h5></div>';
            }

        });

}





// displays the drivers standings for the given season
showAllStandings = (year) => {

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


standingsSetup = () => {
    showAllStandings('current');
}


indexSetup = () => {
    getPreviousRace();
    getRace(2019, 1);
    showStandings('current');
}