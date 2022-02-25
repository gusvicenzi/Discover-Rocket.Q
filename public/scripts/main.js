import Modal from './modal.js';

const modal = Modal();

const modalTitle = document.querySelector('.modal h2');
const modalDescription = document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button');

// Pegar todos os botões com classe check
const checkButtons = document.querySelectorAll('.actions a.check');

// Pegar cada botão individualmente
checkButtons.forEach(button => {
  // Adicionar escuta
  button.addEventListener('click', handleClick);
});

// Pegar todos os botões com classe delete
const deleteButton = document.querySelectorAll('.actions a.delete');

deleteButton.forEach(button => {
  button.addEventListener('click', event => handleClick(event, false));
});

function handleClick(event, check = true) {
  event.preventDefault();
  const action = check ? 'check' : 'delete';
  const title = check ? 'Marcar como lida' : 'Excluir pergunta';
  const message = check
    ? 'marcar esta pergunta como lida?'
    : 'excluir esta pergunta?';

  const form = document.querySelector('.modal form');
  const room = document.querySelector('#room-id').dataset.id;
  const question = event.target.dataset.id;
  form.setAttribute('action', `/question/:${room}/:${question}/:${action}`);

  modalTitle.innerHTML = title;
  modalDescription.innerHTML = `Tem certeza que você deseja ${message}`;
  modalButton.innerHTML = `Sim, ${title.toLocaleLowerCase()}`;
  check
    ? modalButton.classList.remove('red')
    : modalButton.classList.add('red');
  // Abrir modal
  modal.open();
}
