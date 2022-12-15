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
import CmsLanding from '../pages/cms/CmsLanding';
import CmsAbout from '../pages/cms/CmsAbout';
import CmsContact from '../pages/cms/CmsContact';
import CmsPrivacyPolicy from '../pages/cms/CmsPrivacyPolicy';
import CmsTermsConditions from '../pages/cms/CmsTermsConditions';
import MasterFaq from '../pages/master/faq/MasterFaq';
import MasterFaqCreate from '../pages/master/faq/MasterFaqCreate';
import MasterFaqDetail from '../pages/master/faq/MasterFaqDetail';
import MasterCategory from '../pages/master/category/MasterCategory';
import MasterTag from '../pages/master/tag/MasterTag';
import MasterPromo from '../pages/master/promo/MasterPromo';
import MasterPromoCreate from '../pages/master/promo/MasterPromoCreate';
import MasterPromoDetail from '../pages/master/promo/MasterPromoDetail';
import MasterProduct from '../pages/master/product/MasterProduct';
import MasterProductDetail from '../pages/master/product/MasterProductDetail';
import ManageUser from '../pages/manage/user/ManageUser';


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
      {
        label: "Master", icon: <Icon children="post_add" />,
        children: [
          { path: "/master/faq", label: "FAQ", icon: <Icon children="question_answer"/>, element: <MasterFaq /> },
          { path: "/master/faq/c", hideInNav: true, element: <MasterFaqCreate /> },
          { path: "/master/faq/d/:id_faq", hideInNav: true, element: <MasterFaqDetail /> },
          { path: "/master/category", label: "Category", icon: <Icon children="category"/>, element: <MasterCategory /> },
          { path: "/master/category/c", hideInNav: true, element: <MasterCategory /> },
          { path: "/master/category/d/:id_category", hideInNav: true, element: <MasterCategory /> },
          { path: "/master/tag", label: "Tag", icon: <Icon children="tag"/>, element: <MasterTag /> },
          { path: "/master/tag/c", hideInNav: true, element: <MasterTag /> },
          { path: "/master/tag/d/:id_tag", hideInNav: true, element: <MasterTag /> },
          { path: "/master/promo", label: "Promo", icon: <Icon children="sell"/>, element: <MasterPromo /> },
          { path: "/master/promo/c", hideInNav: true, element: <MasterPromoCreate /> },
          { path: "/master/promo/d/:id_promo", hideInNav: true, element: <MasterPromoDetail /> },
          { path: "/master/product", label: "Product", icon: <Icon children="inventory"/>, element: <MasterProduct /> },
          { path: "/master/product/d/:id_product", hideInNav: true, element: <MasterProductDetail /> },
        ]
      },
      {
        label: "Manage", icon: <Icon children="auto_awesome_motion" />,
        children: [
          { path: "/manage/user", label: "User", icon: <Icon children="person"/>, element: <ManageUser /> },
          { path: "/manage/user/c", hideInNav: true, element: <ManageUser /> },
          { path: "/manage/user/d/:id_user", hideInNav: true, element: <ManageUser /> },
        ]
      },
      {
        label: "CMS", icon: <Icon children="art_track"/>,
        children: [
          { index: true, path: "/cms/landing", label: "Landing", icon: <Icon children="home"/>, element: <CmsLanding /> },
          { path: "/cms/about-us", label: "About Us", icon: <Icon children="people"/>, element: <CmsAbout /> },
          { path: "/cms/contact-us", label: "Contact Us", icon: <Icon children="contact_phone"/>, element: <CmsContact /> },
          { path: "/cms/privacy-policy", label: "Privacy & Policy", icon: <Icon children="policy"/>, element: <CmsPrivacyPolicy /> },
          { path: "/cms/terms-conditions", label: "Terms & Conditions", icon: <Icon children="description"/>, element: <CmsTermsConditions /> },
          { path: "/cms/login", label: "Login", icon: <Icon children="file_open"/>, element: <CmsTermsConditions /> },
          { path: "/cms/register", label: "Register", icon: <Icon children="file_open"/>, element: <CmsTermsConditions /> },
        ],
      },
      // {
      //   label: "Report", icon: <Icon children="analyticsart_track"/>,
      //   children: [
      //     { path: "/report/sales", label: "Sales", icon: <Icon children="diversity_3" />, element: <AdminReportPokokdoa /> },
      //   ],
      // },
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