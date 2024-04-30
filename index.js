$(document).ready(function() {
    
    
    $("#add").click(function() {
        $("#form-adiciona").toggle();
    });

    let clienteEditando = null; // Variável para armazenar o cliente sendo editado

    // Evento para mostrar o formulário de edição ao clicar no botão "Editar Cliente"
    $("body").on("click", ".editar", function() {
        // Identifica o cliente sendo editado
        clienteEditando = $(this).closest(".cliente");
        
        // Preenche o formulário de edição com os dados do cliente
        $("#novonome").val(clienteEditando.find(".nome").text());
        $("#novotelefone").val(clienteEditando.find(".telefone").val());
        $("#novoendereco").val(clienteEditando.find(".endereco").val());
        $("#novovalor").val(clienteEditando.find(".valor").val());
        $("#novotaxa").val(clienteEditando.find(".juros").val());
        $("#novoparcelas").val(clienteEditando.find(".qtdparcelas").val());

        // Mostra o formulário de edição
        $("#alteracao").show();
    
    });

   
    $("#salvar").click(function(event) {
        event.preventDefault();


        const novoNome  = $("#novonome").val();
        const novotelefone  = $("#novotelefone").val();
        const novoEndereco = $("#novoendereco").val();
        const novoValor = $("#novovalor").val();
        const novoTaxa = $("#novotaxa").val();
        const novoParcelas =  $("#novoqtdparcelas").val();

        const taxa = novoTaxa / 100
        const novoTotal = novoValor * (taxa + 1);
        const novoValorParcela = novoTotal / novoParcelas

        clienteEditando.find(".nome").text(novoNome)
        clienteEditando.find(".telefone").val(novotelefone)
        clienteEditando.find(".endereco").val(novoEndereco)
        clienteEditando.find(".valor").val(novoValor)
        clienteEditando.find(".parcela").val(novoValorParcela)
        clienteEditando.find(".qtdparcelas").val(novoParcelas)
        clienteEditando.find(".valortotal").val(novoTotal)
        clienteEditando.find(".juros").val(novoTaxa + "%")

        $("#alteracao").hide();
        //colocar cada um no seu lugar com as alterações
    });

    


    

    
  
    $("#adcliente").click(function(event) {
        event.preventDefault();

        if (validarCliente()) {
            adicionarCliente();
            limparCampos();
        }
    });

    // Função para validar os campos do formulário de adição
    function validarCliente() {
        const nome = $("#adnome").val();
        const telefone = $("#adtelefone").val();
        const endereco = $("#adendereco").val();
        const valor = $("#advalor").val();
        const taxa = $("#adtaxa").val();
        const parcelas = $("#adparcelas").val();

        if (nome === '' || telefone === '' || endereco === '' || valor === '' || taxa === '' || parcelas === '') {
            alert("Por favor, preencha todos os campos.");
            return false;
        }

        return true;
    }

    // Função para adicionar um novo cliente à lista
    function adicionarCliente() {
        const cliente = {
            nome: $("#adnome").val(),
            telefone: $("#adtelefone").val(),
            endereco: $("#adendereco").val(),
            valor: parseFloat($("#advalor").val()),
            juros: parseFloat($("#adtaxa").val().replace("%", "")), // Remover o "%" para obter o valor numérico
            parcelas: parseInt($("#adparcelas").val())
        };

        const taxaDecimal = cliente.juros / 100;
        const valorTotal = cliente.valor * (1 + taxaDecimal);
        const valorParcela = valorTotal / cliente.parcelas;

        // Criar novo elemento div para representar o cliente
        const novoCliente = $("<div>").addClass("cliente");

        // Adicionar elementos HTML com base nos dados do cliente
        $("<h2>").text(cliente.nome).addClass("nome").appendTo(novoCliente);
        $("<label>").text("Telefone").addClass("telefone").appendTo(novoCliente);
        $("<input>").val(cliente.telefone).addClass("telefone").appendTo(novoCliente);

        $("<label>").text("Endereço").addClass("endereco").appendTo(novoCliente);
        $("<input>").val(cliente.endereco).addClass("endereco").appendTo(novoCliente);

        $("<label>").text("Valor Emprestado").addClass("valor").appendTo(novoCliente);
        $("<input>").val(cliente.valor).addClass("valor").appendTo(novoCliente);

        $("<label>").text("Total a Pagar").addClass("valortotal").appendTo(novoCliente);
        $("<input>").val(valorTotal.toFixed(2)).addClass("valortotal").appendTo(novoCliente);

        $("<label>").text("Valor da Parcela").addClass("parcela").appendTo(novoCliente);
        $("<input>").val(valorParcela.toFixed(2)).addClass("parcela").appendTo(novoCliente);

        $("<label>").text("Número de Parcelas").addClass("qtdparcelas").appendTo(novoCliente);
        $("<input>").val(cliente.parcelas).addClass("qtdparcelas").appendTo(novoCliente);

        $("<label>").text("Taxa de Juros").addClass("juros").appendTo(novoCliente);
        $("<input>").val(cliente.juros + "%").addClass("juros").appendTo(novoCliente);

        $("<button>").text("Editar cliente").addClass("editar").appendTo(novoCliente);

        $("body").append(novoCliente);
    }

    // Função para limpar os campos do formulário de adição após adicionar um cliente
    function limparCampos() {
        $("#adnome, #adtelefone, #adendereco, #advalor, #adtaxa, #adparcelas").val("");
    }

});
