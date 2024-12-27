document.getElementById("generate-btn").addEventListener("click", function () {
  const urlInput = document.getElementById("url-input").value;
  const qrCodeContainer = document.getElementById("qrcode");
  const settings = document.getElementById("settings");

  // Clear previous QR code
  qrCodeContainer.innerHTML = "";

  if (urlInput.trim() === "") {
    alert("Please enter a valid URL! \n \nLütfen geçerli bir URL değeri giriniz.");
    return;
  }

  // Generate QR code
  const qrCode = new QRCode(qrCodeContainer, {
    text: urlInput,
    width: 200,
    height: 200,
  });

  // Show settings after QR code is generated
  settings.style.display = "block";

  // Save button logic
  const saveButton = document.getElementById("save-btn");
  saveButton.addEventListener("click", function () {
    const qrCanvas = qrCodeContainer.querySelector("canvas");
    const formatSelect = document.getElementById("format-select").value;
    const sizeInput = parseInt(document.getElementById("size-input").value);

    if (!qrCanvas) {
      alert("Please generate a QR code first!");
      return;
    }

    // Resize the QR code canvas to the specified size
    const tempCanvas = document.createElement("canvas");
    const context = tempCanvas.getContext("2d");
    tempCanvas.width = sizeInput;
    tempCanvas.height = sizeInput;
    context.drawImage(qrCanvas, 0, 0, sizeInput, sizeInput);

    // Convert canvas to selected format
    const dataURL = tempCanvas.toDataURL(`image/${formatSelect}`);

    // Trigger download
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `qrcode.${formatSelect}`;
    link.click();
  });
});
