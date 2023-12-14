import { useMemo } from 'react';
function useMenu(props: any) {
  return useMemo(
    () =>
      props.createDesigner({
        shortcuts: [
          new props.Shortcut({
            codes: [
              [props.KeyCode.Meta, props.KeyCode.S],
              [props.KeyCode.Control, props.KeyCode.S],
            ],
            handler(ctx: any) {
              props.saveSchema(ctx.engine);
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    [],
  );
}
export default useMenu;
