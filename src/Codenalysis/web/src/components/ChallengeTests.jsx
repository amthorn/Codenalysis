import { TooltipTable } from "components/Components";
import { FaTimes, FaCheck } from "react-icons/fa";

export const ChallengeTests = ({ tests, results, ...props }) => {
	let columns, data;
	if (results) {
		columns = ["#", "Passed", "Input", "Expected Output", "Actual Output"];
		data = tests.map((value, key) => [
			{value: key},
			{value: value.passed ? <FaCheck size={20}/> : <FaTimes size={20}/>, tip: value.passed ? "PASSED" : "FAILED", className: value.passed ? "bg-success" : "bg-danger"},
			{value: value.input, tip: value.inputType},
			{value: value.output, tip: value.outputType},
			{value: value.actualOutput, tip: value.actualOutputType},
		]);
	} else {
		columns = ["#", "Input", "Output"];
		data = tests.map((value, key) => [
			{value: key},
			{value: value.input, tip: value.inputType},
			{value: value.output, tip: value.outputType},
		])
	}

	return (
		<TooltipTable 
			data={ data } 
			columns={ columns }
			{ ...props }
		/>
	)
};