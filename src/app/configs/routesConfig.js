import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import Error404Page from "../main/404/Error404Page";
import UserManagementConfig from "../main/user-management/UserManagementConfig";
import ECommerceAppConfig from "../main/branches/BranchesAppConfig";
import RoomsAppConfig from "../main/rooms/RoomsAppConfig";
import dashboardsConfigs from "../main/dashboards/dashboardsConfigs";
import ReportsAppConfig from "../main/reports/ReportsAppConfig";
import InstitutionsAppConfig from "../main/settings/NetworkSettings/Institutions/InstitutionsConfig";
import BranchAppConfig from "../main/settings/NetworkSettings/Branch/BranchConfig";
import AuthenticationAppConfig from "../main/settings/NetworkSettings/AuthenticationOption/AuthenticationConfig";
import RegisterAppConfig from "../main/settings/NetworkSettings/RegisterMac/RegisterMacConfig";
import SurfingPoliciesAppConfig from "../main/settings/NetworkSettings/SurfingPolicies/SurfingPoliciesConfig";
import WifiAppConfig from "../main/settings/NetworkSettings/Wifi_ssid/WifiSsidConfig";
import AdministratorsAppConfig from "../main/settings/GeneralSettings/Administrators/AdministratorsConfig";
import LicenseAppConfig from "../main/settings/GeneralSettings/License&Billing/LicenseBillingConfig";
import WebFilterAppConfig from "../main/settings/AdvancedSettings/WebFilters/WebFilterConfig";
import PortForwardingAppConfig from "../main/settings/AdvancedSettings/PortForwarding/PortForwardingConfig";
import OrganizationAppConfig from "../main/organizations/OrganizationConfig";
import AuthNavigate from "../auth/AuthNavigate";
import PublicPagesConfig from "../main/public/publicPagesConfig";
import VIPAppConfig from "../main/AccessPolicies/GuestUserAccess/VIPAccess/VIPConfig";
import DormsAppConfig from "../main/AccessPolicies/GuestUserAccess/Dorms/DormsConfig";
import StaffAppConfig from "../main/AccessPolicies/GuestUserAccess/Staff/StaffConfig";
import IOTAppConfig from "../main/AccessPolicies/GuestUserAccess/IOT/IOTConfig";
import PrivateUserAppConfig from "../main/AccessPolicies/PrivateUserAccess/PrivateConfg";
import VouchersAppConfig from "../main/AccessPolicies/Vouchers/VouchersConfig";
import DHCPClientsAppConfig from "../main/settings/AdvancedSettings/DHCP/DHCPClients/DHCPClientsConfig";
import ReservedClientsAppConfig from "../main/settings/AdvancedSettings/DHCP/ReservedClients/ReservedClientsConfig";
import RegisteredUsersAppConfig from "../main/userDatabase/RegisteredUsers/RegisteredUsersConfig";
import TemporaryUsersAppConfig from "../main/userDatabase/TemporaryUsers/TemporaryUsersConfig";
import PortsAppConfig from "../main/Hardware/Ports/PortsConfig";
import GatewayAppConfig from "../main/Hardware/More/GatewayConfig";
import LocalInformationAppConfig from "../main/settings/GeneralSettings/LocalInformation/LocalInformationConfig";
import MonitoringAppConfig from "../main/Hardware/Monitoring/MonitoringConfig";
import IPNavConfig from "../main/AccessPolicies/HospitalAccess/IP/IPNavConfig";
import OPNavConfig from "../main/AccessPolicies/HospitalAccess/OP/OPNavConfig";
import GetReviewsConfig from "../main/GetReviews/GetReviewsConfig";
import ReviewsConfig from "../main/Reviews/reviewsConfig";
import ReviewLinkConfig from "../main/riviewLink/ReviewLinkConfig";
import AnalyticsConfig from "../main/Analytics/AnalyticsConfig";
import AutomateConfig from "../main/Automate/AutomateConfig";
import TemplateConfig from "../main/settings/Templates/TemplateConfig";
import SocialConfig from "../main/settings/Social/SocialConfig";
import CustomConfig from "../main/settings/Custom/CustomConfig";
import NotificationConfig from "../main/Notification/NotificationConfig";
import DashConfig from "../main/dashboards/dash/DashConfig";
import IntegrationConfig from "../main/settings/Integration/IntegrationConfig";
import WidgetsConfig from "../main/settings/Widgets/WidgetsConfig.js";
import DshConfig from "../main/dashboards/dsh/DshConfig";
import UserDatabaseConfig from "../main/FaceId/UserDatabase/UserDatabaseConfig";
import ProcessingConfig from "../main/FaceId/Processing/ProcessingConfig";
import AnalyticConfig from "../main/FaceId/Analytics/AnalyticConfig";
import ConfigurationConfig from "../main/FaceId/Settings/Configuration/ConfigurationConfig";
import NotificationConfigfaceid from "../main/FaceId/Settings/Notification/NotificationConfig";
import GatewayConfig from "../main/settings/NetworkSettings/Gateways/GatewayConfig.js";
import LiveCDRConfig from "../main/NewAnalytics/LiveCDR/LiveCDRConfig";
import DidMasterConfig from "../main/settings/DIDMaster/DidMasterConfig";
import VirtualNoMappingConfig from "../main/settings/VirtualNoMapping/VirtualNoMappingConfig";
import Account from "../main/settings/Integration/Account/Account";
import AccountConfig from "../main/settings/Integration/Account/AccountConfig";
import virtualNoMappingCopy from "../main/settings/VirtualNoMappingTest/virtualNoMappingCopy";
import ReportsAndRatingsConfig from "../main/NewReports/ReportsAndRatings/ReportsAndRatingsconfig";
import LocationWiseGraphConfig from "../main/NewReports/LocationWiseGraph/LocationWiseGraphConfig";
import ReviewDistributionByEmployeeConfig from "../main/NewReports/ReviewDistributionByEmployee/reviewDistributionConfig";
import ResponsiveTimeOverTimeConfig from "../main/NewReports/ResponsiveTimeOverTime/responsiveTimeOverTimeConfig";
import LeaderBoardConfig from "../main/NewReports/Leaderboard/LeaderboardConfig";
import ResponsiveTimeDistributionConfig from "../main/NewReports/ResponeTimeDistribution/responseTimeDistributionConfig";
import EmployeeMasterConfig from "../main/settings/EmployeeMaster/EmployeeMasterConfig";
import ResponseRateByCityConfig from "../main/NewReports/ResponseRateByTime/responseRateByCityConfig";
import ReviewNPSByLocationConfig from "../main/NewReports/ReviewNPSbyLocation/reviewNPSByLocationConfig";
import PerformanceByLocationConfig from "../main/NewReports/PerformanceByLocation/perfomanceByLocationConfig";
import ConnectDshConfig from "../main/dashboards/connect_dashboard/ConnectDshConfig";
import WifiIntegrationConfig from "../main/settings/WifiIntegration/wifiIntegrationConfig";



const routeConfigs = [
  PublicPagesConfig,
  UserManagementConfig,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  ECommerceAppConfig,
  RoomsAppConfig,
  ReportsAppConfig,
  OrganizationAppConfig,
  InstitutionsAppConfig,
  BranchAppConfig,
  AuthenticationAppConfig,
  RegisterAppConfig,
  SurfingPoliciesAppConfig,
  WifiAppConfig,
  VIPAppConfig,
  DormsAppConfig,
  StaffAppConfig,
  IOTAppConfig,
  PrivateUserAppConfig,
  VouchersAppConfig,
  AdministratorsAppConfig,
  LicenseAppConfig,
  WebFilterAppConfig,
  PortForwardingAppConfig,
  DHCPClientsAppConfig,
  ReservedClientsAppConfig,
  RegisteredUsersAppConfig,
  TemporaryUsersAppConfig,
  PortsAppConfig,
  GatewayAppConfig,
  LocalInformationAppConfig,
  MonitoringAppConfig,
  IPNavConfig,
  OPNavConfig,
  GetReviewsConfig,
  ReviewsConfig,
  ReviewLinkConfig,
  AnalyticsConfig,
  AutomateConfig,
  TemplateConfig,
  SocialConfig,
  CustomConfig,
  NotificationConfig,
  DashConfig,
  IntegrationConfig,
  WidgetsConfig,
  DshConfig,
  ConnectDshConfig,
  UserDatabaseConfig,
  ProcessingConfig,
  AnalyticConfig,
  ConfigurationConfig,
  NotificationConfigfaceid,
  GatewayConfig,
  LiveCDRConfig,
  DidMasterConfig,
  VirtualNoMappingConfig,
  AccountConfig,
  virtualNoMappingCopy,
  ReportsAndRatingsConfig,
  LocationWiseGraphConfig,
  ReviewDistributionByEmployeeConfig,
  ResponsiveTimeOverTimeConfig,
  LeaderBoardConfig,
  ResponsiveTimeDistributionConfig,
  EmployeeMasterConfig,
  ResponseRateByCityConfig,
  ReviewNPSByLocationConfig,
  PerformanceByLocationConfig,
  WifiIntegrationConfig,
  ...dashboardsConfigs,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "/",
    element: <AuthNavigate />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
];

export default routes;
