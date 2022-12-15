interface IProps {
  className?: string
  value: string
}

export default function MyRichTypography(props: IProps) {
  const { className = "", value } = props;

  return (
    <p className={className} dangerouslySetInnerHTML={{ __html: value }} />
  )
}