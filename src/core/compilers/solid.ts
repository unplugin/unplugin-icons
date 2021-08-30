
export async function SolidCompiler(svg: string) {
  return `
    import { template, spread } from "solid-js/web";

    const _tmpl$ = template(\`${svg}\`, 0);
    export default (props = {}) => {
        const _el$ = _tmpl$.cloneNode(true);
        spread(_el$, props, true);
        return _el$;
    };
  `
}
