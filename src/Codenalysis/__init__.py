from flask import Flask
from models.project import Project

app = Flask(__name__)

@app.route('/')
def hello_world():
	import pdb; pdb.set_trace()
	return 'Hello, World!'

if __name__ == "__main__":
	app.run(debug=True, host='0.0.0.0', port=80)
