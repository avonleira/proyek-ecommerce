import { useState, useRef, useEffect } from 'react';
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

import MyNextHead from '../../components/MyNextHead';
import { PagePropsInterface } from '../../data/pageProps';
import { myScrollToRef } from '../../utils/myScrollToRef';

interface IProps {
  pageProps?: PagePropsInterface
  className?: string
  bodyNoMinHeight?: boolean
  children?: JSX.Element | any
}

function MainLayout(props: IProps) {
  const headerRef = useRef<null|HTMLElement>(null);
  const scrollToTopButtonRef = useRef<null|HTMLDivElement>(null);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let scrollButton = scrollToTopButtonRef.current;
      if (scrollButton) {
        if (window.scrollY > 100) {
          // scrollButton.classList.remove("animate-fade-out");
          scrollButton.classList.remove("animate-fadeout-slidedown");
          scrollButton.classList.add("animate-fade-in");
          // scrollButton.classList.add("animate-slide-up");
          scrollButton.classList.remove("invisible");
        }
        else {
          scrollButton.classList.remove("animate-fade-in");
          // scrollButton.classList.remove("animate-slide-up");
          // scrollButton.classList.add("animate-fade-out");
          scrollButton.classList.add("animate-fadeout-slidedown");
          scrollButton.classList.add("invisible");
        }
      }
    })
  }, [])

  return (
    <div className={` ${props.className}`}>
      <MyNextHead pageProps={props.pageProps} />
      { openBackdrop ? (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-50 z-10" />
      ) : null }
      <MainHeader refElement={headerRef} setOpenBackdrop={setOpenBackdrop} />
      <main className={`${props.bodyNoMinHeight?"":"min-h-screen"} pt-12 md:pt-28`}>
      {/* <main className={`pt-[${document?.getElementById("header")?.offsetHeight ?? 100}]`}> */}
        {props.children}
      </main>

      {/* Back to Top Button */}
      <div
        id="back-to-top-button"
        ref={scrollToTopButtonRef}
        className="invisible fixed bottom-0 right-4 rounded-t text-white bg-primary-500 px-3 py-2 cursor-pointer"
        onClick={() => { myScrollToRef(headerRef, 0); }}
      >
        <div className="animate-wiggle">
          {/* <i className="bi bi-caret-up-fill"></i> */}
          <i className="bi bi-chevron-up"></i>
        </div>
      </div>
      {/* End Back to Top Button */}

      <MainFooter />
    </div>
  )
}

export default MainLayout;