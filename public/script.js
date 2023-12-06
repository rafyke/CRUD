document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario");
    const botaoFechar = document.getElementById("botaoFechar");
    const botaoEnviar = document.getElementById("botaoEnviar");
    const popup = document.querySelector(".popupInfo");
    const tabela = document.getElementById("tbFormulario");
    const primeiraLinha = document.getElementById("primeiralinha");
    let i = 0;
    
    primeiraLinha.style.display="none";
    // BOTAO FECHAR POP UP
    botaoFechar.addEventListener("click", function fechar(event) {
        popup.style.display = "none";
    });

    
 // Função para editar a linha
 function editRow(row) {
    console.log("Clicou em Editar");
    const cells = row.cells;

    // Preencher o formulário com os valores atuais da linha
    document.getElementById("name").value = cells[1].innerHTML;
    document.getElementById("surname").value = cells[2].innerHTML;
    document.getElementById("number").value = cells[3].innerHTML;
    document.getElementById("email").value = cells[4].innerHTML;
    document.getElementById("birthday").value = cells[5].innerHTML;
    document.getElementById("like").value = cells[6].innerHTML;
    document.getElementById("dislike").value = cells[7].innerHTML;
    document.getElementById("botoes").value = cells[8].innerHTML;

    // Mudar o botão "Enviar" para "Salvar Edição"
    botaoEnviar.innerHTML = "Salvar Edição";
    botaoEnviar.removeEventListener("click", adicionarNovaLinha);
    botaoEnviar.addEventListener("click", function () {
        salvarEdicao(row);
    });
}

// Função para salvar a edição
function salvarEdicao(row) {
    const cells = row.cells;

    // Atualizar os valores na linha
    cells[1].innerHTML = document.getElementById("name").value;
    cells[2].innerHTML = document.getElementById("surname").value;
    cells[3].innerHTML = document.getElementById("number").value;
    cells[4].innerHTML = document.getElementById("email").value;
    cells[5].innerHTML = document.getElementById("birthday").value;
    cells[6].innerHTML = document.getElementById("like").value;
    cells[7].innerHTML = document.getElementById("dislike").value;
    cells[8].innerHTML = document.getElementById("botoes").value;

    // Limpar o formulário
    formulario.reset();

    // Mudar o botão "Salvar Edição" para "Enviar"
    botaoEnviar.innerHTML = "Enviar";
    botaoEnviar.removeEventListener("click", salvarEdicao);
    botaoEnviar.addEventListener("click", insertRow);
}
//função exibir tabela antes do preenchimento do formulario
botaoEnviar.addEventListener("click", function exibirTabela() {
    tabela.style.display = "block";
});
    // Função para excluir a linha
    function deleteRow(row) {
        console.log("Clicou em Excluir");
        // Lógica para excluir a linha aqui
        row.remove();
    }

    botaoEnviar.addEventListener("click", function (event) {
        event.preventDefault(); // Evitar o envio padrão do formulário

        // Lógica para processar o envio do formulário
        // Capturando os valores dos campos do formulário
        const name = document.getElementById("name").value;
        const surname = document.getElementById("surname").value;
        const number = document.getElementById("number").value;
        const email = document.getElementById("email").value;
        const birthday = document.getElementById("birthday").value;
        const like = document.getElementById("like").value;
        const dislike = document.getElementById("dislike").value;
        const botoes = document.getElementById("botoes").value;
// Verificar se os campos obrigatórios estão preenchidos
if (!name || !surname || !email || !like|| !dislike) {
    window.alert("Preencha todos os campos obrigatórios!", "error");
    return;
}
        if (i === 0) {
        // Adicionar os valores na tabela
        addRowToTable(name, surname, number, email, birthday, like, dislike, botoes);
        
        // Exibir a tabela após a adição da primeira linha
        tabela.style.display = "block";
     } else {
        // Adicionar os valores na tabela nas próximas vezes
        addRowToTable(name, surname, number, email, birthday, like, dislike, botoes);
    }
    window.alert("Dados enviados com sucesso!", "success");
        formulario.reset();
    });

    // Adicionar nova linha à tabela com as informações do formulário
    function addRowToTable(name, surname, number, email, birthday, like, dislike, botoes) {
        const newRow = tabela.insertRow();
        if (!name || !surname || !email || !like|| !dislike) {
            showaAlert("Preencha todos os campos obrigatórios!", "error");
            window.alert("Preencha todos os campos obrigatórios!", "error");
            return;
        }
        // Adicionar células com os valores do formulário à nova linha
        const cells = [
            newRow.insertCell(0), // Número da Sorte
            newRow.insertCell(1), // Nome
            newRow.insertCell(2), // Sobrenome
            newRow.insertCell(3), // Celular
            newRow.insertCell(4), // E-mail
            newRow.insertCell(5), // Nascimento
            newRow.insertCell(6), // Likes
            newRow.insertCell(7), // Dislikes
            newRow.insertCell(8), // Botões (Editar/Excluir)
        ];

        // Atribuir valores às células
        cells[0].innerHTML = ++i;
        cells[1].innerHTML = name;
        cells[2].innerHTML = surname;
        cells[3].innerHTML = number;
        cells[4].innerHTML = email;
        cells[5].innerHTML = birthday;
        cells[6].innerHTML = like;
        cells[7].innerHTML = dislike;

        // Criar botões de Editar e Excluir
        const botaoEditar = document.createElement("button");
        botaoEditar.className = "btn btn-warning btn-sm edit";
        botaoEditar.type = "button";
        botaoEditar.innerHTML = "Editar";
        botaoEditar.addEventListener("click", function () {
            editRow(newRow);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "btn btn-danger btn-sm delete";
        botaoExcluir.type = "button";
        botaoExcluir.innerHTML = "Excluir";
        botaoExcluir.addEventListener("click", function () {
            deleteRow(newRow);
        });

        // Adicionar os botões à célula de botões
        cells[8].appendChild(botaoEditar);
        cells[8].appendChild(botaoExcluir);
    }

    });