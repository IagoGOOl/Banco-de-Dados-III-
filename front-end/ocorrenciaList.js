const baseURL = 'http://localhost:3000'
let ocorrencias = []

function carregarOcorrencias() {
    fetch(`${baseURL}/ocorrencia`).then(response => response.json())
        .then(json => {
            ocorrencias = json
            rederizarNaTela()
        })
        .catch(err => false)
}

function rederizarNaTela() {
    const div = document.querySelector(".container")
    div.innerHTML = ''
    if (ocorrencias.length) {
        ocorrencias.forEach(ocorrencias => {
            console.log(ocorrencias)
            const {
                _id,
                titulo,
                tipo,
            } = ocorrencias

            const html = `
            <div class="card card-list">
            <h6 id="title">${titulo}</h6>
            <p id="tipo">${tipo}</p>
            <p id="id">${_id}</p>
            <div>
            <button class="btn btn-warning" onclick="handleEdit('${_id}')"> Editar </button>
            <button class="btn btn-danger" onclick="handleDelete('${_id}')"> Excluir</button>
            </div>
            </div>
           

       `
            div.innerHTML += html

        }

        )
    }

    else {
        div.innerHTML = `
        <h3>nenhuma ocorrencia cadastrada</h3>`
    }
}

function handleDelete(id) {
    console.log("entrou na função")
    const confirmation = confirm("Tem certeza que deseja excluir esta ocorrência?");

    if (confirmation) {
        fetch(`${baseURL}/ocorrencia/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {console.log(response); return response.json()})
            .then(data => {
                console.log(data);
                carregarOcorrencias();
            })
            .catch(err => console.error(err));
    } else {
        alert("Exclusão cancelada.");
    }
}

function handleEdit(id) {
    const ocorrenciaParaEditar = ocorrencias.find((ocorrencia) => ocorrencia._id === id);
    const novoTitulo = prompt("Digite o novo título:", ocorrenciaParaEditar.titulo);

    if (novoTitulo === null || novoTitulo.trim() === "") {
        return;
    }

    fetch(`${baseURL}/ocorrencia/${id}`, {
        method: 'PATCH',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo: novoTitulo })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            carregarOcorrencias();
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            alert("Erro ao editar ocorrência. Verifique o console para mais detalhes.");
        });
}


