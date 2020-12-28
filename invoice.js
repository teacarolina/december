//function below creates invoice, downloaded open-source https://parall.ax/products/jspdf to use their code
function generatePDF() {
  const doc = new jsPDF();
  doc.setFontSize(24);
  const logoText = document.querySelector("#logoText").innerHTML;
  doc.text(60, 20, logoText);
  doc.text(20, 50, "Invoice");
  doc.setFontSize(16);
  doc.text(
    20,
    60,
    "Hello! Your purchase is complete. Thank you for choosing us!"
  );
  doc.setFontSize(14);
  doc.text(20, 80, "Payment Status:");
  doc.setTextColor(255, 0, 0);
  doc.text(90, 80, "Not paid");
  doc.setTextColor(0, 0, 0);
  doc.text(20, 90, "Pay within:");
  doc.text(90, 90, "30 days");
  doc.text(20, 100, "Total price:");
  const totalInvoicePrice = document.querySelector(".cart-total-price").innerHTML;
  doc.text(90, 100, totalInvoicePrice);
  doc.setFontSize(16);
  doc.text(20, 120, "Payment with banktransfer");
  doc.setFontSize(14);
  doc.text(20, 130, "Bankgiro:");
  doc.text(90, 130, "123 45 67-8");
  doc.text(20, 140, "Recipient:");
  doc.text(90, 140, "SneakersInstitutet AB");
  doc.setFontSize(16);
  doc.text(20, 160, "Questions?");
  doc.setFontSize(14);
  doc.text(20, 170, "If you have any questions about your order,");
  doc.text(20, 180, "please use the Contact Form on our website.");
  doc.setFontSize(20);
  doc.text(60, 200, "Hope to see you soon again!");
  doc.save("document.pdf");
}

let buttonPDF = document.querySelector("#downloadPDF");
buttonPDF.addEventListener("click", generatePDF);