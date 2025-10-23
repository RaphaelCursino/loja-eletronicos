function enviarPedidoWhatsapp() {
  let nome = document.getElementById('nomeUser').value;
  let endereco = document.getElementById('enderecoUser').value;
  let tel = document.getElementById('whatsUser').value;
  let pagamento = document.getElementById('pagamentoUser').value;

  // Aqui vai o carrinho de compras (sacola) se usar, senão comente esta parte!
  let mensagem = `🔔 NOVO PEDIDO NO SITE!\n\n`;

  // Produto do carrinho
  if (typeof sacola !== "undefined" && Object.keys(sacola).length > 0) {
    for(let key in sacola){
      const p = produtos[sacola[key].idx];
      mensagem += `• ${sacola[key].qtd}x ${p.nome} (R$ ${(p.preco*sacola[key].qtd).toFixed(2)})\n`;
    }
    mensagem += `\nTotal: ${document.getElementById("sacola-total").textContent}\n`
  }

  mensagem += `\n--- DADOS DO CLIENTE ---\n`;
  mensagem += `Nome: ${nome}\nWhatsapp: ${tel}\nEndereço: ${endereco}\nForma de Pagamento: ${pagamento}`;

  let numero = "5512982691531";
  let link = "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);
  window.open(link, "_blank");
}
