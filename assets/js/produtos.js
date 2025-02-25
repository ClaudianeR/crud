const tableData = document.getElementById("tableContent");
const btnAddProduct = document.getElementById("addProduct");
const modal = document.getElementById("modal");
const productName = document.getElementById("productName");
const productValue = document.getElementById("productValue");
const productQuantity = document.getElementById("productQuantity");
const btnSend = document.getElementById("send");
const btnCancel = document.getElementById("cancel");
const form = document.getElementById("form");
const errorMessage = document.getElementById("errorMessage");

const products = [
  {
    nome: "IPhone X 64Gb Grey",
    preco: 999.0,
    quantidade: 3,
  },
  {
    nome: "Samsung S8 Black",
    preco: 756.0,
    quantidade: 10,
  },


];

function formatDataToString(value) {
  const valorFormatado = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return valorFormatado;
}

function handleEdit(id){
  alert(products[id].nome);
}

function handleDelete(id){
  alert(id);
}

function createTableBodyRow(nome, preco, quantidade, total, id) {
  const html = (tableData.innerHTML += `
        <tr class="even:bg-[#f2f2f2] odd:bg-white">
            <td class="p-3">${nome}</td>
            <td class="p-3">${preco}</td>
            <td class="p-3">${quantidade}</td>
            <td class="text-center p-3">${total}</td>
            <td class="flex gap-2 items-center justify-center p-3">
            <button onclick ="handleEdit(${id})" class =" py-1 px-2 bg-sky-700 text-white rounded md"> Editar </button>
            <button onclick ="handleDelete(${id})" class=" py-1 px-2 bg-red-800 text-white rounded md"> Deletar </button>
            
            </td

        </tr>
    `);

  return html;
}

function renderDataTable() {
  tableData.innerHTML = " ";
  products.map((product, index) => {
    const preco = formatDataToString(Number(product.preco));
    const total = product.preco * product.quantidade;
    const totalFormatado = formatDataToString(total);
    const data = createTableBodyRow(
      product.nome,
      preco,
      product.quantidade,
      totalFormatado,
      index
      
    );

    return data;
  });
}

function openModal() {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {
  modal.classList.remove("flex");
  modal.classList.add("hidden");
  closeErrorMessage();
  form.reset();
}

function showErrorMessage() {
  errorMessage.classList.remove("hidden");
  errorMessage.classList.add("block");
}

function closeErrorMessage() {
  errorMessage.classList.remove("block");
  errorMessage.classList.add("hidden");
}


function addProduct() {
  if (productName.value &&
    productQuantity.value &&
    productValue.value) {

    products.push({
      nome: productName.value,
      quantidade: productQuantity.value,
      preco: productValue.value,
    });

    form.reset();

    closeModal();

  } else {
    showErrorMessage();
  }

}

renderDataTable();

btnAddProduct.addEventListener("click", openModal);

btnSend.addEventListener("click", (e) => {
  e.preventDefault();
  addProduct();
  renderDataTable();
  openError();

});

btnCancel.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();

})
