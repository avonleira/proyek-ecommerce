import { round } from "./mathHelper"

export const copyToClipboard = (text: string, consoleIt: boolean = false): boolean => {
  try {
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    if (consoleIt) window.alert(`Text copied! ${text}`)
    return true;
  }
  catch (e) {
    console.error(e)
    if (consoleIt) window.alert('Text failed to be copied!')
    return false;
  }
}

export const getRandomSearchKeyword = () => {
  let keywords = ["Keyboard", "Mouse", "PC", "Laptop Gaming", "PC 10 Juta", "CPU", "Intel", "Ryzen"]

  return keywords[Math.floor(Math.random()*keywords.length)]
}

const htmlTagsIndexes = [
  "<div>", "</div>", "<p>", "</p>", "<a>", "</a>", "<br>", "<br/>", "<br />", "<h1>", "</h1>",
  "<h2>", "</h2>", "<h3>", "</h3>", "<h4>", "</h4>", "<h5>", "</h5>", "<h6>", "</h6>",
  "<b>", "</b>", "<i>", "</i>", "<u>", "</u>", "<strong>", "</strong>", "<em>", "</em>",
  "<abbr>", "</abbr>", "<address>", "</address>", "<blockquote>", "</blockquote>",
  "<bdo>", "</bdo>", "<pre>", "</pre>", "<ul>", "</ul>", "<ol>", "</ol>", "<li>", "</li>",
  "<table>", "</table>", "<thead>", "</thead>", "<tbody>", "</tbody>", "<tr>", "</tr>",
  "<th>", "</th>", "<td>", "</td>",
];
export function cleanHTMLFromTextV1(text: string) {
  htmlTagsIndexes.forEach((tag) => { text = text.replaceAll(tag, " ") });
  return text.trim();
}

export const getShortenNumber = (value: number) => {
  let result = value.toString();
  // if (value >= 1000 && value < 10000) result = String(value/1000) + "K"
  if (value >= 1000 && value < 10000) result = (value%1000>=100?round(value/1000, 1).toFixed(1):round(value/1000, 0).toFixed(0)) + "K"
  return result;
}

export const getWhatsappShareLink = (text: string, title?: string) => {
  return "https://web.whatsapp.com/send?text=" 
  + (title ?? "Lihat apa yang saya share!%0a")
  + text;
}

export const getWhatsappDirectLink = (phone: string, text: string, title?: string) => {
  const numberOnly = /^\d+$/.test(phone);
  if (!numberOnly) return undefined;
  if (phone.charAt(0)==="0") phone = phone.replace("0", "62")
  return `https://web.whatsapp.com/send?phone=${phone}&text=`
  + (title ?? "Halo, saya pengunjung pada web anda!%0a")
  + text;
}

export const getTwitterShareLink = (link: string) => {
  return "https://twitter.com/share?url="
  + link;
}

export const getForumEmailShareLink = (title: string, link: string) => {
  return `mailto:?subject=${title}&body=Baca ${title} di Forum GKT Pondok Indah - ${link}`;
}

// %3A = :
// %2F = /
// %0a = enter