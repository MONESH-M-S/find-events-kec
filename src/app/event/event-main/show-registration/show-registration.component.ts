import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from '../../event.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-show-registration',
  templateUrl: './show-registration.component.html',
  styleUrls: ['./show-registration.component.scss'],
})
export class ShowRegistrationComponent implements OnInit, OnDestroy {
  eventName = '';
  soloEventDetils = [];
  teamEventDetils = [];
  eventId: string;
  registrationAvailable: boolean = false;
  private registerSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.eventId = params['id'];
        this.eventService.getRegistrationDetailsByEventId(params['id']);
        this.registerSubscription = this.eventService
          .getRegistrationDetailsUpdated()
          .subscribe((res) => {
            if (res.registers.length === 0) {
              this.registrationAvailable = false;
            } else {
              this.eventName = res.registers[0].eventName;
              res.registers.filter((register) => {
                if (register.type === 'solo') {
                  this.soloEventDetils.push(register);
                } else if (register.type === 'team') {
                  this.teamEventDetils.push(register);
                }
              });
              this.registrationAvailable = true;
            }
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.registerSubscription.unsubscribe();
  }

  exportExcelSolo() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.soloEventDetils);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'registration-detail');
    });
  }

  exportExcelTeam() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.teamEventDetils);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'registration-detail');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + '_' + this.eventName + EXCEL_EXTENSION);
  }
}
