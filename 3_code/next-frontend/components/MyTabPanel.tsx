
interface IProps {
  index: number
  active: number
  children: JSX.Element|any
}

export default function MyTabPanel(props: IProps) {
  const { index, active, children } = props;

  if (index !== active) return null;
  return (
    <div className="">
      {children}
    </div>
  )
}