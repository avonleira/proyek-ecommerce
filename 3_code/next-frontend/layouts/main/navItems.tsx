export interface MainNavBarItemsInterface {
  label: string
  path: string
  icon?: JSX.Element | any
}

export const MainNavBarItems: MainNavBarItemsInterface[] = [
  // { label: "HOME", path: "/", icon: <HomeIcon /> },
  { label: "SHOP", path: "/shop" },
  { label: "ABOUT US", path: "/about-us" },
  // { label: "PBC", path: "/pbc", icon: <CollectionsBookmarkIcon /> },
  // { label: "DISCIPLESHIP", path: "/pdc", icon: <AnnouncementIcon /> },
  // { label: "PENGUMUMAN", path: "/announcement", icon: <AnnouncementIcon /> },
  // { label: "HUBUNGI KAMI", path: "/contact-us", icon: <EmailIcon /> },
]