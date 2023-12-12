import jsPDF from "jspdf";

export default function PDFGenerator({
  _id,
  cliente,
  especialidade,
  local,
  data,
}) {

  const doc = new jsPDF();
  doc.setFontSize(40);
  doc.setFont("helvetica", "bold");
  doc.text(`Guia de Autorização`, 20, 20);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  doc.text(`Nome: ${cliente}`, 20, 30);
  doc.text(`Especialidade: ${especialidade || especialidade.nome}`, 20, 40);
  doc.text(`Local: ${local || local.nome}`, 20, 50);
  doc.text(`Chave de Autenticação: ${_id}`, 20, 60);
  doc.text(`Data: ${data}`, 20, 70);

  // Save the PDF
  doc.save(`Authorization-${_id}-${cliente}.pdf`);
}
