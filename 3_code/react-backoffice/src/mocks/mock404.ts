import { IMock404 } from "../interfaces/mocksInterface";
// import img from '/images/404image.svg';

export const mock404: IMock404 = {
  header: "It’s Look Like You’re Lost....",
  img_url: "/images/404image.png",
  img_svg: process.env.PUBLIC_URL + "/images/404image.svg",
  subheader: "We can't seem to find the page you're looking for. Try going back to the previous page or contact us for more information.",
}