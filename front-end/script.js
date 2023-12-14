let map;
let marker;

let center = { lng: -38.558930105104125, lat: -6.888463202449027 };

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 14,
    });

    marker = new google.maps.Marker({
        map: map,
        position: center,
        draggable: true,
    });

    map.addListener("click", (evt) => {
        addMarker(evt);
    });

    marker.addListener("position_changed", () => {
        map.setCenter(marker.position);
    });
}

function addMarker(evt) {
    marker.setPosition(evt.latLng);
}

function getValuesField() {
    const obj = {
        titulo: document.getElementById("titulo").value,
        tipo: document.getElementById("tipo").value,
        data: document.getElementById("data").value,
        hora: document.getElementById("hora").value,
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
    };
    return obj;
}

function setValuesField(values) {
    const data = values.data.split("/").reverse().join("-");

    document.getElementById("tipo").value = values.tipo;
    document.getElementById("data").value = data;
    document.getElementById("hora").value = values.hora;
    document.getElementById("titulo").value = values.titulo;

    const newLatLng = new google.maps.LatLng(values.lat, values.log);
    marker.setPosition(newLatLng);
}

function salvar() {
    const obj = getValuesField();
    fetch("http://localhost:3000/ocorrencia", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    })
        .then((response) => {
            alert("Salvo com sucesso");
        })
        .catch((error) => alert("Falha ao salvar!"));
}

function salvarRascunho() {
    const obj = getValuesField();

    fetch("http://localhost:3000/ocorrencia/rascunho", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    })
        .then((response) => {
            alert("Salvo com sucesso");
        })
        .catch((error) => alert("Falha ao salvar!"));
}

async function recuperarRascunho() {
    try {
        const response = await fetch(
            "http://localhost:3000/ocorrencia/rascunho"
        );
        const data = await response.json();
        setValuesField(data);
    } catch (error) {
        console.error(error);
    }
}

function lista() {
    fetch("http://localhost:3000/ocorrencia")
        .then((res) => res.json())
        .then((ponto) => {
            marker = new google.maps.Marker({ map: map });
            ponto.forEach((location) => {
                if (location.geometria) {
                    marker.setPosition(
                        new google.maps.LatLng(
                            location.geometria.coordinates[0],
                            location.geometria.coordinates[1]
                        )
                    );
                }
            });
        });
}
