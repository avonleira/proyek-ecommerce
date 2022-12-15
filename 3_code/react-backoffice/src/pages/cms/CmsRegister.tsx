import { useRef, useState } from "react";
import { Typography, Stack } from "@mui/material";

import MyBreadCrumbs, { IMyBreadCrumbs } from "../../components/MyBreadCrumbs"
import AdminLayout from "../../layouts/AdminLayout"
import { IStickySideNavProps } from "../../components/StickySideNav";
import AdminPagesMainLayout from "../../layouts/AdminPagesMainLayout";
import AdminCmsPageSettingsComponent from "../../partials/AdminCmsPageSettingsComponent";
// import { useAuth } from "../../../../hooks/auth";

const B_Items: IMyBreadCrumbs[] = [
  { label: "Admin", path: "/" },
  { label: "CMS" },
  { label: "Halaman" },
  { label: "Login" },
]

function CmsRegister() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const pageSettingRef = useRef(null);
  const pageSettingPagePropRef = useRef(null);
  const pageSettingPageSeoRef = useRef(null);
  const sideNavItems: IStickySideNavProps[] = [
    {
      label: "Pengaturan Halaman", sectionRef: pageSettingRef,
      children: [
        { label: "Properti Halaman", sectionRef: pageSettingPagePropRef },
        { label: "SEO", sectionRef: pageSettingPageSeoRef },
      ],
    },
  ];

  return (
    <AdminLayout title={"Halaman Login"} isLoading={isLoading} sx={{ pb: 0 }}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <MyBreadCrumbs items={B_Items} maxItems={2} />
        </Stack>
        
        <AdminPagesMainLayout sideNavItems={sideNavItems}>
          <Stack spacing={3}>
            <Stack ref={pageSettingRef} spacing={1}>
              <Typography variant="h5">
                <Typography variant="inherit" component="span" color={"primary"}>{"# "}</Typography>
                {"Pengaturan Halaman"}
              </Typography>

              <AdminCmsPageSettingsComponent
                pageUrl="/register" 
                pageSettingPagePropRef={pageSettingPagePropRef}
                pageSettingPageSeoRef={pageSettingPageSeoRef}
                isLoading={isLoading} setIsLoading={setIsLoading}
              />
            </Stack>
          </Stack>
        </AdminPagesMainLayout>
        
      </Stack>
    </AdminLayout>
  )
}

export default CmsRegister;