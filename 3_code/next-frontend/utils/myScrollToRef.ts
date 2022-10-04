export const myScrollToRef = (refElement: any, offset = 70) => {
  // console.log(refElement)
  if (refElement && refElement?.current) window.scrollTo({ top: refElement.current.offsetTop - offset, behavior: 'smooth' });
  else if (process.env.NODE_ENV === "development") console.warn("Scroll Ref Element not Found!");
}