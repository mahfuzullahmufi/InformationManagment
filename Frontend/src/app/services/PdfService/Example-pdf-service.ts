import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";

import pdfFonts from '../../../assets/pdf-make/vfs_fonts.js';
// const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
// (<any>pdfMake).vfs = pdfFontsX.pdfMake.vfs;
import * as dayjs from 'dayjs'
import {misAllMinistryCenterwiseSummaryDefaultStyle, misMinistrySummaryStyle, setHeading, setNewConnectionStyle, setPdfMakeFonts, setSubHeading, setSubSetHeading} from "./config/pdfMakeConfig";
import { InfoModel } from 'src/app/models/info.model.js';
import { LanguageModel } from 'src/app/models/language.model.js';



(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class Examplepdfservice {

  constructor() { }

  defaultColor = '';
  generatePdf(data: InfoModel[]) {
    //@ts-ignore
    pdfMake.fonts= setPdfMakeFonts

    const documentDefinition = this.getDocumentDefinition(data);
    // @ts-ignore
    //return pdfMake.createPdf(documentDefinition).download('All Information Lists.pdf');
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: any) {
    return {
      info: {
        title: "All Information Lists",
        author: "Mufi",
        subject: "All Information Lists",
        keywords: "keywords for document",
      },
      pageSize: 'A4',
      //pageOrientation: 'landscape',    
      footer: (currentPage, PageCount)=> {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: `পৃষ্ঠা ${this.translateNumber(currentPage, 2)} এর ${this.translateNumber(PageCount, 2)}`, style: ['setFooterLeft'], margin: [30, 5, 30, 0] }, 
                { text: this.translateNumber(dayjs(new Date()).format('DD/MM/YYYY'), 2), style: ['setFooterRight'], margin: [30, 5, 30, 0] }
              ],
            ]
          },
          layout: 'noBorders'
        }
      },
      content: [this.getHeading(data), this.UntraceableCustomerInfo(data)],
      pageMargins: [30, 0, 30, 30],
      // pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
      defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
      styles: misMinistrySummaryStyle

    };
  }

  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }

  formatLanguages(languages: LanguageModel[]): string {
    return languages.map(lang => lang.name).join(', ');
  }


  private getHeading(data: any){
    const totalCount = data.length;
    const phase = {
      margin: [30, 20, 30, 0],
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 40],
        margin: [0, 0, 0, 0],
        body: [
          [
            {
              //image: `logo.png`,
              // width: 70,
              // height: 60,
              // color: 'gray',
              // rowSpan: 5,
              // colSpan: 2,
              // alignment: 'right',
              // margin: [-25, -2, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          [
            {},
            {},
            {
              text: 'Information Managment',
              style: [setNewConnectionStyle.setTitleBold],
              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          [
            {},
            {},
            {
              text: `All Information Lists`,
              style: [setSubSetHeading],
              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          [
            {},
            {},
            {
              text: `Report`,
              style: [setSubSetHeading],
              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          [
            {
              text: `Total Data :\t${totalCount}`,
              style: ['setRight', setSubSetHeading],
              margin: [0, -60, -10, 0],
              colSpan: 10,
              bold: true
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
        ],
      },
      layout: 'noBorders',
    };
    return phase;
  }

  private UntraceableCustomerInfo(data: InfoModel[]) {
    let sl = 0;
    const phase = {
      margin: [0, 40, 0, 0],
      table: {
        dontBreakRows: true,
        headerRows: 1,
        // heights: [10, 10.1, 10],
        widths: [15, 70, 70, 70, 130, 70, 60],
        body: [
          [
            {
              text: `SL No`,
              style: ["setBold",],
              border: [true, true, true, true],
            },
            {
              text: `Name`,
              style: ["setBold",],
              border: [true, true, true, true],
            },
            {
              text: `Country`,
              style: ["setBold",],
              border: [true, true, true, true],
            },
            {
              text: `City`,
              style: ["setBold",],
              border: [true, true, true, true],
            },
            {
              text: `Language Skills`,
              style: ["setBold",],
              border: [true, true, true, true],
            },
            {
              text: `Date Of Birth`,
              style: ["setBold",],
              border: [true, true, true, true],
            },
            {
              text: `Remarks`,
              style: ["setBold",],
              border: [true, true, true, true],
            },
          ],
        ],
      },
    };
      data.forEach(item => {
        sl++;
        phase.table.body.push([
          {
            text: `${sl}`,
            style: ["setBold",],
            border: [true, true, true, true],
          },
          {
            text: `${item.name}`,
            style: ["setBold",],
            border: [true, true, true, true],
          },
          {
            text: `${item.countryName}`,
            style: ["setBold",],
            border: [true, true, true, true],
          },
          {
            text: `${item.cityName}`,
            style: ["setBold",],
            border: [true, true, true, true],
          },
          {
             
            text: `${this.formatLanguages(item.personLanguages)}`,
            style: ["setBold",],
            border: [true, true, true, true],
          },
          {
            text: `${item.dateOfBirth}`,
            style: ["setBold",],
            border: [true, true, true, true],
          },
          {
            text: ``,
            style: ["setBold",],
            border: [true, true, true, true],
          },
        ]);
      });
    
    return phase;
  }

  private setTableBorder() {
    const d = this.defaultColor;
    return {
      hLineWidth: function (i, node) {
        return i === 0 || i === node.table.body.length ? 1 : 1;
      },
      vLineWidth: function (i, node) {
        return i === 0 || i === node.table.widths.length ? 1 : 1;
      },
      hLineColor: function (i, node) {
        return i === 0 || i === node.table.body.length ? d : d;
      },
      vLineColor: function (i, node) {
        return i === 0 || i === node.table.widths.length ? d : d;
      },
      paddingBottom: function (i, node) {
        return 5;
      },
    };
  }
}
