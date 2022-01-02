export const environment = {
  production: true,

  appVersion: {
    no: '22.01.01',
    label: 'prd',
  },

  api_url: 'https://yoda.mwsc.com.mv/',
  api_server: 'prod',

  yodaApiConfig: {
    api_url: 'https://yoda-demo.mwsc.com.mv/',
    yoda_api_server: 'prod',
  },

  staffAppApiConfig: {
    api_url: 'https://staff-app-api-prd-01.mwsc.com.mv/',
    api_server: 'prod',
  },

  hrDeskApiConfig: {
    api_url: 'https://hr-desk-api-prd-01.mwsc.com.mv/',
    api_server: 'prod',
  },

  devJsonApiConfig: {
    api_json_server_url: 'http://localhost:3001/',
    api_json_server: true,
  },

  adalConfig: {
    tenant: 'mwscnet.onmicrosoft.com',
    clientId: 'e325cce5-05cc-40c0-a528-46c4dbccff6b',
    popUp: false,
    // redirectUri: window.location.href.substring(0, window.location.href.lastIndexOf("/")+1), //window.location.origin + '/',
    redirectUri: 'https://hr-desk-prd-01.mwsc.com.mv/',
    postLogoutRedirectUri: 'https://login.microsoftonline.com/e325cce5-05cc-40c0-a528-46c4dbccff6b/oauth2/logout?post_logout_redirect_uri=https://hr-desk-prd-01.mwsc.com.mv/',
    navigateToLoginRequestUrl: true,
  },

  msalConfig: {
    redirectUrl: 'http://localhost',
    authUrl: 'https://login.microsoftonline.com/325b3561-b516-450a-aff4-e04928240b87/oauth2/v2.0/authorize',
    accessTokenUrl: 'https://login.microsoftonline.com/325b3561-b516-450a-aff4-e04928240b87/oauth2/v2.0/token',
    uiClienId: '074b28cc-a77c-4610-97cd-5b434fc292eb',
    clientSecret: 'bW_lHGry~yqXpksmaDZBCcEsW22Jp~69~0',
    scopeUri: 'api://c6d3e45e-d37c-40c7-997d-a72791506c64/user_impersonation',
    state: 'test',
  },

  appConfig: {
    appTiles: {
      attendence: false,
      dutyroster: false,
      hrDesk: true,
      recruitment: false,
      rollCall: false,
    },
    hrDesk: {
      common: {
        toastrTimeOut: 3000,
        toastrBulkTimeOut: 30000,
        modelCloseTimeOut: 500,
        modelCloseTimeOut_1: 3000,
        modelCloseTimeOut_2: 5000,
        modelCloseTimeOut_3: 7000,
        modelCloseTimeOut_4: 10000,
        modelCloseTimeOut_5: 15000,
        modelCloseTimeOut_6: 20000,
        bulkUploadModelCloseTimeOut: 20000,
      },
      sideMenu: {
        dashboard: true,
        general: true,
        general_letter: true,
        general_holiday: true,
        manageAuthorization : true,
        manageAuthorization_dashboard : true,
        manageOrganization: true,
        manageOrganization_division: true,
        manageEmployee: true,
        manageEmployee_profile: true,
        manageEmployee_statistics: true,
        leave: true,
        leave_requests: true,
        leave_sapUpload: true,
        overtime: true,
        overtime_requests: true,
        overtime_sapUpload: true,
        manageAttendance: true,
        manageAttendanceAbsenceRequests: true,
        manageAttendanceCustomTiming: true,
        manageAttendanceAttendanceRun: false,
        manageAllowance: false,
        manageAllowanceType: true,
        manageAllowanceTypeRate: true,
        manageAllowanceTypeAssign: true,
        manageAllowanceRecord: true,
      },
      statistics: {
        modules: {
          leaveQuota: true,
          unauthorizedAbsence: true,
          overtimeCalculator: true,
        },
      },
      manageOrganization: {
        defaultMaxPagination: 10,
        defaultRequestView: 'List',
        buttons: {
          cancel: true,
          sendForApproval: true,
          sendForRecall: true,
          shorten: false,
          extend: false,
        }
      },
      manageAuth: {
        defaultMaxPagination: 10,
        defaultRequestView: 'List',
        buttons: {
          cancel: true,
          sendForApproval: true,
          sendForRecall: true,
          shorten: false,
          extend: false,
        }
      },
      holidayRequests: {
        defaultMaxPagination: 100,
        defaultRequestView: 'List',
        buttons: {
          cancel: true,
          sendForApproval: true,
          sendForRecall: true,
          shorten: false,
          extend: false,
        }
      },
      letterRequests: {
        defaultMaxPagination: 100,
        defaultRequestView: 'List',
        buttons: {
          cancel: true,
          sendForApproval: true,
          sendForRecall: true,
          shorten: false,
          extend: false,
        }
      },
      overtimeRequests: {
        defaultMaxPagination: 100,
        defaultRequestView: 'List',
        buttons: {
          cancel: true,
          sendForApproval: true,
          sendForRecall: true,
          shorten: false,
          extend: false,
        }
      },
      leaveRequests: {
        defaultMaxPagination: 100,
        defaultRequestView: 'List',
        buttons: {
          cancel: true,
          sendForApproval: true,
          sendForRecall: true,
          shorten: false,
          extend: false,
        }
      },
      overtimeUploadRequests: {
        defaultMaxPagination: 14,
        defaultRequestView: 'List',
        buttons: {
          cancel: true,
          sendForApproval: true,
          sendForRecall: true,
          shorten: false,
          extend: false,
        }
      },
      leaveUploadRequests: {
        defaultMaxPagination: 14,
        defaultRequestView: 'List',
        buttons: {
          cancel: true,
          sendForApproval: true,
          sendForRecall: true,
          shorten: false,
          extend: false,
        }
      },
    }
  }
};
