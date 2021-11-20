import { GoogleSpreadsheet } from "google-spreadsheet";
import moment from "moment";
import { fromBase64 } from "../../utils/base64";

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID);

const genCupom = () => {
  const code = parseInt(moment().format("YYMMHHmmssSSS"))
    .toString(16)
    .toUpperCase();
  return code.substr(0, 4) + "-" + code.substr(4, 4) + "-" + code.substr(8, 4);
};

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: fromBase64(process.env.SHEET_PRIVATE_KEY),
    }); // autenticando pelas credenciais
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[1];
    const data = JSON.parse(req.body);

    const sheetConfig = doc.sheetsByIndex[2]; // selecionando a 3 planilha de configurações
    await sheetConfig.loadCells("A3:B3"); // selecionando as colunas a ser acessadas
    const mostrarPromocaoCell = sheetConfig.getCell(2, 0);
    const textCell = sheetConfig.getCell(2, 1);

    let Cupom = "";
    let Promo = "";

    if (mostrarPromocaoCell.value === "VERDADEIRO") {
      Cupom = genCupom();
      Promo = textCell.value;
    }

    await sheet.addRow({
      Nome: data.Nome,
      Sobrenome: data.Sobrenome,
      Email: data.Email,
      Whatsapp: data.Whatsapp,
      Nota: data.Nota,
      "Data Preenchimento": moment().format("DD/MM/YYYY HH:mm:ss"),
      Cupom,
      Promo,
    });
    res.end(
      JSON.stringify({
        showCupon: Cupom !== "",
        Cupom,
        Promo,
      })
    );
  } catch (err) {
    console.log(err);
    res.end("Error");
  }
};
