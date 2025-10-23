function alternarTema() { document.body.classList.toggle('claro'); }
function mostrarAba(qual){
  document.querySelectorAll('.tab-btn').forEach(btn=>btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
  if(qual==='quem'){document.querySelector('.tab-btn:nth-child(1)').classList.add('active');document.getElementById('tab-quem').classList.add('active');}
  if(qual==='produtos'){document.querySelector('.tab-btn:nth-child(2)').classList.add('active');document.getElementById('tab-produtos').classList.add('active');}
  if(qual==='contato'){document.querySelector('.tab-btn:nth-child(3)').classList.add('active');document.getElementById('tab-contato').classList.add('active');}
}
const produtos = [
  {nome:"Carregador Turbo", preco: 64.90},
  {nome:"Fone Bluetooth Premium", preco: 119.00},
  {nome:"Cabo Lightning", preco: 29.90},
  {nome:"Capinha à prova d'água", preco: 39.90},
  {nome:"Película Blindada", preco: 24.99}
];
let sacola = {};
function renderizarProdutos() {
  const plista = document.getElementById("produtos-lista");
  plista.innerHTML = "";
  produtos.forEach((prod, i)=>{
    plista.innerHTML += `
      <div class="produto-item">
        <span class="produto-nome">${prod.nome}</span>
        <span class="produto-preco">R$ ${prod.preco.toFixed(2)}</span>
        <button class="add-btn" onclick="adicionarProduto(${i})">Adicionar à sacola</button>
      </div>
    `;
  });
}
function adicionarProduto(idx) {
  const key = produtos[idx].nome;
  if (!sacola[key]) sacola[key] = {qtd:0, idx:idx};
  sacola[key].qtd += 1;
  atualizarSacola();
}
function removerProduto(nome) {
  delete sacola[nome];
  atualizarSacola();
}
function atualizarSacola() {
  let lista="",total=0,nprod=0;
  for(let key in sacola){
    const p = produtos[sacola[key].idx];
    lista += `<div>${sacola[key].qtd}x ${p.nome}
      <span class="produto-preco">R$ ${(p.preco*sacola[key].qtd).toFixed(2)}</span>
      <button class="remover-btn" onclick="removerProduto('${key}')">x</button></div>`;
    total += p.preco * sacola[key].qtd;
    nprod += sacola[key].qtd;
  }
  document.getElementById("sacola-lista").innerHTML = lista || "(Sacola vazia)";
  document.getElementById("sacola-total").textContent = "Total: R$ "+total.toFixed(2);
  document.getElementById("cart-contador").textContent = nprod;
  if(nprod === 0 && document.getElementById("form-usuario-area")) {
    document.getElementById("form-usuario-area").innerHTML = "";
  }
}
function abrirSacola() {
  document.getElementById("sacola").style.display =
    document.getElementById("sacola").style.display === "block" ? "none":"block";
  document.getElementById("sacola-confirmado").style.display = "none";
  document.getElementById("form-usuario-area").innerHTML = "";
}
function comprarAgora() {
  if (Object.keys(sacola).length === 0) {
    document.getElementById("form-usuario-area").innerHTML =
      "<div style='color:#ff8c00;font-weight:bold;text-align:center;margin-top:10px;'>Adicione produtos à sacola antes de finalizar!</div>";
    return false;
  }
  document.getElementById("form-usuario-area").innerHTML = `
    <form class="form-usuario" onsubmit="return enviaWhatsapp()">
      <label>Nome completo:</label>
      <input name="nome" id="nomeUser" required maxlength="60">
      <label>Endereço de entrega:</label>
      <input name="endereco" id="enderecoUser" required maxlength="120">
      <label>Telefone/WhatsApp:</label>
      <input name="tel" id="whatsUser" required maxlength="17" placeholder="(xx) xxxxx-xxxx">
      <label>Forma de pagamento:</label>
      <select name="pagamento" id="pagamentoUser" required>
        <option value="" disabled selected>Selecione</option>
        <option>Pix</option>
        <option>Dinheiro</option>
        <option>Cartão</option>
        <option>Outro</option>
      </select>
      <button type="submit">Enviar Pedido via WhatsApp</button>
    </form>`;
  return false;
}
function enviaWhatsapp() {
  let nome = document.getElementById("nomeUser").value.trim();
  let endereco = document.getElementById("enderecoUser").value.trim();
  let tel = document.getElementById("whatsUser").value.trim();
  let pag = document.getElementById("pagamentoUser").value.trim();
  let mensagem = `🔔 NOVO PEDIDO NO SITE!\n\n`;
  if (typeof sacola !== "undefined" && Object.keys(sacola).length > 0) {
    for(let key in sacola){
      const p = produtos[sacola[key].idx];
      mensagem += `• ${sacola[key].qtd}x ${p.nome} (R$ ${(p.preco*sacola[key].qtd).toFixed(2)})\n`;
    }
    mensagem += `\nTotal: ${document.getElementById("sacola-total").textContent}\n`
  }
  mensagem += `\n--- DADOS DO CLIENTE ---\n`;
  mensagem += `Nome: ${nome}\nWhatsapp: ${tel}\nEndereço: ${endereco}\nForma de Pagamento: ${pag}`;
  let link = "https://wa.me/5512982691531?text=" + encodeURIComponent(mensagem);

  window.open(link, "_blank");

  setTimeout(() => {
    sacola = {};
    atualizarSacola();
  }, 6000);

  return false;
}
document.addEventListener('DOMContentLoaded', function() {
  renderizarProdutos();
  atualizarSacola();
});
