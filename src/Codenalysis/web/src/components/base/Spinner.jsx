import { Spinner as Spnr } from "reactstrap";
import { Row, Container } from "./BaseComponents";

export const Spinner = ({ loading = true, sm, md, lg, xl, ...props }) => {
	const spinnerStyling = {
		// use defaults for sm
		...(md ? { width: "3rem", "height": "3rem"} : {}),
		...(lg ? { width: "5rem", "height": "5rem"} : {}),
		...(xl ? { width: "8rem", "height": "8rem"} : {}),
	}
	return (
		<Container>
			<Row className="align-items-center justify-content-center" style={{"height": "87vh"}}>
				{ loading ? <Spnr { ...props } style={ { ...spinnerStyling, ...props.style } }/> : null }
			</Row>
		</Container>
	)
};