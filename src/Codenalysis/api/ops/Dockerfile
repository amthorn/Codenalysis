FROM python:3.9
LABEL MAINTAINER="Ava Thorn" EMAIL="avatheavian@gmail.com"

# Install apt-get packages
COPY ops/packages.txt packages.txt
RUN apt-get update
RUN xargs apt-get install -y < packages.txt
RUN rm -rf packages.txt

# Install pip requirements
COPY ops/requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN rm -f requirements.txt

WORKDIR /codenalysis

COPY . .
RUN rm -rf ops

COPY ops/docker-entrypoint.sh /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]