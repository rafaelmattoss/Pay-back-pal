
    $(document).ready(function() {
        // Evento para mostrar/ocultar o formulário de adição ao clicar no botão "Adicionar Cliente"
        $("#add").click(function() {
            $("#form-adiciona").toggle();
        });
    
        // Evento para adicionar um novo cliente ao clicar no botão "Adicionar cliente"
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
                comercio: $("#comercio").val(),
                valor: parseFloat($("#advalor").val()),
                juros: parseFloat($("#adtaxa").val()),
                parcelas: parseInt($("#adparcelas").val())
            };
    
            const taxaDecimal = cliente.juros / 100;
            const valorTotal = cliente.valor * (1 + taxaDecimal);
            const valorParcela = valorTotal / cliente.parcelas;
    
            // Criar novo elemento div para representar o cliente
            const novoCliente = $("<div>").addClass("cliente");
    
            $("<h2>").text(cliente.nome).addClass("nome").appendTo(novoCliente);
            $("<p>").text("Endereço: " + cliente.endereco).addClass("endereco").appendTo(novoCliente);
            $("<p>").text("Tipo de Comércio: " + cliente.comercio).addClass("tipocomercio").appendTo(novoCliente);
            $("<p>").text("Telefone: " + cliente.telefone).addClass("telefone").appendTo(novoCliente);
            $("<p>").text("Valor Emprestado: " + cliente.valor).addClass("valor").appendTo(novoCliente);
            $("<p>").text("Valor da Parcela: " + valorParcela.toFixed(2)).addClass("valorparcela").appendTo(novoCliente);
            $("<p>").text("Número de Parcelas: " + cliente.parcelas).addClass("numeroparcelas").appendTo(novoCliente);
            $("<p>").text("Taxa de Juros: " + cliente.juros + "%").addClass("juros").appendTo(novoCliente);
            $("<p>").text("Total a Pagar: " + valorTotal.toFixed(2)).addClass("total").appendTo(novoCliente);
            $("<br>").appendTo(novoCliente);
    
           
            const divRetirada = $("<div>").attr("id", "retirada").appendTo(novoCliente);
            $("<p>").attr("id", "textosaida").text("Digite o numero de parcelas pagas por  "+ cliente.nome).appendTo(divRetirada);
            $("<input>").attr("type", "text").attr("name", "pagamentos").attr("id", "pagamentos").appendTo(divRetirada);
            $("<button>").text("Realizar Saída").addClass("btosaida").appendTo(divRetirada);

            $("#listaclientes").append(novoCliente);
        }
    
        // Função para limpar os campos do formulário de adição após adicionar um cliente
        function limparCampos() {
            $("#adnome, #adtelefone, #adendereco, #comercio, #advalor, #adtaxa, #adparcelas").val("");
        }

        $("#listaclientes").on("click", ".btosaida", function() {
            const cliente = $(this).closest(".cliente");
    
            // Pegar o texto dos campos necessários
            const parcelastext = cliente.find(".numeroparcelas").text();
            const valorTotalText = cliente.find(".total").text();
            const valorParcelatext = cliente.find(".valorparcela").text();
    
            // Extrair somente os números dos campos de texto usando expressão regular
            const numerosParcelas = parseInt(parcelastext.match(/\d+/)[0]);
            const valorTotal = parseFloat(valorTotalText.match(/\d+(\.\d+)?/)[0]);
            const valorParcela = parseFloat(valorParcelatext.match(/\d+(\.\d+)?/)[0]);
    
            // Obter o valor de parcelas pagas do campo de entrada
            const parcelasPagas = parseFloat(cliente.find("#pagamentos").val());
    
            // Manipular os dados
            const novaParcela = numerosParcelas - parcelasPagas;
            const atualizaValorTotal = parcelasPagas * valorParcela;
            const novoValorTotal = valorTotal - atualizaValorTotal;
    
            // Atualizar os valores do cliente
            cliente.find(".numeroparcelas").text("Número de Parcelas: " + novaParcela);
            cliente.find(".total").text("Total a Pagar: " + novoValorTotal.toFixed(2));
    
            // Limpar o campo de entrada 'pagamentos'
            cliente.find("#pagamentos").val("");
        });

        $("#filtrar").on("input", function() {
            const filtro = $(this).val().toLowerCase(); // Obter o texto digitado no campo de filtro em minúsculas
    
            // Iterar sobre cada cliente na lista
            $(".cliente").each(function() {
                const nomeCliente = $(this).find(".nome").text().toLowerCase(); // Obter o nome do cliente em minúsculas
    
                // Verificar se o nome do cliente corresponde ao filtro
                if (nomeCliente.includes(filtro)) {
                    $(this).show(); // Exibir o cliente se corresponder ao filtro
                } else {
                    $(this).hide(); // Ocultar o cliente se não corresponder ao filtro
                }
            });
        });
        

    })        
    

    
    


    
    


