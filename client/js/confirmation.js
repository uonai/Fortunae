export default class Confirmation {
  static writeConfirmation(message) {
    console.log(message);
    localStorage.setItem("confirmationMessage", message);
  }

  static showConfirmation() {
    const message = localStorage.getItem("confirmationMessage");
    if (message) {
      const confirmationContainer = document.querySelector("#confirmation");
      confirmationContainer.innerHTML += `<span class="confirmation-message">[${message}]</span>`;
      setTimeout(
        () => document.querySelector(".confirmation-message").remove(),
        3000
      );
      localStorage.removeItem("confirmationMessage");
    }
  }
}
