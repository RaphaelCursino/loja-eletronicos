function enviarPedidoWhatsapp() {
  let nome = document.getElementById('nomeUser').value.trim();
  let endereco = document.getElementById('enderecoUser').value.trim();
  let tel = document.getElementById('whatsUser').value.trim();
  let pagamento = document.getElementById('pagamentoUser').value.trim();

  let mensagem = `🔔 NOVO PEDIDO NO SITE!\n\n`;

  // Carrinho de compras (sacola)
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

  // Abre o WhatsApp corretamente no navegador/celular
  window.open(link, "_blank");

  // Limpa a sacola/carrinho somente depois de 6 segundos
  setTimeout(() => {
    if (typeof sacola !== "undefined") {
      sacola = {};
      if (typeof atualizarSacola === "function") atualizarSacola();
    }
  }, 6000);

  return false; // garante que um submit do form não faça reload
}

