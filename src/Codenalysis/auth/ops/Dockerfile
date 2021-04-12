FROM python:3.9
LABEL MAINTAINER="Ava Thorn" EMAIL=avatheavian@gmail.com

# Install pip requirements
COPY ops/requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN rm -f requirements.txt

WORKDIR /auth

COPY . .
RUN rm -rf ops

COPY ops/docker-entrypoint.sh /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]