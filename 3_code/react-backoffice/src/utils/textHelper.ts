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