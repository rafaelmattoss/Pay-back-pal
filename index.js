 
    
    $("#add").click(function() {
        $("#form-adiciona").toggle();
    });
    
    let clienteEditando = null; // Variável para armazenar o cliente sendo editado

    // Evento para mostrar o formulário de edição ao clicar no botão "Editar Cliente"
    $("body").on("click", ".editar", function() {
      
        clienteEditando = $(this).closest(".cliente");
        
        // Preenche o formulário de edição com os dados do cliente
        $("#novonome").val(clienteEditando.find(".nome").text());
        $("#novotelefone").val(clienteEditando.find(".telefone").text());
        $("#novoendereco").val(clienteEditando.find(".endereco").text());
        $("#novovalor").val(clienteEditando.find(".valor").text());
        $("#novotaxa").val(clienteEditando.find(".juros").text());
        $("#novoqtdparcelas").val(clienteEditando.find(".numeroparcelas").text());

        // Mostra o formulário de edição
        $("#alteracao").show();
    
    });

   
    $("#salvar").click(function(event) {
        event.preventDefault();
    
        const novoNome = $("#novonome").val();
        const novoTelefone = $("#novotelefone").val();
        const novoEndereco = $("#novoendereco").val();
        const novoValor = parseFloat($("#novovalor").val());
        const novoTaxa = parseFloat($("#novotaxa").val());
        const novoParcelas = parseInt($("#novoqtdparcelas").val());
    
        const taxaDecimal = novoTaxa / 100;
        const novoTotal = novoValor * (1 + taxaDecimal);
        const novoValorParcela = novoTotal / novoParcelas;
    
        // Atualizar os elementos HTML do cliente sendo editado
        clienteEditando.find(".nome").text(novoNome);
        clienteEditando.find(".telefone").text(novoTelefone);
        clienteEditando.find(".endereco").text(novoEndereco);
        clienteEditando.find(".valor").text(novoValor);
        clienteEditando.find(".valorparcela").text(novoValorParcela.toFixed(2));
        clienteEditando.find(".numeroparcelas").text(novoParcelas);
        clienteEditando.find(".total").text(novoTotal.toFixed(2));
        clienteEditando.find(".juros").text(novoTaxa + "%");
    
        // Ocultar o formulário de edição após salvar
        $("#alteracao").hide();
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

        
        $("<button>").text("Editar cliente").addClass("editar").appendTo(novoCliente);

        $("<h2>").text(cliente.nome).addClass("nome").appendTo(novoCliente);

        $("<p>").text("Endereço:  " + cliente.endereco).addClass("endereco").appendTo(novoCliente);


        $("<p>").text("Tipo de comércio:  " + cliente.comercio).addClass("tipocomercio").appendTo(novoCliente);


        $("<p>").text("Telefone: " + cliente.telefone).addClass("telefone").appendTo(novoCliente);
    

        $("<p>").text("Valor Emprestado:  " + cliente.valor).addClass("valor").appendTo(novoCliente);
       

        $("<p>").text("Valor da Parcela:  " + (valorParcela.toFixed(2))).addClass("valorparcela").appendTo(novoCliente);

        
        $("<p>").text("Número de Parcelas:  " + cliente.parcelas).addClass("numeroparcelas").appendTo(novoCliente);


        $("<p>").text("Taxa de Juros:  " + cliente.juros + "%").addClass("juros").appendTo(novoCliente);


        $("<p>").text("Total a Pagar:  " + valorTotal.toFixed(2)).addClass("total").appendTo(novoCliente);


        let botaoPagamento = $("<button>").text("Pagamento").attr("id", "pagamento");

        botaoPagamento.appendTo(novoCliente);

        $("#listaclientes").append(novoCliente);
    }

    // Função para limpar os campos do formulário de adição após adicionar um cliente
    function limparCampos() {
        $("#adnome, #adtelefone, #adendereco, #advalor, #adtaxa, #adparcelas").val("");
    }

    $("#listaclientes").on("click", "#pagamento", function() {
        $("#retirada").show();
    
        let clienteRetirando = $(this).closest(".cliente");

        $("#textosaida").text("Digite o valor de parcelas pagas por " + clienteRetirando.find(".nome").text());

        
    });


    $("#retirada").on("click", "#retirar", function() {
        
        alert("oi");
    });
    


    
    


