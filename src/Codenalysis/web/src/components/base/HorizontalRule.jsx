export function HorizontalRule({ width }) {
	return <div className={ `border-bottom my-${width || 3}` } />;
}