import { useState } from "react";
import { 
	Container, 
	Row, 
	Col, 
	Footer, 
	Navbar, 
	NiceContainer, 
	Form, 
	Button,
	Spinner
} from "components/Components";
import { NotFoundPage } from "views/Error";
import { login } from "functions/auth";
import queryString from 'query-string';


export const Login = (props) => {
	const [notFound, setNotFound] = useState(false);
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	const onSubmit = () => {
		setLoading(true)
		login(username, password).then(success => {
			setLoading(false);
			if(success){
				props.history.push(queryString.parse(props.location.search).redirect || '/')
			}
		})
	}

	const LoginForm = () => (
		<Form>
	    	<Form.Input
	    		placeholder="Enter Username"
	    		name="usernameInput" 
	    		label="Username"
	    		onChange={ ({ target }) => { setUsername(target.value) } }
        		invalid={ username === ""}
        		feedbackMessage="Username is required"
	    	/>
	    	<Form.Input
	    		placeholder="Enter Password"
	    		type="password"
	    		name="passwordInput"
	    		label="Password"
        		invalid={ password === ""}
        		feedbackMessage="Password is required"
	    		onChange={ ({ target }) => { setPassword(target.value) } }
	    	/>
	    </Form>
	)

	const LoginPage = () => (
		<Container fluid className="d-flex justify-content-center flex-column min-vh-100">
			<NiceContainer 
				className="p-4 align-self-center w-25 flex-grow-1" 
				style={{ "margin": "15%", "margin-bottom": "50%" }}
			>
				<Row className="flex-grow-1 align-items-end">
					<NiceContainer data="blue" className="mb-3">
						<img src="/logo.png" />
					</NiceContainer>
				</Row>
				<Row className="justify-content-center">
					{ LoginForm() }
				</Row>
				<Row className="justify-content-center">
					<div>
						<Button 
							id="loginButton"
							help="Login to Codenalysis"
							onClick={ onSubmit }
							color="info"
						>
							Login
						</Button>
					</div>
				</Row>
			</NiceContainer>
		</Container>
	);

	if(notFound) return <NotFoundPage />;
	if(loading) return <Spinner lg={ true } />;

	return (
		<div className="main-panel white-content">
			<Navbar
				toggleSidebar={ () => {} }
				notFound={ () => setNotFound(true) }
				footer={ <Footer /> }
				{ ...props }
			/>
			{ LoginPage() }
		</div>
	)
};