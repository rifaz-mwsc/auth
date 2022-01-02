import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationLogService {

  constructor() { }

  addLog(logTitle, logText, logLink, logError) {
    // Parse any JSON previously stored in allEntries
    var WebAppsLogs = JSON.parse(localStorage.getItem('WebAppsLogs'));
    if (WebAppsLogs == null) {
      WebAppsLogs = [];
    } else {
      var log = {
        title: logTitle,
        text: logText,
        link: logLink,
        error: logError
      };
      // localStorage.setItem('entry', JSON.stringify(log));
      // Save allEntries back to local storage
      WebAppsLogs.push(log);
      try {
        localStorage.setItem('WebAppsLogs', JSON.stringify(WebAppsLogs));
      } catch (e) {
        const exception = e;
        console.log('Error LocalStorage', exception);
      }
    }

    return log;
  }

}
