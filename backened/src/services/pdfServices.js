const PDFDocument = require("pdfkit");

const generateCertificate = (name, res) => {
    const doc = new PDFDocument();
    res.setHeader("Content-TYpe", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${name}certificate.pdf`);
    doc.pipe(res);
    doc.fontSize(25).text("Certificate", {
        align: "center",
    })
    doc.moveDown();
    doc.fontSize(18).text("this is to certify that", {
        align: "center",
    })
    doc.moveDown();
    doc.fontSize(22).text(name, {
        align: "center",
    })
    doc.moveDown();
    doc.text("has successfully completed the interview", {
        align: "center",
    })
    doc.end();
}
module.exports = generateCertificate;