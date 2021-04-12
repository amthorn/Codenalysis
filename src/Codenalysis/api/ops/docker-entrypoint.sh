#!/bin/bash
echo "WAITING FOR DATABASE TO COME UP..."
while ! mysqladmin ping -h db; do
    sleep 1
done
echo "DATABASE IS UP."
echo "UPGRADING DATABASE..."
# Use flask db migrate to autogen migrations
flask db upgrade || exit 1
echo "DATABASE UPGRADED..."

echo "STARTING APP..."
flask run --host 0.0.0.0 --port 4000 || exit 1
echo "APP STARTED."