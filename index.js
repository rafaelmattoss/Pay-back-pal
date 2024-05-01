$(document).ready(function() {
    
    
    $("#add").click(function() {
        $("#form-adiciona").toggle();
    });


    $("body").on("click", ".pagamento", function() {

        $("#retirada").show();

    });

    $("#retirar").click(retirar);

    function retirar(){

        let clienteretirando = $(this).closest(".cliente");

        let parcelasPagas = $("#pagamentos").parseInt($("#pagamentos").val()) 
        let parcelaAtual = clienteretirando.find(".valorparcela").text()
        let numeroDeParcelasAtual = clienteretirando.find(".numeroparcelas").text()
        let totalatual = clienteEditando.find(".total").text()

        let novonumerodeparcelas = parcelasPagas - numeroDeParcelasAtual
        let  valorTotalAPagar = novonumerode

    }




    let clienteEditando = null; // Variável para armazenar o cliente sendo editado

    // Evento para mostrar o formulário de edição ao clicar no botão "Editar Cliente"
    $("body").on("click", ".editar", function() {
        // Identifica o cliente sendo editado
        clienteEditando = $(this).closest(".cliente");
        
        // Preenche o formulário de edição com os dados do cliente
        $("#novonome").val(clienteEditando.find(".nome").text());
        $("#novotelefone").val(clienteEditando.find(".telefone").text());
        $("#novoendereco").val(clienteEditando.find(".endereco").text());
        $("#novovalor").val(clienteEditando.find(".valor").text());
        $("#novotaxa").val(clienteEditando.find(".juros").text());
        $("#novoparcelas").val(clienteEditando.find(".qtdparcelas").text());

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
            comercio: $("#comercio").val(),
            endereco: $("#adendereco").val(),
            valor: parseFloat($("#advalor").val()),
            juros: parseFloat($("#adtaxa").val()), 
            parcelas: parseInt($("#adparcelas").val())
        };

        const taxaDecimal = cliente.juros / 100;
        const valorTotal = cliente.valor * (1 + taxaDecimal);
        const valorParcela = valorTotal / cliente.parcelas;

        // Criar novo elemento div para representar o cliente
        const novoCliente = $("<div>").addClass("cliente");

        // Adicionar elementos HTML com base nos dados do cliente
        $("<h2>").text(cliente.nome).addClass("nome").appendTo(novoCliente);

        $("<p>").text("Endereço:  " + cliente.endereco).addClass("endereco").appendTo(novoCliente);


        $("<p>").text("Tipo de comércio:  " + cliente.comercio).addClass("tipocomercio").appendTo(novoCliente);


        $("<p>").text("Telefone: " + cliente.telefone).addClass("telefone").appendTo(novoCliente);
    

        $("<p>").text("Valor Emprestado:  " + cliente.valor).addClass("valor").appendTo(novoCliente);
       

        $("<p>").text("Valor da Parcela:  " + (valorParcela.toFixed(2))).addClass("valorparcela").appendTo(novoCliente);

        
        $("<p>").text("Número de Parcelas:  " + cliente.parcelas).addClass("numeroparcelas").appendTo(novoCliente);


        $("<p>").text("Taxa de Juros:  " + cliente.juros + "%").addClass("juros").appendTo(novoCliente);


        $("<p>").text("Total a Pagar:  " + valorTotal.toFixed(2)).addClass("total").appendTo(novoCliente);


        $("<button>").text("Editar cliente").addClass("editar").appendTo(novoCliente);

        $("body").append(novoCliente);
    }

    // Função para limpar os campos do formulário de adição após adicionar um cliente
    function limparCampos() {
        $("#adnome, #adtelefone, #adendereco, #advalor, #adtaxa, #adparcelas").val("");
    }

});
