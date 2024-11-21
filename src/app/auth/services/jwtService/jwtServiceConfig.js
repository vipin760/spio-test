
const jwtServiceConfig = {
  signIn: "admin/login",
  signUp: "admin/signUp",
  generateOtp: "admin/otpgenerater",
  checkOtp: "otps/checkOtp",
  changePassword: "admin/changePassword",
  accessToken: "auth/authToken",
  updateUser: "admin/updateUser",
  companyList: "institutionGateWayDetails/getAllInstitutionGateWayDetails",
  gateWayDetails: "dashBoard/dashBoardApis?institutionGatewayId=",
  getAllWifiUsers: "wifiUsers/getAllWifiUsers",
  addWifiUser: "wifiUsers/addNewWifiUser",
  getAllAdminUsers: "admin/getAllAdminUsers",
  getInstitutionBranches: "institutionBranches/getAllInstitutionBranches",
  addInstitutionBranch: "institutionBranches/addNewInstitutionBranch",
  getAllSurfingPolicies: "wifiSurfingPolicies/getAllWifiSurfingPolicies",
  getAllGateway: "institutionGateWayDetails/getAllInstitutionGateWayDetails",
  getAllInstitutes: "institutionMaster/getAllInstitutions",
  addInstitute: "institutionMaster/addNewInstitution",
  getWifiAuthOptions: "wifiAuthOptions/getAllWifiAuthOptions",
  addWifiAuthOptions: "wifiAuthOptions/addNewWifiAuthOption",
  getWifiRegisteredMacs: "wifiRegisteredMacs/getAllWifiRegisteredMacs",
  addWifiRegisterMac: "wifiRegisteredMacs/addNewWifiRegisteredMac",
  getWifiSSids: "wifiSsids/getAllWifiSsids",
  addWifiSSid: "wifiSsids/addNewWifiSsids",
  addSurfingPolicy: "wifiSurfingPolicies/addNewWifiSurfingPolicies",
  addInstitutionLocation:
    "institutionLocationInformation/addInstitutionLocation",
  wifiUsers: "wifiUsers",
  addGateways: "institutionGateWayDetails/addNewInstitutionGatewayDetails",
  getAllStatus: "statusMaster/getAllStatus",
  filterGatewayData:
    "institutionGateWayDetails/getAllInstitutionGateWayDetails",
  getwayUpdate: "institutionGateWayDetails/addNewInstitutionGatewayDetails",
  getAllSecretKey: "wifiSecretKeys/getAllWifiSecretKeys",
  getGatewayStatus:"dashBoard/dashBoardApis"
};

export default jwtServiceConfig;
