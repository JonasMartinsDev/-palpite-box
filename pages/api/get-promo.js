import { GoogleSpreadsheet } from "google-spreadsheet";

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID);

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: process.env.SHEET_PRIVATE_KEY,
    }); // autenticando pelas credenciais
    await doc.loadInfo(); // carregando a planilla

    const sheet = doc.sheetsByIndex[2]; // selecionando a 3 planilha de configurações
    await sheet.loadCells("A3:B3"); // selecionando as colunas a ser acessadas
    const mostrarPromocaoCell = sheet.getCell(2, 0);
    const textCell = sheet.getCell(2, 1);

    res.end(
      JSON.stringify({
        showCupon: mostrarPromocaoCell.value === "VERDADEIRO",
        message: textCell.value,
      })
    );
  } catch (error) {
    res.end(
      JSON.stringify({
        showCupon: false,
        message: "",
      })
    );
  }
};
