const API_KEY = 'AIzaSyByWTdouds1ybN9FxYJVXen8pY2QCRwck0'; 
const CALENDAR_ID = encodeURIComponent('ejanetedaniel@gmail.com');
const MAX_EVENTS = 5; 

function carregarEventos() {
    gapi.load('client', () => {
        gapi.client.init({
            apiKey: API_KEY,
        }).then(() => {
            return gapi.client.request({
                path: `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
                params: {
                    maxResults: MAX_EVENTS,
                    orderBy: 'startTime',
                    singleEvents: true,
                    timeMin: new Date().toISOString(), 
                },
            });
        }).then(response => {
            const eventos = response.result.items;
            const listaEventos = document.getElementById('eventos-lista');
            listaEventos.innerHTML = ''; 

            if (!eventos || eventos.length === 0) {
                listaEventos.innerHTML = '<li>Nenhum evento encontrado.</li>';
                return;
            }

            eventos.forEach(evento => {
                const li = document.createElement('li');
                const nome = evento.summary || 'Sem título';
                const local = evento.location || 'Local não informado';
                const inicio = new Date(evento.start.dateTime || evento.start.date).toLocaleString('pt-BR');

                li.textContent = `${inicio} - ${nome} - ${local}`;
                listaEventos.appendChild(li);
            });
        }).catch(error => {
            console.error('Erro ao carregar eventos:', error);
        });
    });
}


document.addEventListener('DOMContentLoaded', carregarEventos);

document.getElementById('abrir-calendario').addEventListener('click', () => {
    window.open(
        'https://calendar.google.com/calendar/embed?src=ZWphbmV0ZWRhbmllbEBnbWFpbC5jb20&mode=AGENDA&ctz=America%2FSao_Paulo',
  '_blank'
    );
});