function consultaEndereco() {
    let cep = document.querySelector("#cep").value;

    if (cep.length !== 8) {
        alert("CEP Inválido!");
        return;
    }

    let url = `https://viacep.com.br/ws/${cep}/json/`;
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then(function (dados) {
            mostrarEndereco(dados);
        })
        .catch(function (error) {
            alert("Erro ao buscar o endereço: " + error.message);
        });

    function mostrarEndereco(dados) {
        let resultado = document.querySelector("#resul");
        if (dados.erro) {
            resultado.innerHTML = "<strong>CEP não encontrado!</strong>";
        } else {
            resultado.innerHTML = `
                <strong><ion-icon name="home-outline"></ion-icon> Localidade: ${dados.localidade || 'Não disponível'}</strong><br>
                <strong> <ion-icon name="earth-outline"></ion-icon>UF: ${dados.uf || 'Não disponível'}</strong>
            `;
        }
    }
}
