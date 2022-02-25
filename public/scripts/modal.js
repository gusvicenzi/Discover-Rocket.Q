export default function Modal() {
  const modalWrapper = document.querySelector('.modal-wrapper').classList;
  const cancelButton = document.querySelector('.button.cancel');

  cancelButton.addEventListener('click', close);
  function open() {
    modalWrapper.add('active');
  }
  function close() {
    modalWrapper.remove('active');
  }
  return {
    open,
    close
  };
}
