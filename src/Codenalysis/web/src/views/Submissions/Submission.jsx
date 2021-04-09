import { 
	Accordion, 
	CodeEditorPanel,
	Container,
	Col,
	RightAlignCol,
	Row,
	RightAlignRow,
	NiceContainer, 
	PillContainer, 
	TooltipTable,
	PaddedCard,
	DataContainer,
	ChallengeTests
} from "components/Components";
import { request } from "functions/request";
import React, { useRef, useState, useEffect } from "react";
import { 
	AccordionContext, 
	Button, 
	Card, 
	Nav,
	Sonnet,
	Tab,
	Table,
	Tooltip,
	useAccordionToggle 
} from "react-bootstrap";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Spinner } from "reactstrap";
import classNames from "classnames";
import { toast } from "react-toastify";

const ChallengeInfo = function({ data }) {
	return (
		<DataContainer title="Description" subtitle="Be sure to read the instructions carefully.">
			{ data.description }
		</DataContainer>
	);
};

export const Submission = ({ pageData, match }) => {

	let [challengeData, setChallengeData] = useState({testcases: []});
	let [fetchingChallenge, setFetchingChallenge] = useState(false);
	let [notFound, setNotFound] = useState(false);
	let [theme, setTheme] = useState("sqlserver");
	let [mode, setMode] = useState("python");
	let [script, setScript] = useState(pageData.script);
	let [fontSize, setFontSize] = useState(14);

	const saveSubmission = () => {
    	request(
    		`/api/v1/submissions/${pageData.id}`, 
    		{ method: "PUT", body: JSON.stringify({
    			script: script,
    			challengeId: match.params.challengeId
    		}) }
    	)
	}
	const runSubmission = () => {
    	request(
    		`/api/v1/submissions/${pageData.id}/run`, { method: "POST" }
    	)
	}
	useEffect(() => {
		setFetchingChallenge(true);
		request(`/api/v1/challenges/${match.params.challengeId}`, {method: 'GET'}).then(({ response, data }) => {
			if (response.status === 404) {
				setNotFoundState(true);
			} else {
				setChallengeData(data.data[0]);
			}
			setFetchingChallenge(false) // TODO set not found and fetching states in render (OR MAKE A HOOK MAYBE TO REMOVE ALL THIS BOILER PLATE???)
		});
	}, []);

	if(fetchingChallenge) return null;
	if(notFound) return null;

 	return (
		<Container id="submission_container">
			<RightAlignRow>
				<Button className="px-5" variant="info" onClick={ saveSubmission }>
					Save
				</Button>
				<Button className="px-5" variant="success" onClick={ runSubmission }>Run</Button>
 			</RightAlignRow>
			<Row className="flex-grow-1">
				<PillContainer pills={ ["Challenge Info", "Code Editor"] } orientation="horizontal">
					<Tab.Content className="w-100">
						<Tab.Pane eventKey="first">
							<PaddedCard>
								<ChallengeInfo data={ challengeData }/>
								</PaddedCard>
								<PaddedCard>
									<DataContainer title="Examples" subtitle="Hover over a row to see the data type">
									<ChallengeTests tests={ challengeData.testcases } />
 								</DataContainer>
								</PaddedCard>
 						</Tab.Pane>
						<Tab.Pane eventKey="second">
							<CodeEditorPanel 
								theme={ theme }
								setTheme={ setTheme }
								mode={ mode }
								setMode={ setMode }
								fontSize={ fontSize }
								setFontSize={ setFontSize }
								value={ script }
								onChange={ setScript }
							/>
 						</Tab.Pane>
 					</Tab.Content>
 				</PillContainer>
 			</Row>
 		</Container>
 	);
}

Submission.urlData = {
	url: '/api/v1/submissions/{0}',
	params: ["submissionId"]
}