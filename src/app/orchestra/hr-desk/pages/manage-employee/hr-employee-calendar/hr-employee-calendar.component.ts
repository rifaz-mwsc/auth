import { Component, OnInit, ViewChild } from '@angular/core';

// import { StaffPortalBaseService } from './../../shared/services/staff-portal-base.service';
// import { StaffPortalEmployeeBaseService } from './../../shared/services/staff-portal-employee-base.service';
// import { LocalStorageService } from './../../../../../app/core/services/local-storage/local-storage.service';
import { HrMangeEmployeeBaseService } from './../../../shared/services/hr-mange-employee-base.service'

import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import * as moment from 'moment';
// import 'fullcalendar';
declare var $: any;

import { OptionsInput, Calendar } from '@fullcalendar/core';
import dayGridPlugin, { DayGrid } from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import bootstrapPlugin from '@fullcalendar/bootstrap';

@Component({
  selector: 'app-hr-employee-calendar',
  templateUrl: './hr-employee-calendar.component.html',
})
export class HrEmployeeCalendarComponent implements OnInit {

  options: any;
  eventsModel: any;
  showLoader: boolean = false;
  fullcalendarData: any = [];

  calendarInfoReq: any = [];
  myProfile: any;

  todayDate: any;
  fromDate: any;
  toDate: any;
  tempFromDate: any;
  tempToDate: any;
  employeeId: any;

  // API data Temp Store
  // attendanceCalendar: any = [];
  calendarEvents: any = [];
  // FullCalendar
  fullcalendarOptions: OptionsInput;
  // calendarEvents: EventInput[] = [];
  calendarVisible = true;
  currentEvents: any = [];
  //getting the calendar api
  calendarApi: Calendar;

  @ViewChild('fullcalendar', { static: false }) fullcalendar: FullCalendarComponent;

  constructor(
    private hrMangeEmployeeBase: HrMangeEmployeeBaseService) {
    this.showLoader = false;
    this.getTodayDate();
    // this.fullcalendarData.Events = this.calendarEvents;
    this.fullcalendarData.defaultView = 'dayGridMonth';


    this.fullcalendarOptions = {
      header: {
        left: 'dayGridMonth',
        center: 'title',
        right: 'prev,next'
      },
      customButtons: {
        prev: {
          text: '<',
          click: this.getEventsByMonthBefore.bind(this)
        },
        next: {
          text: '>',
          click: this.getEventsByMonthAfter.bind(this)
        }
      },
      eventSources: this.calendarEvents,
      events: this.handleEvents.bind(this),
      navLinks: true, // can click day/week names to navigate views
      buttonIcons: true, // show the prev/next text
      plugins: [dayGridPlugin, timeGrigPlugin, interactionPlugin, bootstrapPlugin],
      displayEventTime: false,
      themeSystem: 'bootstrap',
      bootstrapFontAwesome: {
        prev: 'fa-chevron-left',
        next: 'fa-chevron-right',
        prevYear: 'fa-angle-double-left',
        nextYear: 'fa-angle-double-right'
      },
      defaultView: 'dayGridMonth',
      weekends: true,
      editable: false,
      selectable: true,
      selectMirror: true,
    };
  }


  ngOnInit() {

  }

  ngAfterViewChecked() {
    if (this.fullcalendarData.title) {
      this.calendarApi = this.fullcalendar.getApi();
      this.calendarApi.changeView('dayGridMonth');
    }
  }


  search(employeeId) {
    this.showLoader = true;
    localStorage.removeItem('AttendanceCalendar');

    if (this.calendarEvents.length && this.calendarEvents.length > 0) {
      this.calendarApi.removeAllEvents();
      this.calendarEvents = [];
      this.fullcalendarData.Events = [];
    } else {
      this.calendarEvents = [];
      this.fullcalendarData.Events = [];
    }

    // this.employeeId = employeeId;
    this.setFullCalendar(this.todayDate);
  }

  // Clear Error Message on Text On change
  onChangeEvent(event: any) {
    // this.search(this.employeeId);
  }


  setFullCalendar(selectedDate) {
    this.showLoader = true;
    this.fullcalendarData.title = moment(selectedDate).startOf('month').format('YYYY-MM-DD');
    this.fullcalendarData.startOfMonth = moment(selectedDate).startOf('month').subtract(7, 'days').format('YYYY-MM-DD');
    this.fullcalendarData.endOfMonth = moment(selectedDate).endOf('month').add(15, 'days').format('YYYY-MM-DD');

    // this.fullcalendarData.endOfMonth = moment(selectedDate, "DD-MM-YYYY").add(5, 'days');

    // console.log('title', this.fullcalendarData.title);
    // console.log('startOfMonth', this.fullcalendarData.startOfMonth);
    // console.log('endOfMonth', this.fullcalendarData.endOfMonth);
    if (this.calendarEvents.length && this.calendarEvents.length > 0) {
      this.calendarApi.removeAllEvents();
      this.calendarEvents = [];
      this.fullcalendarData.Events = [];
    } else {
      this.calendarEvents = [];
      this.fullcalendarData.Events = [];
    }
    this.postAttendanceCalendarByPeriod(this.fullcalendarData.startOfMonth, this.fullcalendarData.endOfMonth, this.employeeId);
  }

  getTodayDate() {
    // this.todayDate = moment().format();
    this.todayDate = moment().format('YYYY-MM-DD');
    return this.todayDate;
  }

  getFromDate() {
    var fromDate;
    fromDate = this.getTodayDate();
    fromDate = moment().subtract(32, 'days').format();
    this.fromDate = fromDate;
  }


  getToDate() {
    var toDate;
    toDate = this.getTodayDate();
    this.toDate = toDate;
  }


  getEventsByMonthBefore(events) {
    // this.fullcalendarData.Events = [];
    console.log('getEventsByMonthBefore', events);
    // this.calendarApi.gotoDate('2021-01-01');
    // this.calendarApi.changeView('dayGridMonth', '2021-01-01');
    this.calendarApi.prev();
    this.calendarApi.render();

    const currentDate = this.calendarApi.getDate();
    console.log('getEventsByMonthBefore ' + currentDate);
    this.setFullCalendar(currentDate);
  }

  getEventsByMonthAfter(events) {
    // this.fullcalendarData.Events = [];
    console.log('getEventsByMonthAfter', events);
    // this.calendarApi.gotoDate('2021-03-01');
    // this.calendarApi.changeView('dayGridMonth', '2021-03-01');
    this.calendarApi.next();
    this.calendarApi.render();

    const currentDate = this.calendarApi.getDate();
    console.log('getEventsByMonthAfter ' + currentDate);
    this.setFullCalendar(currentDate);
  }


  handleEvents(events) {
    console.log('handleEvents', events);
    this.calendarEvents = events;
  }


  postAttendanceCalendarByPeriod(from, to, employeeId) {
    this.showLoader = true;
    localStorage.removeItem('AttendanceCalendar');
    this.hrMangeEmployeeBase.getStaffPortalCalendarEvents(from, to, employeeId).subscribe((data: any) => {
      console.log('RAW data req', data);
      data.forEach(ele => {
        let eventStart = moment(ele.event_start).toDate();
        let eventEnd = moment(ele.event_end).toDate();
        let eventColor = '';
        let eventTitle = '';
        let backgroundColor = '';
        let displayType = '';
        // eventColor = '#9E9E9E';
        if (ele.event_type === 'leave-request') {
          if (ele.event_name.includes('Annual leave' || 'annual leave')) {
            eventColor = '#757575';
          } else if (ele.event_name.includes('Compassionate leave' || 'compassionate leave')) {
            eventColor = '#757575';
          } else if (ele.event_name.includes('Paternity leave' || 'Paternity leave')) {
            eventColor = '#757575';
          } else if (ele.event_name.includes('Maternity leave' || 'Maternity leave')) {
            eventColor = '#757575';
          } else if (ele.event_name.includes('Circumcision leave' || 'Circumcision leave')) {
            eventColor = '#757575';
          } else if (ele.event_name.includes('Medical leave' || 'medical leave')) {
            eventColor = '#FF5722';
          }


          var now = moment(ele.event_end).add(2, 'seconds');
          var end = moment(ele.event_start);
          let dayDiff = now.diff(end, 'days');
          let timeDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm");
          let hhDiff = moment(dayDiff).format('H');
          let mmDiff = moment(dayDiff).format('m');
          console.log('moment(timeDiff).format(dayDiff) -> ', dayDiff);
          console.log('moment(timeDiff).format(timeDiff) -> ', timeDiff);
          console.log('moment(timeDiff).format(HH)       -> ', hhDiff);
          console.log('moment(timeDiff).format(mm)       -> ', mmDiff);
          // if (hhDiff === '0' || hhDiff === '00') {
          //   eventTitle = 'Offical Trip - ' + mmDiff + ' Mins';
          // } else {
          //   eventTitle = 'Offical Trip - ' + timeDiff + ' Hrs';
          // }
          if ((dayDiff + 1) === 1) {
            eventTitle = ele.event_name + ' - ' + (dayDiff + 1) + ' Day';
          } else if ((dayDiff + 1) === 2) {
            eventTitle = ele.event_name + ' - ' + (dayDiff + 1) + ' Days';
          } else {
            eventTitle = ele.event_name + ' - ' + (dayDiff) + ' Days';
          }


          // eventTitle = ele.event_name;
          displayType = 'auto'
        } else if (ele.event_type === 'overtime-request') {
          var nowTime = moment(ele.event_end).format("HH:mm");
          var endTime = moment(ele.event_start).format("HH:mm");
          var now = moment(ele.event_end);
          var end = moment(ele.event_start);
          let dayDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("DD/MM/YYYY HH:mm");
          let timeDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm");
          let hhDiff = moment(dayDiff).format('H');
          let mmDiff = moment(dayDiff).format('m');
          // console.log('moment(timeDiff).format(timeDiff) -> ', dayDiff);
          // console.log('moment(timeDiff).format(timeDiff) -> ', timeDiff);
          // console.log('moment(timeDiff).format(HH)       -> ', hhDiff);
          // console.log('moment(timeDiff).format(mm)       -> ', mmDiff);
          if (hhDiff === '0' || hhDiff === '00') {
            eventTitle = 'OT - ' + nowTime + ' to ' + endTime + ' (' + mmDiff + ' Mins)';
          } else {
            if (timeDiff === '01:00') {
              eventTitle = 'OT - ' + nowTime + ' to ' + endTime + ' (' + timeDiff + ' Hr)';
            } else {
              eventTitle = 'OT - ' + nowTime + ' to ' + endTime + ' (' + timeDiff + ' Hrs)';
            }
          }
          eventColor = '#4FC3F7';
          displayType = 'auto'
        } else if (ele.event_type === 'amg-CS GP' || ele.event_type === 'amg-FEN GP' || ele.event_type.includes('amg-')) {
          if (ele.event_name.includes('Time In' || 'Time in' || 'time in')) {
            eventColor = '#2E7D32'; // success
          } else if (ele.event_name.includes('Time Out' || 'Time out' || 'time out')) {
            eventColor = '#2E7D32'; // success
          } else if (ele.event_name.includes('OT In' || 'OT in' || 'ot in')) {
            eventColor = '#03A9F4'; // success
          } else if (ele.event_name.includes('OT Out' || 'OT out' || 'ot out')) {
            eventColor = '#03A9F4'; // success
          } else if (ele.event_name.includes('Lunch In' || 'Lunch in' || 'lunch in')) {
            eventColor = '#03A9F4'; // success
          } else if (ele.event_name.includes('Lunch Out' || 'Lunch out' || 'lunch out')) {
            eventColor = '#03A9F4'; // success
          }
          var startDate;
          startDate = moment(ele.event_start).format('HH:mm');;
          eventTitle = ele.event_name + ' ' + startDate;
          displayType = 'auto'
        } else if (ele.event_type.includes('sap-')) {
          if (ele.event_type === ('sap-9012') || ele.event_type === ('sap-9009')) {
            if (ele.event_name.includes('Unauthorized Hours' || 'Unauthorized hours')) {
              var now = moment(ele.event_end);
              var end = moment(ele.event_start);
              let dayDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("DD/MM/YYYY HH:mm:ss");
              let timeDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
              let hhDiff = moment(dayDiff).format('H');
              let mmDiff = moment(dayDiff).format('m');
              console.log('moment(timeDiff).format(timeDiff) -> ', dayDiff);
              console.log('moment(timeDiff).format(timeDiff) -> ', timeDiff);
              console.log('moment(timeDiff).format(HH)       -> ', hhDiff);
              console.log('moment(timeDiff).format(mm)       -> ', mmDiff);
              if (hhDiff === '0' || hhDiff === '00') {
                eventTitle = 'Unauthorized - ' + mmDiff + ' Mins';
              } else {
                eventTitle = 'Unauthorized - ' + timeDiff + 'Hrs';
              }
              eventColor = '#C62828'; // success
              backgroundColor = '#C62828';
            } else if (ele.event_name.includes('Unauthorized Day' || 'Unauthorized day' || 'Unauthorized Leave' || 'Unauthorized leave' || 'Medical days')) {
              var startDate;
              startDate = moment(ele.event_start).format('HH:mm');
              // eventTitle = ele.event_name + ' ' + startDate;
              eventTitle = ele.event_name;
              eventColor = '#C62828'; // success
            } else {
              var startDate;
              startDate = moment(ele.event_start).format('HH:mm');
              // eventTitle = ele.event_name + ' ' + startDate;
              eventTitle = ele.event_name;
              eventColor = '#C62828'; // success
            }
            displayType = 'auto'
          } else if (ele.event_type != ('sap-9012') || ele.event_type != ('sap-9009')) {
            if (ele.event_type === ('sap-9000') || // Annual Leave
              ele.event_type === ('sap-9001') || // Medical Leave
              ele.event_type === ('sap-9002') || // Meternity Leave
              ele.event_type === ('sap-9003') || // Paternity Leave
              ele.event_type === ('sap-9004') || // Compassionate Leave A
              ele.event_type === ('sap-9005') || // Circumcision Leave
              ele.event_type === ('sap-9006') || // Pilgrimage Leave
              ele.event_type === ('sap-9007') || // Study Leave
              ele.event_type === ('sap-9008') || // No-Pay Leave
              ele.event_type === ('sap-9010') || // Un Paid Medical Leave
              ele.event_type === ('sap-9011') || // Compassionate Leave B
              ele.event_type === ('sap-9013') || // Shift Holidays
              ele.event_type === ('sap-9014') || // Convocation Leave
              ele.event_type === ('sap-9015')) { // Project Staffs Leave
              // var startDate;
              // startDate = moment(ele.event_start).format('HH:mm');;
              // eventTitle = ele.event_name + ' ' + startDate;
              var now = moment(ele.event_end);
              var end = moment(ele.event_start);
              let dayDiff = now.diff(end, 'days');
              let timeDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm");
              let hhDiff = moment(dayDiff).format('H');
              let mmDiff = moment(dayDiff).format('m');
              console.log('moment(timeDiff).format(dayDiff) -> ', dayDiff);
              console.log('moment(timeDiff).format(timeDiff) -> ', timeDiff);
              console.log('moment(timeDiff).format(HH)       -> ', hhDiff);
              console.log('moment(timeDiff).format(mm)       -> ', mmDiff);
              // if (hhDiff === '0' || hhDiff === '00') {
              //   eventTitle = 'Offical Trip - ' + mmDiff + ' Mins';
              // } else {
              //   eventTitle = 'Offical Trip - ' + timeDiff + ' Hrs';
              // }
              if ((dayDiff + 1) === 1) {
                eventTitle = ele.event_name + ' - ' + (dayDiff + 1) + ' Day';
              } else if ((dayDiff + 1) === 2) {
                eventTitle = ele.event_name + ' - ' + (dayDiff + 1) + ' Days';
              } else {
                eventTitle = ele.event_name + ' - ' + (dayDiff) + ' Days';
              }

              if (ele.event_name.includes('At Work' || 'At Work')) {
                eventColor = '#4CAF50'; // success
              } else if (ele.event_name.includes('Medical Leave' || 'Medical leave')) {
                eventColor = '#FF5722'; // success
              } else if (ele.event_name.includes('Compassionate Leave' || 'Compassionate Leave')) {
                eventColor = '#757575'; // success
              } else if (ele.event_name.includes('Circumcision Leave' || 'Circumcision leave')) {
                eventColor = '#757575'; // success
              } else if (ele.event_name.includes('Maternity Leave' || 'Maternity leave')) {
                eventColor = '#757575'; // success
              } else if (ele.event_name.includes('Paternity Leave' || 'Paternity leave')) {
                eventColor = '#757575'; // success
              } else if (ele.event_name.includes('Study Leave' || 'Study leave')) {
                eventColor = '#757575'; // success
              } else if (ele.event_name.includes('Annual Leave' || 'annual leave')) {
                eventColor = '#757575'; // success
              } else if (ele.event_name.includes('No-Pay Leave' || 'No-Pay Leave')) {
                eventColor = '#757575'; // success
              } else {
                eventColor = '#757575'; // success
              }
            }

            // sap-7000 (Offical Trip - Records)
            if (ele.event_type === ('sap-7000')) {
              var now = moment(ele.event_end);
              var end = moment(ele.event_start);
              let dayDiff = now.diff(end, 'days');
              let timeDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm");
              let hhDiff = moment(dayDiff).format('H');
              let mmDiff = moment(dayDiff).format('m');
              console.log('moment(timeDiff).format(dayDiff) -> ', dayDiff);
              console.log('moment(timeDiff).format(timeDiff) -> ', timeDiff);
              console.log('moment(timeDiff).format(HH)       -> ', hhDiff);
              console.log('moment(timeDiff).format(mm)       -> ', mmDiff);
              // if (hhDiff === '0' || hhDiff === '00') {
              //   eventTitle = 'Offical Trip - ' + mmDiff + ' Mins';
              // } else {
              //   eventTitle = 'Offical Trip - ' + timeDiff + ' Hrs';
              // }
              if ((dayDiff + 1) === 1) {
                eventTitle = 'Offical Trip - ' + (dayDiff + 1) + ' Day';
              } else if ((dayDiff + 1) === 2) {
                eventTitle = 'Offical Trip - ' + (dayDiff + 1) + ' Days';
              } else {
                eventTitle = 'Offical Trip - ' + (dayDiff) + ' Days';
              }
              eventColor = '#4CAF50'; // success
            }

            // sap-7001 (SAP Overtime - Records)
            if (ele.event_type === ('sap-7001')) {
              var now = moment(ele.event_end);
              var end = moment(ele.event_start);
              let dayDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("DD/MM/YYYY HH:mm");
              let timeDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm");
              let hhDiff = moment(dayDiff).format('H');
              let mmDiff = moment(dayDiff).format('m');
              console.log('moment(timeDiff).format(timeDiff) -> ', dayDiff);
              console.log('moment(timeDiff).format(timeDiff) -> ', timeDiff);
              console.log('moment(timeDiff).format(HH)       -> ', hhDiff);
              console.log('moment(timeDiff).format(mm)       -> ', mmDiff);
              if (hhDiff === '0' || hhDiff === '00') {
                eventTitle = 'Overtime - ' + mmDiff + ' Mins';
              } else {
                eventTitle = 'Overtime - ' + timeDiff + ' Hrs';
              }
              eventColor = '#01579B'; // success
            }

            // sap-7002 (SAP On Call - Records)
            if (ele.event_type === ('sap-7002')) {
              var now = moment(ele.event_end);
              var end = moment(ele.event_start);
              let dayDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("DD/MM/YYYY HH:mm");
              let timeDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm");
              let hhDiff = moment(dayDiff).format('H');
              let mmDiff = moment(dayDiff).format('m');
              console.log('moment(timeDiff).format(timeDiff) -> ', dayDiff);
              console.log('moment(timeDiff).format(timeDiff) -> ', timeDiff);
              console.log('moment(timeDiff).format(HH)       -> ', hhDiff);
              console.log('moment(timeDiff).format(mm)       -> ', mmDiff);
              if (hhDiff === '0' || hhDiff === '00') {
                eventTitle = 'On Call - ' + mmDiff + ' Mins';
              } else {
                eventTitle = 'On Call - ' + timeDiff + ' Hrs';
              }
              eventColor = '#1B5E20'; // success
            }

            // sap-7003 (SAP Training - Records)
            if (ele.event_type === ('sap-7003')) {
              var now = moment(ele.event_end);
              var end = moment(ele.event_start);
              let dayDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("DD/MM/YYYY HH:mm");
              let timeDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm");
              let hhDiff = moment(dayDiff).format('H');
              let mmDiff = moment(dayDiff).format('m');
              console.log('moment(timeDiff).format(timeDiff) -> ', dayDiff);
              console.log('moment(timeDiff).format(timeDiff) -> ', timeDiff);
              console.log('moment(timeDiff).format(HH)       -> ', hhDiff);
              console.log('moment(timeDiff).format(mm)       -> ', mmDiff);
              if (hhDiff === '0' || hhDiff === '00') {
                eventTitle = 'Training - ' + mmDiff + ' Mins';
              } else {
                eventTitle = 'Training - ' + timeDiff + ' Hrs';
              }
              eventColor = '#1B5E20'; // success
            }

            // sap-7004 (SAP Course Instructor - Records)
            if (ele.event_type === ('sap-7004')) {
              var now = moment(ele.event_end);
              var end = moment(ele.event_start);
              let dayDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("DD/MM/YYYY HH:mm");
              let timeDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm");
              let hhDiff = moment(dayDiff).format('H');
              let mmDiff = moment(dayDiff).format('m');
              console.log('moment(timeDiff).format(timeDiff) -> ', dayDiff);
              console.log('moment(timeDiff).format(timeDiff) -> ', timeDiff);
              console.log('moment(timeDiff).format(HH)       -> ', hhDiff);
              console.log('moment(timeDiff).format(mm)       -> ', mmDiff);
              if (hhDiff === '0' || hhDiff === '00') {
                eventTitle = 'Course Instructor - ' + mmDiff + ' Mins';
              } else {
                eventTitle = 'Course Instructor - ' + timeDiff + ' Hrs';
              }
              eventColor = '#1B5E20'; // success
            }

            // sap-7005 (SAP Higher Education - Records)
            if (ele.event_type === ('sap-7005')) {
              var now = moment(ele.event_end);
              var end = moment(ele.event_start);
              let dayDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("DD/MM/YYYY HH:mm");
              let timeDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm");
              let hhDiff = moment(dayDiff).format('H');
              let mmDiff = moment(dayDiff).format('m');
              console.log('moment(timeDiff).format(timeDiff) -> ', dayDiff);
              console.log('moment(timeDiff).format(timeDiff) -> ', timeDiff);
              console.log('moment(timeDiff).format(HH)       -> ', hhDiff);
              console.log('moment(timeDiff).format(mm)       -> ', mmDiff);
              if (hhDiff === '0' || hhDiff === '00') {
                eventTitle = 'Higher Education - ' + mmDiff + ' Mins';
              } else {
                eventTitle = 'Higher Education - ' + timeDiff + ' Hrs';
              }
              eventColor = '#1B5E20'; // success
            }


            // sap-7006 (SAP At Work Records)
            if (ele.event_type === ('sap-7006')) {
              var now = moment(ele.event_end);
              var end = moment(ele.event_start);
              let dayDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("DD/MM/YYYY HH:mm");
              let timeDiff = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm");
              let hhDiff = moment(dayDiff).format('H');
              let mmDiff = moment(dayDiff).format('m');
              console.log('moment(timeDiff).format(timeDiff) -> ', dayDiff);
              console.log('moment(timeDiff).format(timeDiff) -> ', timeDiff);
              console.log('moment(timeDiff).format(HH)       -> ', hhDiff);
              console.log('moment(timeDiff).format(mm)       -> ', mmDiff);
              if (hhDiff === '0' || hhDiff === '00') {
                eventTitle = 'At Work - ' + mmDiff + ' Mins';
              } else {
                eventTitle = 'At Work - ' + timeDiff + ' Hrs';
              }
              eventColor = '#1B5E20'; // success
            }

          }
          displayType = 'auto'
        } else if (ele.event_type === 'holiday') {
          eventTitle = ele.event_name;
          eventColor = '#9E9E9E';
          displayType = 'auto'
        }
        const calendarEventObj = {
          title: eventTitle,
          start: ele.event_start,
          end: ele.event_end,
          // color: ele.event_color,
          color: eventColor,
          backgroundColor: eventColor,
          display: displayType,
          allDay: ele.is_full_day
        };
        this.calendarEvents.push(calendarEventObj);
      });
      // console.log('calendarEvents', this.calendarEvents);
      this.calendarEvents.forEach(ele => {
        this.calendarApi.addEvent(ele);
      });
      this.calendarApi.render();
      this.showLoader = false;
      localStorage.setItem('AttendanceCalendar', JSON.stringify(this.calendarEvents));
    }, (error: Response | any) => {
      this.showLoader = false;
      return throwError(new Error(error.status));
    });
  }









  eventClick(model) {
    console.log(model);
  }
  eventDragStop(model) {
    console.log(model);
  }
  dateClick(model) {
    console.log(model);
  }
  updateHeader() {
    this.options.header = {
      left: 'prev,next myCustomButton',
      center: 'title',
      right: ''
    };
  }
  updateEvents() {
    this.eventsModel = [{
      title: 'Updaten Event',
      start: this.yearMonth + '-08',
      end: this.yearMonth + '-10'
    }];
  }
  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }
  dayRender(ev) {
    ev.el.addEventListener('dblclick', () => {
      alert('double click!');
    });
  }
}
