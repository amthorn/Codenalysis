FROM python:3.9

COPY requirements.txt /requirements.txt
RUN pip install -r /requirements.txt
RUN rm -f /requirements.txt

COPY src/Codenalysis /codenalysis

ENTRYPOINT ["python", "/codenalysis/app.py"]