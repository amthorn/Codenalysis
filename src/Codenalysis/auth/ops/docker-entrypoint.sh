#!/bin/bash
echo "GENERATING SECRET KEY"
if [ -z $SECRET_KEY ]; then
	echo "NO SECRET KEY DETECTED"
	export SECRET_KEY=$(python -c "import secrets; print(secrets.token_urlsafe(64))")
else
	echo "SECRET KEY DETECTED, NOT GENERATING"
fi
echo "SECRET KEY GENERATED"

echo "STARTING APP..."
flask run --host 0.0.0.0 --port 4000 || exit 1
echo "APP STARTED."