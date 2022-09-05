import { Typography, TypographyProps } from '@mui/material';
import 'react-quill/dist/quill.bubble.css';

interface IProps {
  sx?: any
  content?: string
}

export default function MyRichTextContainer(props: IProps) {
  const { sx } = props;
  const { content = "<h2>This is example of rich text editor view.</h2><p>Rich text editor view.</p>" } = props;
  const styleInject = "<style>.ql-editor { padding: 0; }</style>";

  return (
    <Typography variant="body1" component="div" sx={{ ...sx }}
      dangerouslySetInnerHTML={{
        __html: `${styleInject}<div class="ql-editor">${content}</div>`
      }}
    />
  )
}

export function MyRichTypography(props: TypographyProps) {
  const { children = "<h2>This is example of rich text editor view.</h2><p>Rich text editor view.</p>" } = props;
  const styleInject = `<style>.ql-editor { padding: 0; text-align: ${props.align ?? "left"}; }</style>`;

  return (
    <Typography {...props} children={undefined}
      dangerouslySetInnerHTML={{
        __html: `${styleInject}<div class="ql-editor">${children}</div>`
      }}
    />
  )
}