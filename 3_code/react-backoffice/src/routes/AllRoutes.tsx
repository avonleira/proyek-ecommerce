import { Icon } from '@mui/material';

// Middleware
// import RouteAdminMiddleware from '../middleware/RouteAdminMiddleware';
// import RoutePublicMiddleware from '../middleware/RoutePublicMiddleware';

// Pages
import Default from "../pages/Default";
import Test from '../pages/Test';
import Page404 from "../pages/404";
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import AdminHome from '../pages/AdminHome';


export interface IRoute {
  index?: boolean
  label?: string
  element?: JSX.Element
  path?: string
  icon?: JSX.Element | any
  children?: IRoute[]
  hideInNav?: boolean
}

export const MAIN_ROUTES: IRoute[] = [
  {
    path: "/", //element: <RouteAdminMiddleware />,
    children: [
      { index: true, path: "/", label: "Dashboard", icon: <Icon children="dashboard"/>, element: <AdminHome /> },
      // { path: "/about-us", element: <MainAbout /> },
      // { path: "/kegiatan", element: <MainKegiatan /> },
      // { path: "/contact-us", element: <MainKontak /> },
      { path: "/test", element: <Test /> },
    ],
  },
  {
    path: "/auth", //element: <RoutePublicMiddleware />,
    children: [
      { index: true, path: "/auth/login", element: <LoginPage /> },
      { path: "/auth/register", element: <RegisterPage /> },
    ],
  },
]

// export const ADMIN_ROUTES: IRoute[] = [
//   {
//     path: "/admin", //element: <RouteAdminMiddleware />,
//     children: [
//       { index: true, path: "/admin", label: "Dashboard", icon: <Icon children="dashboard"/>, element: <AdminHome /> },
//       { path: "/admin/manage-feedback", label: "Kelola Feedback", icon: <Icon children="feedback_outlined"/>, element: <AdminManageFeedback /> },
//       { path: "/admin/manage-feedback/d/:id_feedback", hideInNav: true, element: <AdminManageFeedbackDetail /> },
//       // { path: "/admin/manage-kegiatan", label: "Kelola Kegiatan", icon: <Icon children="event"/>, element: <AdminManageKegiatan /> },
//       { path: "/admin/manage-pbc", label: "Kelola Materi PBC", icon: <Icon children="collections_bookmark"/>, element: <AdminManageRenungan /> },
//       { path: "/admin/manage-pbc/c", hideInNav: true, element: <AdminManageRenunganCreate /> },
//       { path: "/admin/manage-pbc/d/:id_renungan", hideInNav: true, element: <AdminManageRenunganDetail /> },
//       { path: "/admin/manage-pbc/p/:id_renungan", hideInNav: true, element: <MainRenunganDetail /> },
//       { path: "/admin/manage-pdc", label: "Kelola PDC", icon: <Icon children="groups"/>, element: <AdminManagePdc /> },
//       { path: "/admin/manage-pdc/c", hideInNav: true, element: <AdminManagePdcCreate /> },
//       { path: "/admin/manage-pdc/d/:id_pdc", hideInNav: true, element: <AdminManagePdcDetail /> },
//       // { path: "/admin/manage-announcement", label: "Kelola Pengumuman", icon: <Icon children="announcement"/>, element: <AdminManageAnnouncement /> },
//       // { path: "/admin/manage-announcement/c", hideInNav: true, element: <AdminManageAnnouncementCreate /> },
//       // { path: "/admin/manage-announcement/d/:id_pengumuman", hideInNav: true, element: <AdminManageAnnouncementDetail /> },
//       { path: "/admin/manage-jemaat", label: "Kelola Jemaat", icon: <Icon children="account_box"/>, element: <AdminManageJemaat /> },
//       { path: "/admin/manage-jemaat/c", hideInNav: true, element: <AdminManageJemaatCreate /> },
//       { path: "/admin/manage-jemaat/d/:id_jemaat", hideInNav: true, element: <AdminManageJemaatDetail /> },
//       // { path: "/admin/master-tags", label: "Master Tags", icon: <Icon children="tag"/>, element: <AdminMasterTags /> },
//       {
//         label: "Pengaturan", icon: <Icon children="settings"/>,
//         children: [
//           { index: true, path: "/admin/settings/user-role", label: "Role Pengguna", icon: <Icon children="admin_panel_settings"/>, element: <AdminSettingsUserRole /> },
//           { index: true, path: "/admin/settings/user-role/c", hideInNav: true, element: <AdminSettingsUserRoleCreate /> },
//           { index: true, path: "/admin/settings/user-role/d/:id_role", hideInNav: true, element: <AdminSettingsUserRoleDetail /> },
//         ],
//       },
//       {
//         label: "CMS", icon: <Icon children="art_track"/>,
//         children: [
//           // { index: true, path: "/admin/cms/carousel", label: "Banners", icon: <ViewCarouselIcon />, element: <AdminCmsCarousels /> },
//           // { path: "/admin/cms/about", label: "About Us", icon: <HelpCenterIcon />, element: <AdminCmsAbout /> },
//           { index: true, path: "/admin/cms/header", label: "Header", icon: <Icon children="title"/>, element: <AdminCmsHeader /> },
//           { path: "/admin/cms/footer", label: "Footer", icon: <Icon children="format_color_text"/>, element: <AdminCmsFooter /> },
//           {
//             label: "Halaman", icon: <Icon children="feed"/>,
//             children: [
//               { index: true, path: "/admin/cms/pages/landing", label: "Landing", icon: <Icon children="home"/>, element: <AdminCmsPagesLanding /> },
//               // { path: "/admin/cms/pages/about", label: "Tentang Kami", icon: <Icon children="help_center"/>, element: <AdminCmsPagesAbout /> },
//               // { path: "/admin/cms/pages/kegiatan", label: "Kegiatan", icon: <Icon children="event"/>, element: <AdminCmsPagesLanding /> },
//               { path: "/admin/cms/pages/pbc", label: "PBC", icon: <Icon children="collections_bookmark"/>, element: <AdminCmsPagesPbc /> },
//               { path: "/admin/cms/pages/pdc", label: "PDC", icon: <Icon children="groups"/>, element: <AdminCmsPagesPdc /> },
//               // { path: "/admin/cms/pages/announcement", label: "Pengumuman", icon: <Icon children="announcement"/>, element: <AdminCmsPagesLanding /> },
//               { path: "/admin/cms/pages/contact", label: "Kontak", icon: <Icon children="contact_page"/>, element: <AdminCmsPagesContact /> },
//               { path: "/admin/cms/pages/login", label: "Login", icon: <Icon children="file_open"/>, element: <AdminCmsPagesLogin /> },
//               { path: "/admin/cms/pages/register", label: "Register", icon: <Icon children="file_open"/>, element: <AdminCmsPagesRegister /> },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ]

export const ADDITION_ROUTES: IRoute[] = [
  { path: "/404", element: <Page404 />, hideInNav: true },
  { path: "*", element: <Page404 />, hideInNav: true },
]

export const ALL_ROUTES: IRoute[] = [
  ...MAIN_ROUTES,
  ...ADDITION_ROUTES,
]