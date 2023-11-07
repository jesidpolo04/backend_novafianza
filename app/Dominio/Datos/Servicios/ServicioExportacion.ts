const ExcelJS = require('exceljs');

export class ServicioExportacion {


  public async exportToXLSX(data: any[], cabeceras: any[]) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Datos');
    
    worksheet.columns = cabeceras;
    
    data.forEach((item) => {
      worksheet.addRow(item);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
