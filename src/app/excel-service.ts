import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
    providedIn: 'root'
})
export class ExcelService {

    constructor() { }

    public exportAsExcelFile(
        reportHeading: string,
        reportSubHeading: string,
        headersArray: any[],
        json: any[],
        excelFileName: string,
        sheetName: string
    ) {
        const header = headersArray;
        const data = json;

        /* Create workbook and worksheet */
        const workbook = new Workbook();
        workbook.creator = 'Snippet Coder';
        workbook.lastModifiedBy = 'SnippetCoder';
        workbook.created = new Date();
        workbook.modified = new Date();
        const worksheet = workbook.addWorksheet(sheetName);

        /* Add Header Row */
        worksheet.addRow([]);
        worksheet.mergeCells('A1:' + this.numToAlpha(header.length - 1) + '1');
        // worksheet.mergeCells('D1:F4') ;
        worksheet.getCell('A1').value = reportHeading;
        worksheet.getCell('A1').alignment = { horizontal: 'center' };
        worksheet.getCell('A1').font = { size: 22, bold: true  ,underline: true , color: { argb: 'FF00008B' }};

        if (reportSubHeading !== '') {
            worksheet.addRow([]);
            worksheet.mergeCells('A3:' + this.numToAlpha(header.length - 1) + '3');
            worksheet.getCell('A3').value = reportSubHeading;
            worksheet.getCell('A3').alignment = { horizontal: 'center' };
            worksheet.getCell('A3').font = { size: 12, bold: false ,  color: { argb: 'FFFFFFF0' }};

        }

        // Date
        worksheet.mergeCells('A2:' + this.numToAlpha(header.length - 1) + '2');
        let d = new Date();
        let date ='Time-  ' + d.toLocaleTimeString()+    ' Date -  ' + d.toLocaleDateString();
        let dateCell = worksheet.getCell('A2');
        dateCell.value = date;
        dateCell.font = { name: 'Calibri',size: 16, bold: true  ,  color: { argb: 'FFFF000F' } }      
        dateCell.alignment = { horizontal: 'center'  };

        // Blank Row
        worksheet.addRow([]);

        /* Add Header Row */
        const headerRow = worksheet.addRow(header);

        // Cell Style : Fill and Border
        headerRow.eachCell((cell, index) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF000080' },
                bgColor: { argb: '' }
            };
           
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            cell.font = { size: 14, bold: true  ,  color: { argb: 'FFFFFFFF' }};

            worksheet.getColumn(index).width = header[index - 1].length < 20 ? 20 : header[index - 1].length;
        });


        // Get all columns from json
        let columnsArray: any[];
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                columnsArray = Object.keys(json[key]);
            }
        }

        // Add Data and Conditional Formatting
        data.forEach((element: any) => {

            const eachRow: any[] = [];
            columnsArray.forEach((column) => {
                eachRow.push(element[column]);
                
            });

            if (element.isDeleted === 'Y') {
                const deletedRow = worksheet.addRow(eachRow);
                deletedRow.eachCell((cell) => {
                    cell.font = { name: 'Calibri', family: 4, size: 11, bold: false, strike: true };
                });
            } else {
                worksheet.addRow(eachRow);

            }
        });

        worksheet.getColumn(3).width = 30;
        worksheet.getColumn(4).width = 30;
        worksheet.getColumn(5).width = 30;
        worksheet.getColumn(6).width = 30;
        worksheet.getColumn(7).width = 30;
        worksheet.getColumn(8).width = 30;
        worksheet.getColumn(9).width = 30;
        worksheet.getColumn(10).width = 30;
        worksheet.getColumn(11).width = 35;
        worksheet.getColumn(12).width = 30;
        worksheet.getColumn(13).width = 30;
        worksheet.getColumn(14).width = 35;
        worksheet.getColumn(15).width = 30;
        worksheet.getColumn(16).width = 30;
        worksheet.getColumn(18).width = 30;


        worksheet.addRow([]);

        // /*Footer Data Row*/
        // if (footerData != null) {
        //     footerData.forEach((element: any) => {

        //         const eachRow: any[] = [];
        //         element.forEach((val: any) => {
        //             eachRow.push(val);
        //         });

        //         const footerRow = worksheet.addRow(eachRow);
        //         footerRow.eachCell((cell) => {
        //             cell.font = { bold: true };
        //         });
        //     });
        // }

        /*Save Excel File*/
        workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
            const blob = new Blob([data], { type: EXCEL_TYPE });
            fs.saveAs(blob, excelFileName + EXCEL_EXTENSION);
        });
    }

    private numToAlpha(num: number) {

        let alpha = '';

        for (; num >= 0; num = parseInt((num / 26).toString(), 10) - 1) {
            alpha = String.fromCharCode(num % 26 + 0x41) + alpha;
        }

        return alpha;
    }
}