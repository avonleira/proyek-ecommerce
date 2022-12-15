import { useState, useEffect } from "react";

interface IProps {
  count: number
  page: number
  onChange?: (newValue: number) => void
}

function MyPagination(props: IProps) {
  const { count, page, onChange } = props;
  const [currPage, setCurrPage] = useState<number>(page);
  const [paginationItems, setPaginationItems] = useState<{value: number, tipe: "page"|"div"}[]>([]);

  const handleMinusClick = () => {
    let newCurrPage = currPage;
    if (currPage>1) newCurrPage--;
    setCurrPage(newCurrPage);
    if (onChange) onChange(newCurrPage);
  }
  const handlePlusClick = () => {
    let newCurrPage = currPage;
    if (currPage<count) newCurrPage++;
    setCurrPage(newCurrPage);
    if (onChange) onChange(newCurrPage);
  }

  useEffect(() => {
    let newPI: {value: number, tipe: "page"|"div", active?: boolean}[] = []
    let showQuota = 5;
    let startVal = 1;

    if (currPage===1) startVal = 1;
    else if (currPage===count) startVal = count-(showQuota-1);
    else {
      startVal = currPage-1;
      if (count-startVal<showQuota) startVal = count-(showQuota-1);
    }

    for (let i = startVal; i <= count; i++) {
      if (showQuota>0) {
        newPI.push({ value: i, tipe: "page" })
      }
      showQuota--;
    }

    if (!newPI.map(item => item.value).includes(2)) {
      newPI = [{ value: 0, tipe: "div" }, ...newPI]
    }
    if (!newPI.map(item => item.value).includes(1)) {
      newPI = [{ value: 1, tipe: "page" }, ...newPI]
    }

    if (!newPI.map(item => item.value).includes(count-1)) {
      newPI.push({ value: 0, tipe: "div" })
    }
    if (!newPI.map(item => item.value).includes(count)) {
      newPI.push({ value: count, tipe: "page" })
    }

    // console.log(currPage)
    // console.table(newPI)
    setPaginationItems(newPI);
  }, [currPage])

  return (
    <div className="flex flex-row items-center gap-1 cursor-pointer">
      <div className="rounded p-1 w-8 text-center aspect-square bg-neutral-200 text-neutral-500 mr-2" onClick={handleMinusClick}>
        <i className="bi bi-chevron-left" />
      </div>
      { paginationItems.map((item, index) => {
        const handleClickButton = () => {
          setCurrPage(item.value)
          if (onChange) onChange(item.value)
        }

        if (item.tipe==="page") return (
          <div key={`my-pagination-item-${index}`} className="group">
            <div
              className={`rounded p-1 w-8 text-center aspect-square group-hover:animate-bounce ${currPage===item.value?"text-white bg-primary-500":"text-neutral-500 bg-neutral-200"}`}
              onClick={handleClickButton}
            >
              {item.value}
            </div>
          </div>
        )
        else return (
          <div
            key={index}
            className={``}
          >
            {"..."}
          </div>
        )
      }) }
      <div className="rounded p-1 w-8 text-center aspect-square bg-neutral-200 text-neutral-500 ml-2" onClick={handlePlusClick}>
        <i className="bi bi-chevron-right" />
      </div>
    </div>
  )
}

export default MyPagination;