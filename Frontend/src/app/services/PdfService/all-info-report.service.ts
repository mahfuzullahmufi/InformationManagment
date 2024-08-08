import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import dayjs from 'dayjs';
import { InfoModel } from 'src/app/models/info.model';
import { setSubSetHeading } from 'src/assets/pdfMakeConfig/pdf-make-config';
import { misAllMinistryCenterwiseSummaryDefaultStyle, misMinistrySummaryStyle, setNewConnectionStyle, setPdfMakeFonts } from './config/pdfMakeConfig';
import { LanguageModel } from 'src/app/models/language.model';

@Injectable({
  providedIn: 'root'
})
export class AllInfoReportService {

  defaultColor = "#0c0d0d";

  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  generatePdf(data: any) {
    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinition(data);
    return pdfMake.createPdf(documentDefinition);
  }

  formatLanguages(languages: LanguageModel[]): string {
    return languages.map(lang => lang.name).join(', ');
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
      footer: (currentPage, PageCount) => ({
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
      }),
      content: [this.getHeading(data), this.UntraceableCustomerInfo(data)],
      pageMargins: [30, 0, 30, 30],
      defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
      styles: misMinistrySummaryStyle
    };
  }

  private translateNumber(num: number | string, option = 1): string {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    if (option === 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 });
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }

  private getHeading(data: any) {
    const totalCount = data.length;
    return {
      margin: [30, 20, 30, 0],
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 40],
        margin: [0, 0, 0, 0],
        body: [
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
            {},
            {},
            {
              text: 'Information Management',
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
  }

  private UntraceableCustomerInfo(data: InfoModel[]) {
    let sl = 0;
    const phase = {
      margin: [0, 40, 0, 0],
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [15, 70, 70, 70, 130, 70, 60],
        body: [
          [
            {
              text: `SL No`,
              style: ["setBold"],
              border: [true, true, true, true],
            },
            {
              text: `Name`,
              style: ["setBold"],
              border: [true, true, true, true],
            },
            {
              text: `Country`,
              style: ["setBold"],
              border: [true, true, true, true],
            },
            {
              text: `City`,
              style: ["setBold"],
              border: [true, true, true, true],
            },
            {
              text: `Language Skills`,
              style: ["setBold"],
              border: [true, true, true, true],
            },
            {
              text: `Date Of Birth`,
              style: ["setBold"],
              border: [true, true, true, true],
            },
            {
              text: `Remarks`,
              style: ["setBold"],
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
          style: ["setBold"],
          border: [true, true, true, true],
        },
        {
          text: `${item.name}`,
          style: ["setBold"],
          border: [true, true, true, true],
        },
        {
          text: `${item.countryName}`,
          style: ["setBold"],
          border: [true, true, true, true],
        },
        {
          text: `${item.cityName}`,
          style: ["setBold"],
          border: [true, true, true, true],
        },
        {
          text: `${this.formatLanguages(item.personLanguages)}`,
          style: ["setBold"],
          border: [true, true, true, true],
        },
        {
          text: `${item.dateOfBirth}`,
          style: ["setBold"],
          border: [true, true, true, true],
        },
        {
          text: ``,
          style: ["setBold"],
          border: [true, true, true, true],
        },
      ]);
    });

    return phase;
  }
}
