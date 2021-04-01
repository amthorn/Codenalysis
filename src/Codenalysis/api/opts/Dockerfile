FROM python:3.9
MAINTAINER Ava Thorn <avatheavian@gmail.com>

# Install apt-get packages
COPY opts/packages.txt packages.txt
RUN apt-get update
RUN xargs apt-get install -y < packages.txt
RUN rm -rf packages.txt

# Install pip requirements
COPY opts/requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN rm -f requirements.txt

WORKDIR /codenalysis

COPY . .
RUN rm -rf opts

ENTRYPOINT ["./opts/docker-entrypoint.sh"]